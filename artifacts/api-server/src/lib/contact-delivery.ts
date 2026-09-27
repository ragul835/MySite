import { and, eq, inArray, isNull, lt, lte, or, sql } from "drizzle-orm";
import type { ContactSubmissionInput } from "@workspace/api-zod";
import { contactSubmissions, db } from "@workspace/db";
import { sendContactNotification } from "./contact-email";
import { logger } from "./logger";

const MAX_DELIVERY_ATTEMPTS = 5;
const WORKER_INTERVAL_MS = 60_000;
const CONTACT_RETENTION_DAYS = Number(
  process.env.CONTACT_RETENTION_DAYS ?? 1_095,
);

function retryAt(attempt: number) {
  const delayMinutes = Math.min(360, 5 * 2 ** Math.max(0, attempt - 1));
  return new Date(Date.now() + delayMinutes * 60_000);
}

export async function deliverContactNotification(
  submissionId: number,
  input: ContactSubmissionInput,
) {
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.ADMIN_EMAIL ||
    !process.env.CONTACT_FROM_EMAIL
  ) {
    await db
      .update(contactSubmissions)
      .set({
        notificationStatus: "DISABLED",
        notificationNextAttemptAt: null,
      })
      .where(eq(contactSubmissions.id, submissionId));
    return;
  }
  const [claimed] = await db
    .update(contactSubmissions)
    .set({
      notificationStatus: "SENDING",
      notificationAttempts: sql`${contactSubmissions.notificationAttempts} + 1`,
      notificationNextAttemptAt: new Date(Date.now() + 15 * 60_000),
      notificationLastError: null,
    })
    .where(
      and(
        eq(contactSubmissions.id, submissionId),
        inArray(contactSubmissions.notificationStatus, [
          "PENDING",
          "FAILED",
          "SENDING",
          "DISABLED",
        ]),
      ),
    )
    .returning({ attempts: contactSubmissions.notificationAttempts });

  if (!claimed) return;

  try {
    const providerId = await sendContactNotification(input, submissionId);
    await db
      .update(contactSubmissions)
      .set({
        notificationStatus: providerId ? "SENT" : "DISABLED",
        notificationProviderId: providerId,
        notificationLastError: null,
        notificationNextAttemptAt: null,
        notifiedAt: providerId ? new Date() : null,
      })
      .where(eq(contactSubmissions.id, submissionId));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown delivery error";
    const exhausted = claimed.attempts >= MAX_DELIVERY_ATTEMPTS;
    await db
      .update(contactSubmissions)
      .set({
        notificationStatus: exhausted ? "DEAD" : "FAILED",
        notificationLastError: message.slice(0, 2_000),
        notificationNextAttemptAt: exhausted ? null : retryAt(claimed.attempts),
      })
      .where(eq(contactSubmissions.id, submissionId));
    logger.error(
      { err: error, submissionId, attempts: claimed.attempts },
      "Contact notification queued for retry",
    );
  }
}

export async function retryPendingContactNotifications() {
  const now = new Date();
  const statuses =
    process.env.RESEND_API_KEY &&
    process.env.ADMIN_EMAIL &&
    process.env.CONTACT_FROM_EMAIL
      ? ["PENDING", "FAILED", "SENDING", "DISABLED"]
      : ["PENDING", "FAILED", "SENDING"];
  const pending = await db
    .select()
    .from(contactSubmissions)
    .where(
      and(
        inArray(contactSubmissions.notificationStatus, statuses),
        lt(contactSubmissions.notificationAttempts, MAX_DELIVERY_ATTEMPTS),
        or(
          isNull(contactSubmissions.notificationNextAttemptAt),
          lte(contactSubmissions.notificationNextAttemptAt, now),
        ),
      ),
    )
    .limit(25);

  for (const row of pending) {
    await deliverContactNotification(row.id, {
      name: row.name,
      email: row.email,
      phone: row.phone ?? "",
      service: row.service,
      message: row.message,
    });
  }
}

export async function deleteExpiredContactSubmissions() {
  if (
    !Number.isInteger(CONTACT_RETENTION_DAYS) ||
    CONTACT_RETENTION_DAYS < 30
  ) {
    throw new Error("CONTACT_RETENTION_DAYS must be an integer of at least 30");
  }
  const cutoff = new Date(Date.now() - CONTACT_RETENTION_DAYS * 86_400_000);
  const deleted = await db
    .delete(contactSubmissions)
    .where(lt(contactSubmissions.createdAt, cutoff))
    .returning({ id: contactSubmissions.id });
  if (deleted.length)
    logger.info(
      { count: deleted.length },
      "Expired contact submissions deleted",
    );
}

export function startContactMaintenance() {
  let lastRetentionRun = 0;
  const run = async () => {
    try {
      await retryPendingContactNotifications();
      if (Date.now() - lastRetentionRun >= 86_400_000) {
        await deleteExpiredContactSubmissions();
        lastRetentionRun = Date.now();
      }
    } catch (error) {
      logger.error({ err: error }, "Contact maintenance cycle failed");
    }
  };
  const initial = setTimeout(() => void run(), 5_000);
  const interval = setInterval(() => void run(), WORKER_INTERVAL_MS);
  initial.unref();
  interval.unref();
  return () => {
    clearTimeout(initial);
    clearInterval(interval);
  };
}
