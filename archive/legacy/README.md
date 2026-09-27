# Archived implementations

These directories are historical prototypes and are not part of the production workspace, build, test, or deployment path.

The canonical application is:

- `artifacts/agency-site` — React/Vite frontend
- `artifacts/api-server` — Express API and static host
- `lib/db` — PostgreSQL schema and migrations
- `lib/api-zod` — shared API contracts

The archived code is retained only for reference while the production history stabilizes. Do not apply fixes or deploy from this directory. Useful SEO, analytics, and email-delivery patterns were ported into the canonical application before archival.
