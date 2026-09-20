interface Env {
  DB: D1Database;
  EMAIL?: {
    send(message: {
      to: string;
      from: { email: string; name?: string };
      replyTo: string;
      subject: string;
      html: string;
      text: string;
    }): Promise<{ messageId: string }>;
  };
  FRONTEND_ORIGINS?: string;
  RESEND_API_KEY?: string;
  ADMIN_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

type ContactInput = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  website?: string;
};

type ResendSuccess = {
  id: string;
};

type ResendEmail = {
  id: string;
  last_event?: string;
};

const RESEND_URL = "https://api.resend.com/emails";
const RESEND_TIMEOUT_MS = 4_000;
const RESEND_MAX_ATTEMPTS = 3;
const DELIVERY_POLL_DELAYS_MS = [1_000, 2_000, 4_000, 8_000, 8_000];

const jsonHeaders = { "Content-Type": "application/json; charset=utf-8" };

function response(data: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...jsonHeaders, ...extra },
  });
}

function corsHeaders(request: Request, env: Env) {
  const origin = request.headers.get("Origin") ?? "";
  const allowed = (env.FRONTEND_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim().replace(/\/$/, ""))
    .filter(Boolean);
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (origin && allowed.includes(origin.replace(/\/$/, ""))) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function cleanText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function hashIp(ip: string) {
  const bytes = new TextEncoder().encode(ip);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] ?? character);
}

function retryableProviderStatus(status: number) {
  return status === 408 || status === 429 || status >= 500;
}

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function notificationContent(input: ContactInput) {
  const labelStyle = "width:28%;padding:12px 14px;border:1px solid #d9e2ec;background:#f4f7fa;color:#334155;font-family:Arial,sans-serif;font-size:14px;font-weight:700;text-align:left;vertical-align:top";
  const valueStyle = "padding:12px 14px;border:1px solid #d9e2ec;color:#0f172a;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;text-align:left;vertical-align:top";
  const safeEmail = escapeHtml(input.email);
  const safePhone = input.phone ? escapeHtml(input.phone) : "Not provided";
  const phoneHtml = input.phone
    ? `<a href="tel:${safePhone}" style="color:#2563eb;text-decoration:underline">${safePhone}</a>`
    : safePhone;
  const html = [
    '<div style="max-width:680px;margin:0 auto;padding:24px;background:#ffffff;color:#0f172a;font-family:Arial,sans-serif">',
    '<h2 style="margin:0 0 18px;font-size:24px;line-height:1.25;color:#0f172a">New client inquiry</h2>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border-spacing:0">',
    `<tr><th scope="row" style="${labelStyle}">Name</th><td style="${valueStyle}">${escapeHtml(input.name)}</td></tr>`,
    `<tr><th scope="row" style="${labelStyle}">Email</th><td style="${valueStyle}"><a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:underline">${safeEmail}</a></td></tr>`,
    `<tr><th scope="row" style="${labelStyle}">Phone</th><td style="${valueStyle}">${phoneHtml}</td></tr>`,
    `<tr><th scope="row" style="${labelStyle}">Service</th><td style="${valueStyle}">${escapeHtml(input.service)}</td></tr>`,
    `<tr><th scope="row" style="${labelStyle}">Message</th><td style="${valueStyle}">${escapeHtml(input.message).replace(/\n/g, "<br>")}</td></tr>`,
    "</table>",
    '<p style="margin:18px 0 0;color:#64748b;font-family:Arial,sans-serif;font-size:12px;line-height:1.5">Reply to this email to respond directly to the customer.</p>',
    "</div>",
  ].join("");
  const text = [
    "New client inquiry",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone ?? ""}`,
    `Service: ${input.service}`,
    "Message:",
    input.message,
  ].join("\n");
  return { html, text };
}

export async function sendNotification(input: ContactInput, env: Env, submissionId: string) {
  if (!env.RESEND_API_KEY || !env.ADMIN_EMAIL || !env.CONTACT_FROM_EMAIL) {
    throw new Error("Contact email configuration is incomplete");
  }

  const { html, text } = notificationContent(input);

  const payload = JSON.stringify({
    from: env.CONTACT_FROM_EMAIL,
    to: [env.ADMIN_EMAIL],
    reply_to: input.email,
    subject: `New contact request: ${input.service}`,
    html,
    text,
  });
  const idempotencyKey = `contact-notification/${submissionId}`;
  let lastError: unknown;

  for (let attempt = 1; attempt <= RESEND_MAX_ATTEMPTS; attempt += 1) {
    let result: Response;
    try {
      result = await fetch(RESEND_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: payload,
        signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
      });
    } catch (error) {
      lastError = error;
      if (attempt === RESEND_MAX_ATTEMPTS) break;
      await wait(250 * 2 ** (attempt - 1));
      continue;
    }

    if (result.ok) {
      const response = await result.json<ResendSuccess>();
      if (!response.id) throw new Error("Email provider returned no message id");
      return response.id;
    }

    const requestId = result.headers.get("x-request-id") ?? "unavailable";
    lastError = new Error(`Email provider rejected request (status=${result.status}, requestId=${requestId})`);
    if (!retryableProviderStatus(result.status)) throw lastError;
    if (attempt === RESEND_MAX_ATTEMPTS) break;
    await wait(250 * 2 ** (attempt - 1));
  }

  throw lastError instanceof Error ? lastError : new Error("Email provider request failed");
}

export async function deliverContactNotification(input: ContactInput, env: Env, submissionId: string) {
  if (env.EMAIL) {
    try {
      const { html, text } = notificationContent(input);
      const result = await env.EMAIL.send({
        to: env.ADMIN_EMAIL ?? "weraisetech@gmail.com",
        from: { email: "contact@weraisetech.com", name: "We Raise Tech" },
        replyTo: input.email,
        subject: `New contact request: ${input.service}`,
        html,
        text,
      });
      return { provider: "cloudflare" as const, messageId: result.messageId };
    } catch (error) {
      console.error("Cloudflare contact notification failed; using Resend fallback", {
        submissionId,
        error: error instanceof Error ? error.message : "Unknown provider error",
      });
    }
  }

  return {
    provider: "resend" as const,
    messageId: await sendNotification(input, env, submissionId),
  };
}

function deliveryStatus(event: string) {
  if (event === "delivered" || event === "opened" || event === "clicked") return "EMAIL_DELIVERED";
  return `EMAIL_${event.replace(/[^a-z0-9]+/gi, "_").toUpperCase()}`;
}

async function fetchDeliveryEvent(providerMessageId: string, env: Env) {
  if (!env.RESEND_API_KEY) throw new Error("Contact email configuration is incomplete");
  const result = await fetch(`${RESEND_URL}/${encodeURIComponent(providerMessageId)}`, {
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}` },
    signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
  });
  if (!result.ok) throw new Error(`Email delivery lookup failed (status=${result.status})`);
  const email = await result.json<ResendEmail>();
  return email.last_event?.toLowerCase() ?? "unknown";
}

