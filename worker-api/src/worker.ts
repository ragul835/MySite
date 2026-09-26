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

export function validPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
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

export function userThankYouContent(input: ContactInput) {
  const safeName = escapeHtml(input.name);
  const safeService = escapeHtml(input.service);
  const safeMessage = escapeHtml(input.message).replace(/\n/g, "<br>");
  const bookingUrl = "https://calendly.com/weraisetech/30min?utm_source=contact_autoresponder&utm_medium=email&utm_campaign=lead_followup";
  const portfolioUrl = "https://weraisetech.com/portfolio?utm_source=contact_autoresponder&utm_medium=email&utm_campaign=lead_followup";
  const html = [
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">We received your project inquiry and will respond within 24 hours.</div>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;margin:0;padding:0;background:#f4f7fb;border-collapse:collapse">',
    '<tr><td align="center" style="padding:28px 12px">',
    '<table role="presentation" width="620" cellpadding="0" cellspacing="0" style="width:100%;max-width:620px;border-collapse:separate;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.08)">',
    '<tr><td style="padding:24px 32px;background:#0b1220">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>',
    '<td style="vertical-align:middle"><img src="https://weraisetech.com/apple-touch-icon.png" width="48" height="48" alt="We Raise Tech" style="display:block;width:48px;height:48px;border:0;border-radius:12px"></td>',
    '<td style="padding-left:14px;vertical-align:middle;color:#ffffff;font-family:Arial,sans-serif;font-size:21px;font-weight:700;letter-spacing:-0.3px">We Raise Tech</td>',
    '<td align="right" style="vertical-align:middle;color:#93c5fd;font-family:Arial,sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Project inquiry</td>',
    '</tr></table>',
    '</td></tr>',
    '<tr><td style="padding:36px 32px 12px;font-family:Arial,sans-serif;color:#0f172a">',
    '<div style="display:inline-block;padding:7px 12px;border-radius:999px;background:#ecfdf5;color:#047857;font-size:12px;font-weight:700">✓ Message received</div>',
    `<h1 style="margin:18px 0 14px;font-size:30px;line-height:1.2;letter-spacing:-0.6px;color:#0f172a">Thanks for reaching out, ${safeName}.</h1>`,
    '<p style="margin:0;color:#475569;font-size:16px;line-height:1.7">Your inquiry is with our team. A senior team member will review it and reply within <strong style="color:#0f172a">24 hours</strong>.</p>',
    '</td></tr>',
    '<tr><td style="padding:18px 32px 8px">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px">',
    '<tr><td style="padding:18px 20px;border-bottom:1px solid #e2e8f0;font-family:Arial,sans-serif">',
    '<div style="margin-bottom:6px;color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Service</div>',
    `<div style="color:#0f172a;font-size:15px;font-weight:700">${safeService}</div>`,
    '</td></tr>',
    '<tr><td style="padding:18px 20px;font-family:Arial,sans-serif">',
    '<div style="margin-bottom:8px;color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Your message</div>',
    `<div style="color:#334155;font-size:14px;line-height:1.65">${safeMessage}</div>`,
    '</td></tr>',
    '</table>',
    '</td></tr>',
    '<tr><td align="center" style="padding:24px 32px 8px;font-family:Arial,sans-serif">',
    '<p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6">Want to move faster? Choose a convenient time for a free 30-minute discovery call.</p>',
    `<a href="${bookingUrl}" style="display:inline-block;padding:14px 24px;border-radius:10px;background:#4f46e5;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none">Book your free call →</a>`,
    `<div style="margin-top:14px"><a href="${portfolioUrl}" style="color:#4f46e5;font-size:13px;font-weight:700;text-decoration:underline">View our recent work</a></div>`,
    '</td></tr>',
    '<tr><td style="padding:28px 32px;font-family:Arial,sans-serif">',
    '<div style="height:1px;background:#e2e8f0;margin-bottom:22px"></div>',
    '<p style="margin:0;color:#334155;font-size:14px;line-height:1.6">Best regards,<br><strong style="color:#0f172a">The We Raise Tech Team</strong></p>',
    '<p style="margin:14px 0 0;color:#64748b;font-size:12px;line-height:1.8">Reply to this email or contact us at <a href="mailto:contact@weraisetech.com" style="color:#4f46e5;text-decoration:underline">contact@weraisetech.com</a><br>Call: <a href="tel:+919080163393" style="color:#4f46e5;text-decoration:underline">+91 90801 63393</a> · <a href="https://wa.me/919080163393" style="color:#4f46e5;text-decoration:underline">WhatsApp us</a><br>Web development · SaaS · E-commerce · Custom software</p>',
    '</td></tr>',
    '<tr><td align="center" style="padding:18px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#94a3b8;font-family:Arial,sans-serif;font-size:11px;line-height:1.5">© We Raise Tech · India · <a href="https://weraisetech.com" style="color:#64748b;text-decoration:none">weraisetech.com</a></td></tr>',
    '</table>',
    '<p style="margin:16px 0 0;color:#94a3b8;font-family:Arial,sans-serif;font-size:11px;line-height:1.5;text-align:center">You received this confirmation because an inquiry was submitted using your email address.</p>',
    '</td></tr>',
    '</table>',
  ].join("");
  const text = [
    `Thanks for reaching out, ${input.name}.`,
    "",
    "We received your project inquiry. A senior team member will review it and reply within 24 hours.",
    "",
    `Service: ${input.service}`,
    "Your message:",
    input.message,
    "",
    `Book your free 30-minute call: ${bookingUrl}`,
    `View our recent work: ${portfolioUrl}`,
    "",
    "Best regards,",
    "The We Raise Tech Team",
    "contact@weraisetech.com",
    "Call / WhatsApp: +91 90801 63393",
    "https://weraisetech.com",
  ].join("\n");
  return { html, text };
}

