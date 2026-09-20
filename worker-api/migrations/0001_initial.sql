CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'NEW',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON contact_submissions(created_at);

CREATE TABLE IF NOT EXISTS contact_rate_limits (
  ip_hash TEXT PRIMARY KEY,
  last_submitted_at INTEGER NOT NULL
);
