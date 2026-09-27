# We Raise Tech website

Production monorepo for the We Raise Tech marketing site, contact API, and PostgreSQL
schema. The deployable Node.js application serves the Vite SPA and Express API
from one process so the frontend can use same-origin `/api` requests.

## Canonical project layout

- `artifacts/agency-site` — production React/Vite website
- `artifacts/api-server` — production Express API and static host
- `lib/db` — PostgreSQL schema and Drizzle migrations
- `lib/api-zod` — shared request/response contracts
- `archive/legacy` — historical implementations retained for reference only

Only the canonical paths above participate in the production workspace. Do not deploy or patch code under `archive/legacy`.

## Requirements

- Node.js 24
- pnpm 11.2.2 (the version used in CI)
- PostgreSQL 15 or newer, locally installed or managed by a hosting provider

## Local verification

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm --filter @workspace/api-server test
pnpm --filter @workspace/agency-site test
pnpm run build
```

The API tests bind an ephemeral localhost port. The root build verifies every
workspace package, including the deployable agency site and API.

## Start locally

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env
```

Set `DATABASE_URL` in `.env` to a running PostgreSQL database. You can then use
the manager's interactive menu:

```bash
./manage.sh
```

Choose “Start production app” to build the site and API, start the combined
server in the background, and wait for its health endpoint. Open
`http://localhost:5001` (or the `PORT` configured in `.env`). Commands are also
available directly: `./manage.sh start`, `stop`, `restart`, `status`, `logs`,
`install`, and `build`. Database migrations run at startup when
`RUN_MIGRATIONS=true`. PostgreSQL must be available separately, locally or
through a managed database service.

## Production deployment

1. Copy `.env.example` to `.env` and replace every example value. At minimum,
   set `DATABASE_URL` and `FRONTEND_URL`. Set the Resend variables if contact
   notifications should be emailed.
2. Install dependencies and build the application:

   ```bash
   corepack enable
   pnpm install --frozen-lockfile
   pnpm run build
   ```

3. Start the application from the repository root:

   ```bash
   pnpm start
   ```

4. Run that command under the hosting platform's process supervisor or a service
   manager such as systemd, and route HTTPS traffic to `PORT` (default `5001`).
5. Verify `GET /api/healthz` for process liveness and `GET /api/readyz` for
   database readiness.

Database migrations run before the server accepts traffic when `RUN_MIGRATIONS`
is enabled. Backups, TLS, access control, and availability for PostgreSQL are the
responsibility of the selected database provider or server administrator.

## Configuration

See `.env.example` for the complete list. Important production settings:

- `FRONTEND_URL`: comma-separated allowed browser origins for CORS.
- `TRUST_PROXY_HOPS`: number of trusted reverse-proxy hops; use `0` only when
  the app is directly exposed.
- `DB_SSL`: set to `true` for hosted PostgreSQL providers that require TLS.
- `RUN_MIGRATIONS`: keep `true` for a single application replica. For a
  multi-replica rollout, run migrations as a separate release job and set this
  to `false` on the replicas.
- `VITE_API_URL`: leave empty for the recommended same-origin deployment.
- `VITE_GA_MEASUREMENT_ID`: optional Google Analytics measurement ID. Analytics remains disabled until the visitor opts in.
- `CONTACT_RETENTION_DAYS`: automatic inquiry-retention window; defaults to 1095 days.

Contact notification failures are persisted and retried with exponential backoff. After a deployment, monitor logs for `Contact notification queued for retry` and investigate any records whose notification status reaches `DEAD`.
When `ADMIN_API_TOKEN` is configured, `GET /api/internal/contact-delivery` provides a PII-minimized delivery summary and the latest failed record IDs.

Do not commit `.env`, database files, logs, or generated build output.
