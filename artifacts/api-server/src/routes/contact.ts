import { Router, type IRouter } from "express";
import { rateLimit } from "express-rate-limit";
import { ContactSubmissionRequest } from "@workspace/api-zod";
import { contactSubmissions, db } from "@workspace/db";
import { deliverContactNotification } from "../lib/contact-delivery";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1_000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." },
});

router.post("/v1/contact", contactLimiter, async (req, res, next) => {
  const parsed = ContactSubmissionRequest.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Please check the submitted fields.",
      issues: parsed.error.issues.map(({ path, message }) => ({
        path,
        message,
      })),
    });
    return;
  }

  // A bot that fills the honeypot receives a normal-looking response without a write.
  if (parsed.data.website) {
    res.status(202).json({ message: "Message received." });
    return;
  }

  try {
    const { website: _website, ...submission } = parsed.data;
    const [created] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning({
        id: contactSubmissions.id,
      });
    if (!created) throw new Error("Contact submission was not created");
    void deliverContactNotification(created.id, parsed.data).catch((error) => {
      logger.error(
        { err: error, submissionId: created.id },
        "Contact delivery task failed",
      );
    });

    res.status(202).json({
      message: "Message sent successfully. We'll be in touch within 24 hours.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
