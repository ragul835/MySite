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

export async function sendContactNotification(input: ContactSubmissionInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) return;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New contact request: ${input.service}`,
      html: [
        "<h2>New client inquiry</h2>",
        `<p><strong>Name:</strong> ${escapeHtml(input.name)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(input.email)}</p>`,
        `<p><strong>Phone:</strong> ${escapeHtml(input.phone ?? "")}</p>`,
        `<p><strong>Service:</strong> ${escapeHtml(input.service)}</p>`,
        `<p><strong>Message:</strong></p><p>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>`,
      ].join(""),
    }),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    logger.error(
      { status: response.status },
      "Contact notification provider rejected the request",
    );
  }
}
