import { z } from "zod";

export const ContactSubmissionRequest = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320).transform((value) => value.toLowerCase()),
  phone: z.string().trim().max(30).optional().default(""),
  service: z.string().trim().min(1).max(100),
  message: z.string().trim().min(10).max(5_000),
  // Hidden honeypot. Real users never populate this field.
  website: z.string().max(200).optional(),
});

export const ContactSubmissionResponse = z.object({
  message: z.string(),
});

export type ContactSubmissionInput = z.infer<typeof ContactSubmissionRequest>;
