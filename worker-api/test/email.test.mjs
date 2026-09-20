import assert from "node:assert/strict";
import test from "node:test";
import { deliverContactNotification, sendNotification } from "../src/worker.ts";

const input = {
  name: "Test Client",
  email: "client@example.com",
  phone: "+1 555 0100",
  service: "Web Development",
  message: "Please tell me more about your services.",
};

const env = {
  RESEND_API_KEY: "re_test",
  ADMIN_EMAIL: "weraisetech@gmail.com",
  CONTACT_FROM_EMAIL: "We Raise Tech <contact@weraisetech.com>",
};

test("contact notification targets the configured inbox and can be replied to", async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });

  let request;
  globalThis.fetch = async (url, init) => {
    request = { url, init };
    return Response.json({ id: "email_123" });
  };

  const id = await sendNotification(input, env, "42");
  assert.equal(id, "email_123");
  assert.equal(request.url, "https://api.resend.com/emails");
  assert.equal(request.init.headers["Idempotency-Key"], "contact-notification/42");

  const payload = JSON.parse(request.init.body);
  assert.deepEqual(payload.to, ["weraisetech@gmail.com"]);
  assert.equal(payload.reply_to, "client@example.com");
  assert.match(payload.html, /<table role="presentation"/);
  assert.match(payload.html, /<th scope="row"[^>]*>Service<\/th>/);
  assert.match(payload.html, /<th scope="row"[^>]*>Message<\/th>/);
});

test("contact notification retries transient provider errors with one idempotency key", async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });

  const keys = [];
  let attempts = 0;
  globalThis.fetch = async (_url, init) => {
    attempts += 1;
    keys.push(init.headers["Idempotency-Key"]);
    if (attempts === 1) return new Response("temporary", { status: 503 });
    return Response.json({ id: "email_retry" });
  };

  const id = await sendNotification(input, env, "84");
  assert.equal(id, "email_retry");
  assert.equal(attempts, 2);
  assert.deepEqual(keys, ["contact-notification/84", "contact-notification/84"]);
});

test("missing mail configuration fails loudly", async () => {
  await assert.rejects(
    sendNotification(input, { ...env, RESEND_API_KEY: undefined }, "126"),
    /configuration is incomplete/,
  );
});

test("permanent provider errors are not retried", async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });

  let attempts = 0;
  globalThis.fetch = async () => {
    attempts += 1;
    return new Response("invalid sender", {
      status: 422,
      headers: { "x-request-id": "request_422" },
    });
  };

  await assert.rejects(sendNotification(input, env, "168"), /status=422.*request_422/);
  assert.equal(attempts, 1);
});

test("Cloudflare Email Service is preferred when its destination is verified", async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });
  globalThis.fetch = async () => { throw new Error("Resend should not be called"); };

  let message;
  const delivery = await deliverContactNotification(input, {
    ...env,
    EMAIL: {
      async send(value) {
        message = value;
        return { messageId: "cloudflare_123" };
      },
    },
  }, "210");

  assert.deepEqual(delivery, { provider: "cloudflare", messageId: "cloudflare_123" });
  assert.equal(message.to, "weraisetech@gmail.com");
  assert.equal(message.replyTo, "client@example.com");
  assert.match(message.text, /New client inquiry/);
  assert.match(message.html, /<table role="presentation"/);
});
