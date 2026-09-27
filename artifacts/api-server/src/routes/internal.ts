import { timingSafeEqual } from "node:crypto";
import { Router, type IRouter } from "express";
import { count, desc, inArray } from "drizzle-orm";
import { contactSubmissions, db } from "@workspace/db";

const router: IRouter = Router();

function authorized(header: string | undefined, expected: string) {
  const supplied = header?.startsWith("Bearer ") ? header.slice(7) : "";
  const suppliedBuffer = Buffer.from(supplied);
  const expectedBuffer = Buffer.from(expected);
  return (
    suppliedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(suppliedBuffer, expectedBuffer)
  );
}

router.get("/internal/contact-delivery", async (req, res, next) => {
  const token = process.env.ADMIN_API_TOKEN;
  if (!token) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  if (!authorized(req.header("authorization"), token)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const summary = await db
      .select({ status: contactSubmissions.notificationStatus, count: count() })
      .from(contactSubmissions)
      .groupBy(contactSubmissions.notificationStatus);
    const attention = await db
      .select({
        id: contactSubmissions.id,
        status: contactSubmissions.notificationStatus,
        attempts: contactSubmissions.notificationAttempts,
        lastError: contactSubmissions.notificationLastError,
        nextAttemptAt: contactSubmissions.notificationNextAttemptAt,
        createdAt: contactSubmissions.createdAt,
      })
      .from(contactSubmissions)
      .where(inArray(contactSubmissions.notificationStatus, ["FAILED", "DEAD"]))
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(50);
    res.setHeader("Cache-Control", "no-store");
    res.json({ summary, attention });
  } catch (error) {
    next(error);
  }
});

export default router;
