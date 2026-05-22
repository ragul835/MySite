# NexCore — Digital Engineering Agency Website

A full 5-page marketing website for a modern digital engineering agency. Dark-themed, glassmorphism design with Framer Motion animations.

## Run & Operate

- `pnpm --filter @workspace/agency-site run dev` — run the frontend (uses PORT env var)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Framer Motion, shadcn/ui, wouter
- Fonts: Inter (body) + Poppins (headings) via Google Fonts
- Icons: lucide-react + react-icons/si
- Forms: react-hook-form + zod
- Toasts: sonner
- API: Express 5 (api-server artifact)

## Where things live

- `artifacts/agency-site/src/pages/` — page components (home, about, services, solutions, contact)
- `artifacts/agency-site/src/components/layout/` — Navbar, Footer, Container
- `artifacts/agency-site/src/components/shared/` — SectionHeader, GradientButton, AnimateOnScroll
- `artifacts/agency-site/src/index.css` — all CSS variables / design tokens (dark theme)
- `artifacts/api-server/src/routes/` — Express API routes

## Pages

- `/` — Home: Hero, Services grid, Tech stack tabs, Solutions showcase, CTA
- `/about` — Mission, Engineering Philosophy, Stats with count-up
- `/services` — 7 detailed service sections with alternating layout
- `/solutions` — Filterable project showcase + 4-step process timeline
- `/contact` — Contact form (react-hook-form + zod) + contact info

## Architecture decisions

- Presentation-only frontend — no backend needed for the agency site; contact form logs to console with TODO for future Spring Boot integration
- CSS variables define a single dark theme applied to both `:root` and `.dark` for consistency
- Framer Motion `useInView` drives all scroll-triggered animations

## User preferences

_Populate as you build._

## Gotchas

- Google Fonts `@import url(...)` MUST be the very first line of `index.css` — before `@import "tailwindcss"`
- The contact form `Select` components are controlled separately and synced to react-hook-form via `setValue`
