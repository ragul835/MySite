const isProduction = process.env.NODE_ENV === "production";

export function allowedOrigins(): string[] {
  const origins = (process.env.FRONTEND_URL ?? "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

  for (const origin of origins) {
    let parsed: URL;
    try {
      parsed = new URL(origin);
    } catch {
      throw new Error(`Invalid FRONTEND_URL origin: "${origin}"`);
    }
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.origin !== origin) {
      throw new Error(`FRONTEND_URL must contain only http(s) origins: "${origin}"`);
    }
  }

  return [...new Set(origins)];
}

export function validateRuntimeConfig() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  if (isProduction && allowedOrigins().length === 0) {
    throw new Error("FRONTEND_URL is required in production");
  }

  if (process.env.RESEND_API_KEY) {
    if (!process.env.ADMIN_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
      throw new Error(
        "ADMIN_EMAIL and CONTACT_FROM_EMAIL are required when RESEND_API_KEY is set",
      );
    }
  }
}

export function trustProxyHops(): number | false {
  const value = process.env.TRUST_PROXY_HOPS;
  if (!value) return isProduction ? 1 : false;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error("TRUST_PROXY_HOPS must be a non-negative integer");
  }
  return parsed;
}
