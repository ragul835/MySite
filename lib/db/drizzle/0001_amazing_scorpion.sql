ALTER TABLE "contact_submissions" ADD COLUMN "notification_status" varchar(20) DEFAULT 'PENDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "notification_attempts" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "notification_provider_id" varchar(255);--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "notification_last_error" text;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "notification_next_attempt_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "notified_at" timestamp with time zone;