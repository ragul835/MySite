# NexCore — Digital Engineering Agency Website

A full 5-page marketing website for a modern digital engineering agency, backed by a production-ready Spring Boot REST API.

## Run & Operate

- `pnpm --filter @workspace/agency-site run dev` — run the React frontend (uses PORT env var)
- `mvn -f backend/pom.xml spring-boot:run -Dspring-boot.run.profiles=dev -Dspring-boot.run.jvmArguments=-Dserver.port=5001` — run the Spring Boot API manually
- Both are started automatically via Replit workflows

## Stack

### Frontend
- pnpm workspaces, Node.js 24, TypeScript 5.9
- React + Vite, Tailwind CSS, Framer Motion, shadcn/ui, wouter
- Fonts: Inter (body) + Poppins (headings) via Google Fonts
- Icons: lucide-react + react-icons/si
- Forms: react-hook-form + zod
- Toasts: sonner

### Backend (Spring Boot)
- Java 19 (GraalVM 22.3), Spring Boot 3.2.3, Maven
- Spring Security 6 + JWT (jjwt 0.12.3)
- Spring Data JPA + Hibernate 6 + PostgreSQL (Replit DB)
- SpringDoc OpenAPI / Swagger UI at `/api/v1/swagger-ui.html`
- Bucket4j rate limiting (5 req/min contact, 10 req/15min login)
- Async email notifications via Spring Mail
- BCrypt password hashing (strength 12)

## Where things live

### Frontend
- `artifacts/agency-site/src/pages/` — page components (home, about, services, solutions, contact)
- `artifacts/agency-site/src/components/layout/` — Navbar, Footer, Container
- `artifacts/agency-site/src/components/shared/` — SectionHeader, GradientButton, AnimateOnScroll
- `artifacts/agency-site/src/index.css` — all CSS variables / design tokens (dark theme)

### Backend
- `backend/pom.xml` — Maven build config
- `backend/src/main/java/com/agency/backend/` — all Java source
  - `modules/auth/` — JWT login + admin register
  - `modules/contact/` — contact form + email notifications
  - `modules/projects/` — project portfolio CRUD
  - `modules/services/` — agency services CRUD
  - `modules/users/` — user entity + Spring Security UserDetails
  - `config/` — SecurityConfig, JwtTokenProvider, JwtAuthenticationFilter, CorsConfig, OpenApiConfig, RateLimitConfig
  - `common/` — ApiResponse, PagedResponse, GlobalExceptionHandler, custom exceptions
  - `database/DataSeeder.java` — seeds admin + 7 services + 5 projects (dev profile only)
- `backend/src/main/resources/application.yml` — main config
- `backend/src/main/resources/application-dev.yml` — dev overrides (show SQL, Swagger enabled)
- `backend/src/main/resources/application-prod.yml` — prod overrides (validate DDL, Swagger off)

## Pages

- `/` — Home: Hero, Services grid, Tech stack tabs, Solutions showcase, CTA
- `/about` — Mission, Engineering Philosophy, Stats with count-up
- `/services` — 7 detailed service sections with alternating layout
- `/solutions` — Filterable project showcase + 4-step process timeline
- `/contact` — Contact form → POST /api/v1/contact + contact info

## API Endpoints

All at base path `/api/v1/`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /auth/login | Public | Login → JWT token |
| POST | /auth/register | ADMIN JWT | Register admin |
| POST | /contact | Public (rate-limited) | Contact form |
| GET | /contact | ADMIN JWT | List submissions |
| GET | /contact/{id} | ADMIN JWT | Single submission |
| PATCH | /contact/{id}/status | ADMIN JWT | Update status |
| DELETE | /contact/{id} | ADMIN JWT | Delete submission |
| GET | /projects | Public | List projects |
| GET | /projects/{id} | Public | Single project |
| POST/PUT/DELETE | /projects | ADMIN JWT | Manage projects |
| GET | /services | Public | List services |
| GET | /services/{id} | Public | Single service |
| POST/PUT/DELETE | /services | ADMIN JWT | Manage services |

## Dev Credentials (seeded on dev profile)

- Email: `admin@agency.com`
- Password: `Admin@123`

## Environment Variables (set by Replit)

- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` — PostgreSQL connection
- `SESSION_SECRET` — session secret

## Optional Environment Variables

- `JWT_SECRET` — override JWT signing key (default: base64 key in application.yml, change in production!)
- `MAIL_HOST`, `MAIL_USERNAME`, `MAIL_PASSWORD` — SMTP for email notifications
- `ADMIN_EMAIL` — email to receive contact form notifications
- `FRONTEND_URL` — production frontend URL for CORS

## Architecture decisions

- Spring Boot backend in `backend/` (not inside `artifacts/`) — routed via proxy to `/api/v1`
- `artifacts/api-server` artifact.toml repurposed to route `/api/v1` → port 5001 (Spring Boot)
- LIST[] columns stored as JSON TEXT via `StringListConverter` (compatible with all PostgreSQL versions)
- DataSeeder guarded by `@Profile("dev")` — never runs in production
- Email sending is `@Async` — never blocks API responses; failures are logged only
- JWT secret defaults to a safe dev key; must be overridden in production via `JWT_SECRET`

## User preferences

_Populate as you build._

## Gotchas

- Google Fonts `@import url(...)` MUST be the very first line of `index.css` — before `@import "tailwindcss"`
- The contact form `Select` components are controlled separately and synced to react-hook-form via `setValue`
- Spring Boot's Bucket4j uses `io.github.bucket4j.*` package (not `com.bucket4j.*`)
- Maven runs from the `artifacts/api-server/` working directory in the workflow, so use absolute paths in the artifact.toml run command
- The DataSeeder only runs in `dev` profile — protected by `@Profile("dev")`