async function recordDeliveryEvent(
  env: Env,
  submissionId: number,
  providerMessageId: string,
  event: string,
) {
  await env.DB.prepare(
    "UPDATE contact_submissions SET status = ?1, provider_message_id = ?2, notification_last_event = ?3, notification_updated_at = CURRENT_TIMESTAMP WHERE id = ?4",
  ).bind(deliveryStatus(event), providerMessageId, event, submissionId).run();
}

async function trackDelivery(env: Env, submissionId: number, providerMessageId: string) {
  const nonTerminalEvents = new Set(["unknown", "queued", "sent", "delivery_delayed"]);
  let lastEvent = "sent";

  for (const delay of DELIVERY_POLL_DELAYS_MS) {
    await wait(delay);
    try {
      lastEvent = await fetchDeliveryEvent(providerMessageId, env);
      await recordDeliveryEvent(env, submissionId, providerMessageId, lastEvent);
      if (!nonTerminalEvents.has(lastEvent)) break;
    } catch (error) {
      console.error("Contact delivery lookup failed", {
        submissionId: String(submissionId),
        providerMessageId,
        error: error instanceof Error ? error.message : "Unknown provider error",
      });
    }
  }

  console.info("Contact delivery event recorded", {
    submissionId: String(submissionId),
    providerMessageId,
    lastEvent,
  });
}

async function reconcilePendingDeliveries(env: Env) {
  const pending = await env.DB.prepare(
    "SELECT id, provider_message_id FROM contact_submissions WHERE status IN ('EMAIL_SENT', 'EMAIL_DELIVERY_DELAYED') AND provider_message_id IS NOT NULL ORDER BY id DESC LIMIT 50",
  ).all<{ id: number; provider_message_id: string }>();

  for (const submission of pending.results) {
    try {
      const event = await fetchDeliveryEvent(submission.provider_message_id, env);
      await recordDeliveryEvent(env, submission.id, submission.provider_message_id, event);
    } catch (error) {
      console.error("Scheduled contact delivery reconciliation failed", {
        submissionId: String(submission.id),
        providerMessageId: submission.provider_message_id,
        error: error instanceof Error ? error.message : "Unknown provider error",
      });
    }
  }
}

