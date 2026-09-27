import {
  integer,
  index,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const contactSubmissions = pgTable(
  "contact_submissions",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 30 }),
    service: varchar("service", { length: 100 }).notNull(),
    message: text("message").notNull(),
    status: varchar("status", { length: 20 }).notNull().default("NEW"),
    notificationStatus: varchar("notification_status", { length: 20 })
      .notNull()
      .default("PENDING"),
    notificationAttempts: integer("notification_attempts").notNull().default(0),
    notificationProviderId: varchar("notification_provider_id", {
      length: 255,
    }),
    notificationLastError: text("notification_last_error"),
    notificationNextAttemptAt: timestamp("notification_next_attempt_at", {
      withTimezone: true,
    }),
    notifiedAt: timestamp("notified_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("contact_notification_retry_idx").on(
      table.notificationStatus,
      table.notificationNextAttemptAt,
    ),
    index("contact_submission_retention_idx").on(table.createdAt),
  ],
);

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
