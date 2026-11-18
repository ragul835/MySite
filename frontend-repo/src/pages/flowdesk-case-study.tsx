import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  KanbanSquare,
  Radio,
  ShieldCheck,
  UserCircle2,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSEO } from "@/hooks/useDocumentTitle";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";

const PROJECT_PATH = "/portfolio/flowdesk";
const SOCIAL_IMAGE = "/portfolio/flowdesk/og.jpg";
const SCREENSHOT_PATH = "/portfolio/flowdesk/screenshots";
const PROJECT_IMAGE = `${SCREENSHOT_PATH}/dashboard.webp`;

type GalleryImage = {
  src: string;
  thumbnail: string;
  title: string;
  alt: string;
  width: number;
  height: number;
};

const shot = (file: string, title: string, alt: string, width: number, height: number): GalleryImage => ({
  src: `${SCREENSHOT_PATH}/${file}`,
  thumbnail: `${SCREENSHOT_PATH}/${file}`,
  title,
  alt,
  width,
  height,
});

const gallery: GalleryImage[] = [
  shot("dashboard.webp", "Dashboard", "FlowDesk dashboard with project, task, completion-rate and top-contributor stats, status and priority breakdowns, recent activity, and project cards", 1350, 1224),
  shot("kanban-board.webp", "Kanban Board", "FlowDesk Customer Portal Kanban board with Backlog, To Do, In Progress, and Done columns, search, and priority and assignee filters", 1365, 961),
  shot("new-project.webp", "New Project", "FlowDesk new project dialog with project name and description fields, restricted to Admin or Owner roles", 1350, 1224),
  shot("team-members.webp", "Team Members", "FlowDesk team members page with invite form and Owner, Admin, and Member role controls", 1365, 961),
  shot("profile-settings.webp", "Profile & Settings", "FlowDesk profile and settings page with name, job title, avatar color picker, and change password form", 1365, 961),
  shot("landing.webp", "Landing Page", "FlowDesk marketing landing page with hero, call-to-action buttons, and feature cards", 1365, 961),
  shot("log-in.webp", "Log In", "FlowDesk log in page with email, password, and forgot password link", 1350, 1057),
  shot("create-account.webp", "Create Account", "FlowDesk create account page with full name, email, and password fields", 1350, 1057),
];

const capabilities = [
  {
    icon: KanbanSquare,
    title: "Kanban boards per project",
    copy: "Each project gets a drag-and-drop board with Backlog, To Do, In Progress, and Done columns. Cards show priority badges, due dates, comment counts, and assignees, with search plus priority and assignee filters.",
  },
  {
    icon: Radio,
    title: "Real-time sync & presence",
    copy: "WebSocket-powered updates push task moves, edits, and comments to every teammate instantly, with a live presence indicator showing who else is on the board.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access control",
    copy: "Owner, Admin, and Member roles gate sensitive actions — only Admins and Owners can create projects or manage the team — enforced on both the API and the UI.",
  },
  {
    icon: BarChart3,
    title: "Analytics dashboard",
    copy: "At-a-glance stats for projects, total tasks, completion rate, and top contributor, plus tasks-by-status and tasks-by-priority breakdowns and per-project progress bars.",
  },
  {
    icon: Users,
    title: "Team & workspace management",
    copy: "Invite members by email with a chosen role, change roles inline, and remove members — with every change recorded in the workspace activity feed.",
  },
  {
    icon: UserCircle2,
    title: "Accounts, auth & profiles",
    copy: "Sign-up, log-in, and password reset flows, plus a profile page for name, job title, avatar color, and password changes reflected across the whole app.",
  },
];

const deliverables = [
  "Multi-tenant SaaS web application with workspaces",
  "Marketing landing page with feature highlights and sign-up CTAs",
  "Sign up, log in, and forgot password flows",
  "Dashboard with KPIs, status & priority breakdowns, and activity feed",
  "Per-project Kanban boards with drag-and-drop task cards",
  "Task search plus priority and assignee filters",
  "Real-time board updates and live presence over WebSockets",
  "New project dialog with role-gated permissions",
  "Team page with email invites and Owner / Admin / Member roles",
  "Profile & settings with avatar color and password change",
  "Workspace-wide recent activity log",
  "Responsive layout across mobile, tablet, and desktop",
];

const techStack = [
  "React", "TypeScript", "Tailwind CSS", "Node.js", "WebSockets",
  "PostgreSQL", "Prisma", "REST API", "JWT Auth", "RBAC", "Vite",
];

const keyResults = [
  { label: "Core app screens", value: "8+" },
  { label: "Workflow columns", value: "4" },
  { label: "Access roles", value: "3" },
  { label: "Live sync latency", value: "Real-time" },
];

export default function FlowDeskCaseStudyPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useSEO({
    title: "FlowDesk SaaS Project Management Case Study | We Raise Tech",
    description:
      "How We Raise Tech built FlowDesk, a SaaS project management platform with Kanban boards, real-time sync, role-based access, and team analytics.",
    path: PROJECT_PATH,
    image: SOCIAL_IMAGE,
    imageWidth: 1200,
    imageHeight: 630,
    imageType: "image/jpeg",
    brandTitle: false,
    keywords: [
      "FlowDesk SaaS case study",
      "project management SaaS",
      "Kanban board app",
      "real-time collaboration app",
      "We Raise Tech portfolio",
    ],
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "FlowDesk", path: PROJECT_PATH },
      ]),
      caseStudyJsonLd({
        name: "FlowDesk SaaS Project Management Platform",
        description:
          "Multi-tenant SaaS project management app with Kanban boards, WebSocket real-time sync, role-based access, and analytics dashboard.",
        path: PROJECT_PATH,
        image: PROJECT_IMAGE,
        clientName: "FlowDesk",
        dateCreated: "2026",
      }),
    ],
  });

  return (
    <div className="w-full overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,hsl(var(--primary)/0.16),transparent)]" />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href="/portfolio" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Portfolio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">FlowDesk</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <AnimateOnScroll>
              <div className="mb-5 inline-flex rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                SaaS · 2026
              </div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                FlowDesk{" "}
                <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  where teams ship faster.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                A SaaS project management platform with Kanban boards, real-time collaboration over WebSockets, Owner / Admin / Member roles, and an analytics dashboard — so every team stays on the same page, instantly.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <GradientButton
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold"
                >
                  Build a SaaS Like This <ArrowRight className="h-4 w-4" />
                </GradientButton>
              </div>
            </AnimateOnScroll>

            {/* Hero screenshot — dashboard */}
            <AnimateOnScroll>
              <div className="mx-auto overflow-hidden rounded-2xl border border-border shadow-2xl">
                <img
                  src={gallery[0].thumbnail}
                  alt="FlowDesk dashboard preview"
                  width={gallery[0].width}
                  height={gallery[0].height}
                  className="h-auto max-h-[480px] w-full object-cover object-top"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </AnimateOnScroll>
          </div>

          {/* Quick meta */}
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
            {[
              { label: "Product", value: "FlowDesk" },
              { label: "Industry", value: "Productivity & Collaboration" },
              { label: "Category", value: "SaaS" },
              { label: "Year", value: "2026" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Key numbers ── */}
      <section className="border-t border-border bg-muted/40 py-10">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {keyResults.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold text-foreground sm:text-4xl">{value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Overview ── */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimateOnScroll>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">The brief</p>
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
                A project tool teams actually keep open all day.
              </h2>
              <div className="space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  FlowDesk set out to be a focused alternative to bloated project management suites: workspaces, projects, and tasks that a small team can understand in minutes, with the collaboration features they expect from modern SaaS.
                </p>
                <p>
                  Every project lives on a Kanban board with Backlog, To Do, In Progress, and Done columns. Tasks carry priorities, due dates, comments, and assignees, and changes stream to every open browser over WebSockets — so when one teammate moves a card, everyone sees it immediately, along with who is currently online.
                </p>
                <p>
                  Around the board sits everything a growing team needs: role-based access with Owner, Admin, and Member permissions, email invites, a profile and settings area, and a dashboard that turns task data into completion rate, workload, and priority breakdowns.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Capabilities ── */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <AnimateOnScroll>
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">What we built</p>
            <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything a team needs to plan and ship
            </h2>
          </AnimateOnScroll>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, copy }) => (
              <AnimateOnScroll key={title}>
                <div className="rounded-2xl border border-border bg-card p-6 h-full">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-base font-bold">{title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{copy}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Screenshot gallery ── */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <AnimateOnScroll>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Page by page</p>
            <h2 className="mb-10 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Every screen, every flow
            </h2>
          </AnimateOnScroll>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gallery.map((img) => (
              <AnimateOnScroll key={img.title}>
                <button
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className="group relative w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`View ${img.title} screenshot`}
                >
                  <img
                    src={img.thumbnail}
                    alt={img.alt}
                    className="h-44 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-xs font-semibold text-white">{img.title} →</span>
                  </div>
                  <p className="p-2.5 text-center text-xs font-medium text-muted-foreground">{img.title}</p>
                </button>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Deliverables + Stack ── */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            <AnimateOnScroll>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Deliverables</p>
                <h2 className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl">What was delivered</h2>
                <ul className="space-y-3">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Tech stack</p>
                <h2 className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl">Built with</h2>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
                  <Radio className="mb-3 h-6 w-6 text-primary" aria-hidden="true" />
                  <p className="mb-1 text-sm font-bold text-foreground">Real-time by default</p>
                  <p className="text-sm leading-7 text-muted-foreground">
                    FlowDesk is built around a WebSocket layer that broadcasts task and board changes per project room, so boards, dashboards, and activity feeds stay in sync across every teammate without a refresh.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <AnimateOnScroll>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Work with us</p>
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ready to build your SaaS product?
              </h2>
              <p className="mb-8 text-base leading-8 text-muted-foreground">
                From MVP to multi-tenant platform, we design and build SaaS products with real-time features, role-based access, and dashboards your users will rely on every day.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <GradientButton
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold"
                >
                  Start a Project <ArrowRight className="h-4 w-4" />
                </GradientButton>
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Portfolio
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── Lightbox ── */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background">
          <DialogTitle className="sr-only">
            {selectedImage?.title ?? "Screenshot"} — FlowDesk
          </DialogTitle>
          {selectedImage && (
            <div className="flex flex-col">
              <div className="border-b border-border px-5 py-3 pr-12">
                <p className="text-sm font-semibold text-foreground">{selectedImage.title}</p>
              </div>
              <div className="max-h-[70vh] overflow-y-auto">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
                <button
                  type="button"
                  onClick={() => {
                    const idx = gallery.findIndex((g) => g.src === selectedImage.src);
                    setSelectedImage(gallery[(idx - 1 + gallery.length) % gallery.length]);
                  }}
                  className="rounded-lg border border-border p-2.5 text-muted-foreground hover:text-foreground transition"
                  aria-label="Previous screenshot"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <span className="text-xs font-medium text-muted-foreground tabular-nums">
                  {gallery.findIndex((g) => g.src === selectedImage.src) + 1} / {gallery.length}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const idx = gallery.findIndex((g) => g.src === selectedImage.src);
                    setSelectedImage(gallery[(idx + 1) % gallery.length]);
                  }}
                  className="rounded-lg border border-border p-2.5 text-muted-foreground hover:text-foreground transition"
                  aria-label="Next screenshot"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