async function handleContact(request: Request, env: Env, context: ExecutionContext) {
  if (request.headers.get("content-length") && Number(request.headers.get("content-length")) > 32_000) {
    return response({ message: "Request body is too large." }, 413);
  }
  let body: Partial<ContactInput>;
  try {
    body = await request.json();
  } catch {
    return response({ message: "Invalid JSON body." }, 400);
  }
  const input: ContactInput = {
    name: cleanText(body.name, 120),
    email: cleanText(body.email, 320).toLowerCase(),
    phone: cleanText(body.phone, 30),
    service: cleanText(body.service, 100),
    message: cleanText(body.message, 5_000),
    website: cleanText(body.website, 200),
  };
  if (input.website) return response({ message: "Message received." }, 202);
  if (input.name.length < 2 || !validEmail(input.email) || input.service.length < 1 || input.message.length < 10) {
    return response({ message: "Please check the submitted fields." }, 400);
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const ipHash = await hashIp(ip);
  const now = Date.now();
  const recent = await env.DB.prepare("SELECT last_submitted_at FROM contact_rate_limits WHERE ip_hash = ?1")
    .bind(ipHash).first<{ last_submitted_at: number }>();
  if (recent && now - recent.last_submitted_at < 60_000) {
    return response({ message: "Too many requests. Please wait a minute." }, 429);
  }

  const results = await env.DB.batch([
    env.DB.prepare("INSERT INTO contact_submissions (name, email, phone, service, message) VALUES (?1, ?2, ?3, ?4, ?5)")
      .bind(input.name, input.email, input.phone, input.service, input.message),
    env.DB.prepare("INSERT INTO contact_rate_limits (ip_hash, last_submitted_at) VALUES (?1, ?2) ON CONFLICT(ip_hash) DO UPDATE SET last_submitted_at = excluded.last_submitted_at")
      .bind(ipHash, now),
  ]);
  const insertedId = results[0]?.meta.last_row_id;
  const submissionId = String(insertedId ?? crypto.randomUUID());
  try {
    const delivery = await deliverContactNotification(input, env, submissionId);
    if (insertedId != null) {
      const acceptedEvent = delivery.provider === "cloudflare" ? "cloudflare_accepted" : "sent";
      await recordDeliveryEvent(env, insertedId, delivery.messageId, acceptedEvent);
      if (delivery.provider === "resend") {
        context.waitUntil(trackDelivery(env, insertedId, delivery.messageId));
      }
    }
    console.info("Contact notification accepted", {
      submissionId,
      provider: delivery.provider,
      providerMessageId: delivery.messageId,
    });
  } catch (error) {
    if (insertedId != null) {
      await env.DB.prepare("UPDATE contact_submissions SET status = 'NOTIFICATION_FAILED' WHERE id = ?1")
        .bind(insertedId).run();
    }
    console.error("Contact notification failed", {
      submissionId,
      error: error instanceof Error ? error.message : "Unknown provider error",
    });
  }
  return response({ message: "Message sent successfully. We'll be in touch within 24 hours." }, 201);
}

export default {
  async fetch(request: Request, env: Env, context: ExecutionContext): Promise<Response> {
    const headers = corsHeaders(request, env);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    const url = new URL(request.url);
    if (url.pathname === "/api/healthz" && request.method === "GET") return response({ status: "ok" }, 200, headers);
    if (url.pathname === "/api/readyz" && request.method === "GET") {
      try { await env.DB.prepare("SELECT 1").run(); return response({ status: "ready" }, 200, headers); }
      catch { return response({ status: "unavailable" }, 503, headers); }
    }
    if (url.pathname === "/api/v1/contact" && request.method === "POST") {
      const result = await handleContact(request, env, context);
      Object.entries(headers).forEach(([key, value]) => result.headers.set(key, value));
      return result;
    }
    return response({ message: "Not found" }, 404, headers);
  },
  async scheduled(_controller: ScheduledController, env: Env, context: ExecutionContext) {
    context.waitUntil(reconcilePendingDeliveries(env));
  },
};