async function sendThankYouEmail(input: ContactInput, env: Env, submissionId: string) {
  const { html, text } = userThankYouContent(input);

  if (env.EMAIL) {
    try {
      await env.EMAIL.send({
        to: input.email,
        from: { email: "contact@weraisetech.com", name: "We Raise Tech" },
        replyTo: env.ADMIN_EMAIL ?? "contact@weraisetech.com",
        subject: "We received your inquiry — We Raise Tech",
        html,
        text,
      });
      return;
    } catch (error) {
      console.error("Cloudflare thank you email failed; using Resend fallback", {
        submissionId,
        error: error instanceof Error ? error.message : "Unknown provider error",
      });
    }
  }

  if (env.RESEND_API_KEY && env.CONTACT_FROM_EMAIL) {
    const payload = JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [input.email],
      reply_to: env.ADMIN_EMAIL ?? "contact@weraisetech.com",
      subject: "We received your inquiry — We Raise Tech",
      html,
      text,
    });

    try {
      const result = await fetch(RESEND_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `contact-thankyou/${submissionId}`,
        },
        body: payload,
        signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
      });
      if (!result.ok) {
        const requestId = result.headers.get("x-request-id") ?? "unavailable";
        throw new Error(`Email provider rejected thank-you email (status=${result.status}, requestId=${requestId})`);
      }
    } catch (error) {
      console.error("Resend thank you email failed", {
        submissionId,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
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
  const thankYouEmail = sendThankYouEmail(input, env, submissionId)
    .catch((err) => console.error("Thank you email failed", err));

  try {
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
  } finally {
    await thankYouEmail;
  }
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

async function processContactDelivery(
  input: ContactInput,
  env: Env,
  context: ExecutionContext,
  submissionId: string,
  insertedId: number | undefined,
) {
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
}

export async function handleContact(request: Request, env: Env, context: ExecutionContext) {
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
  if (input.name.length < 2 || !validEmail(input.email) || !validPhone(input.phone) || input.service.length < 1 || input.message.length < 10) {
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
  context.waitUntil(processContactDelivery(input, env, context, submissionId, insertedId));
  return response({ message: "Message received successfully. We'll be in touch within 24 hours." }, 202);
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
