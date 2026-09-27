import type { ContactSubmissionInput } from "@workspace/api-zod";
import { logger } from "./logger";

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character] ?? character;
  });
}

const MAX_ATTEMPTS = 3;

export async function sendContactNotification(
  input: ContactSubmissionInput,
  submissionId: number,
): Promise<string | null> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) return null;

  const payload = JSON.stringify({
    from,
    to: [to],
    reply_to: input.email,
    subject: `New contact request: ${input.service}`,
    html: [
      "<h2>New client inquiry</h2>",
      `<p><strong>Name:</strong> ${escapeHtml(input.name)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(input.email)}</p>`,
      `<p><strong>Phone:</strong> ${escapeHtml(input.phone ?? "")}</p>`,
      `<p><strong>Service:</strong> ${escapeHtml(input.service)}</p>`,
      `<p><strong>Message:</strong></p><p>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>`,
    ].join(""),
  });

  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `contact-notification/${submissionId}`,
        },
        body: payload,
        signal: AbortSignal.timeout(8_000),
      });
      if (response.ok) {
        const result = (await response.json()) as { id?: string };
        if (!result.id)
          throw new Error("Email provider returned no message id");
        return result.id;
      }
      const requestId = response.headers.get("x-request-id") ?? "unavailable";
      lastError = new Error(
        `Email provider rejected request (status=${response.status}, requestId=${requestId})`,
      );
      if (response.status < 500 && response.status !== 429) break;
    } catch (error) {
      lastError =
        error instanceof Error
          ? error
          : new Error("Email provider request failed");
    }
    if (attempt < MAX_ATTEMPTS) {
      await new Promise((resolve) =>
        setTimeout(resolve, 250 * 2 ** (attempt - 1)),
      );
    }
  }
  logger.error(
    { err: lastError, submissionId },
    "Contact notification provider failed",
  );
  throw lastError ?? new Error("Email provider request failed");
}
