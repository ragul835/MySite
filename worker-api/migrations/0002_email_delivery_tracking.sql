ALTER TABLE contact_submissions ADD COLUMN provider_message_id TEXT;
ALTER TABLE contact_submissions ADD COLUMN notification_last_event TEXT;
ALTER TABLE contact_submissions ADD COLUMN notification_updated_at TEXT;

CREATE INDEX IF NOT EXISTS contact_submissions_provider_message_id_idx
  ON contact_submissions(provider_message_id);
