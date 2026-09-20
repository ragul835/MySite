interface Env {
  DB: D1Database;
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

async function sendNotification(input: ContactInput, env: Env) {
  if (!env.RESEND_API_KEY || !env.ADMIN_EMAIL || !env.CONTACT_FROM_EMAIL) return;
  const html = [
    "<h2>New client inquiry</h2>",
    `<p><strong>Name:</strong> ${escapeHtml(input.name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(input.email)}</p>`,
    `<p><strong>Phone:</strong> ${escapeHtml(input.phone ?? "")}</p>`,
    `<p><strong>Service:</strong> ${escapeHtml(input.service)}</p>`,
    `<p><strong>Message:</strong></p><p>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>`,
  ].join("");
  const result = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.ADMIN_EMAIL],
      subject: `New contact request: ${input.service}`,
      html,
    }),
  });
  if (!result.ok) console.error("Resend rejected notification", result.status);
}

async function handleContact(request: Request, env: Env) {
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

  await env.DB.batch([
    env.DB.prepare("INSERT INTO contact_submissions (name, email, phone, service, message) VALUES (?1, ?2, ?3, ?4, ?5)")
      .bind(input.name, input.email, input.phone, input.service, input.message),
    env.DB.prepare("INSERT INTO contact_rate_limits (ip_hash, last_submitted_at) VALUES (?1, ?2) ON CONFLICT(ip_hash) DO UPDATE SET last_submitted_at = excluded.last_submitted_at")
      .bind(ipHash, now),
  ]);
  try { await sendNotification(input, env); } catch (error) { console.error("Contact notification failed", error); }
  return response({ message: "Message sent successfully. We'll be in touch within 24 hours." }, 201);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const headers = corsHeaders(request, env);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    const url = new URL(request.url);
    if (url.pathname === "/api/healthz" && request.method === "GET") return response({ status: "ok" }, 200, headers);
    if (url.pathname === "/api/readyz" && request.method === "GET") {
      try { await env.DB.prepare("SELECT 1").run(); return response({ status: "ready" }, 200, headers); }
      catch { return response({ status: "unavailable" }, 503, headers); }
    }
    if (url.pathname === "/api/v1/contact" && request.method === "POST") {
      const result = await handleContact(request, env);
      Object.entries(headers).forEach(([key, value]) => result.headers.set(key, value));
      return result;
    }
    return response({ message: "Not found" }, 404, headers);
  },
};
