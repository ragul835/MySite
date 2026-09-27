import assert from "node:assert/strict";
import test from "node:test";
import { deliverContactNotification, handleContact, sendNotification, userThankYouContent, validPhone } from "../src/worker.ts";

const input = {
  name: "Test Client",
  email: "client@example.com",
  phone: "+1 555 010 0000",
  service: "Web Development",
  message: "Please tell me more about your services.",
};

const env = {
  RESEND_API_KEY: "re_test",
  ADMIN_EMAIL: "weraisetech@gmail.com",
  CONTACT_FROM_EMAIL: "We Raise Tech <contact@weraisetech.com>",
};

test("WhatsApp validation requires an internationally valid phone length", () => {
  assert.equal(validPhone("+91 90801 63393"), true);
  assert.equal(validPhone("9080163393"), true);
  assert.equal(validPhone(""), false);
  assert.equal(validPhone("12345"), false);
  assert.equal(validPhone("+123 456 789 012 345 6"), false);
});

function contactDatabase() {
  return {
    prepare(sql) {
      return {
        bind() { return this; },
        async first() { return sql.includes("contact_rate_limits") ? null : undefined; },
        async run() { return { success: true }; },
      };
    },
    async batch() {
      return [{ meta: { last_row_id: 321 } }, { meta: {} }];
    },
  };
}

test("contact endpoint rejects a missing WhatsApp number", async () => {
  let backgroundScheduled = false;
  const response = await handleContact(new Request("https://api.weraisetech.com/api/v1/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, phone: "" }),
  }), { ...env, DB: contactDatabase() }, {
    waitUntil() { backgroundScheduled = true; },
  });

  assert.equal(response.status, 400);
  assert.equal(backgroundScheduled, false);
});

test("contact endpoint responds before background email delivery completes", async () => {
  let releaseEmail;
  const emailGate = new Promise((resolve) => { releaseEmail = resolve; });
  let backgroundTask;
  let emailCalls = 0;
  const response = await handleContact(new Request("https://api.weraisetech.com/api/v1/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "CF-Connecting-IP": "203.0.113.10" },
    body: JSON.stringify(input),
  }), {
    ...env,
    DB: contactDatabase(),
    EMAIL: {
      async send() {
        emailCalls += 1;
        await emailGate;
        return { messageId: `cloudflare_${emailCalls}` };
      },
    },
  }, {
    waitUntil(promise) { backgroundTask = promise; },
  });

  assert.equal(response.status, 202);
  assert.ok(backgroundTask instanceof Promise);
  assert.equal(emailCalls, 2);
  releaseEmail();
  await backgroundTask;
});

test("client confirmation email is branded, actionable, and safely escaped", () => {
  const { html, text } = userThankYouContent({
    ...input,
    name: "Test <Client>",
    message: "Please build this.\n<script>alert('x')</script>",
  });

  assert.match(html, /We Raise Tech/);
  assert.match(html, /Message received/);
  assert.match(html, /Book your free call/);
  assert.match(html, /calendly\.com\/weraisetech\/30min/);
  assert.match(html, /View our recent work/);
  assert.match(html, /tel:\+919080163393/);
  assert.match(html, /wa\.me\/919080163393/);
  assert.match(html, /Test &lt;Client&gt;/);
  assert.doesNotMatch(html, /<script>alert/);
  assert.match(text, /reply within 24 hours/);
  assert.match(text, /Book your free 30-minute call/);
  assert.match(text, /Call \/ WhatsApp: \+91 90801 63393/);
});

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

test("customer confirmation finishes even when the admin notification fails", async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });

  let releaseConfirmation;
  const confirmationGate = new Promise((resolve) => { releaseConfirmation = resolve; });
  let markConfirmationStarted;
  const confirmationStarted = new Promise((resolve) => { markConfirmationStarted = resolve; });
  let markAdminAttempted;
  const adminAttempted = new Promise((resolve) => { markAdminAttempted = resolve; });

  globalThis.fetch = async (_url, init) => {
    const key = init.headers["Idempotency-Key"];
    if (key === "contact-thankyou/105") {
      const payload = JSON.parse(init.body);
      assert.equal(payload.reply_to, "weraisetech@gmail.com");
      markConfirmationStarted();
      await confirmationGate;
      return Response.json({ id: "thankyou_105" });
    }

    markAdminAttempted();
    return new Response("invalid sender", { status: 422 });
  };

  const delivery = deliverContactNotification(input, env, "105");
  await Promise.all([confirmationStarted, adminAttempted]);
  const stateBeforeRelease = await Promise.race([
    delivery.then(() => "settled", () => "settled"),
    Promise.resolve("pending"),
  ]);
  assert.equal(stateBeforeRelease, "pending");

  releaseConfirmation();
  await assert.rejects(delivery, /status=422/);
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
