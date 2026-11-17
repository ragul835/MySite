import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Activity,
  Dumbbell,
  Droplets,
  Flag,
  Trophy,
  Medal,
  Scale,
  Smartphone,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSEO } from "@/hooks/useDocumentTitle";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";

const PROJECT_PATH = "/portfolio/fitpulse";
const SOCIAL_IMAGE = "/portfolio/fitpulse/og.jpg";
const SCREENSHOT_PATH = "/portfolio/fitpulse/screenshots";
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
  shot("home.webp", "Home", "FitPulse home screen with steps, calories, and active-minute rings, water intake, streak, workout and distance stats, weekly steps chart, and recent workouts", 1288, 961),
  shot("workouts.webp", "Workouts", "FitPulse workouts list with activity-type filters, intensity badges, duration, distance, date, and calories per workout", 1288, 961),
  shot("log-workout.webp", "Log Workout", "FitPulse log workout form with activity type, title, duration, auto-estimated calories, distance, and intensity", 1288, 961),
  shot("activity.webp", "Activity", "FitPulse activity screen with today's steps, calories, active minutes and distance, quick step logging, water tracker, and 7 / 30-day charts", 1288, 961),
  shot("goals.webp", "Goals", "FitPulse goals screen with weekly step, calorie, distance, and workout targets and progress bars", 1288, 961),
  shot("profile.webp", "Profile", "FitPulse profile with body stats, BMI, weight trend chart against goal weight, and links to achievements and leaderboard", 1288, 961),
  shot("achievements.webp", "Achievements", "FitPulse achievements screen with bronze, silver, and gold badges, unlocked count, and progress toward locked badges", 1288, 961),
  shot("leaderboard.webp", "Leaderboard", "FitPulse weekly steps leaderboard ranking friends with medals and active minutes", 1288, 961),
  shot("sign-in.webp", "Sign In", "FitPulse sign in screen with email and password", 1288, 961),
  shot("sign-up.webp", "Sign Up", "FitPulse sign up screen with name, email, and password", 1288, 961),
];

const capabilities = [
  {
    icon: Activity,
    title: "Daily activity rings",
    copy: "Steps, calories, and active minutes are shown as concentric progress rings against daily targets, with a weekly steps chart and 7 / 30-day trends on the Activity tab.",
  },
  {
    icon: Dumbbell,
    title: "Workout logging",
    copy: "Log runs, walks, rides, strength, yoga, HIIT, and swims with duration, distance, and intensity — calories are auto-estimated from activity type and effort, then filterable by type.",
  },
  {
    icon: Droplets,
    title: "Water & quick logging",
    copy: "One-tap +250 ml and +500 ml water logging with a drop tracker, plus a quick step logger for activity recorded outside the app.",
  },
  {
    icon: Flag,
    title: "Weekly goals",
    copy: "Users set weekly or daily targets for steps, calories, distance, or workout count, and progress updates automatically from logged activity.",
  },
  {
    icon: Trophy,
    title: "Achievements & streaks",
    copy: "Bronze, silver, and gold badges for milestones like workout counts, active streaks, and total distance, with progress bars toward the next unlock.",
  },
  {
    icon: Medal,
    title: "Friends leaderboard",
    copy: "A weekly steps leaderboard ranks the user against friends with medals and active minutes, adding light competition to keep people moving.",
  },
  {
    icon: Scale,
    title: "Body stats & weight trend",
    copy: "Age, height, and weight with automatic BMI, plus a weight trend chart plotted against the user's goal weight from every logged entry.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first experience",
    copy: "A thumb-friendly dark UI with bottom tab navigation, a floating log button, and full-screen forms designed for quick use on the go.",
  },
];

const deliverables = [
  "Mobile-first fitness tracking web app with bottom tab navigation",
  "Sign in and sign up flows with secure accounts",
  "Home dashboard with activity rings, streak, and weekly chart",
  "Workout log for 7 activity types with intensity levels",
  "Auto-estimated calories from activity type, duration, and intensity",
  "Activity tab with step and water logging and 7 / 30-day charts",
  "Weekly and daily goals for steps, calories, distance, and workouts",
  "Achievements system with bronze, silver, and gold badges",
  "Weekly steps leaderboard with friends",
  "Profile with body stats, BMI, and weight trend chart",
  "Editable daily targets for steps, calories, and active minutes",
  "Dark, responsive UI optimised for phones and desktops",
];

const techStack = [
  "React", "TypeScript", "Tailwind CSS", "Node.js", "Express",
  "PostgreSQL", "Prisma", "REST API", "JWT Auth", "Recharts", "PWA", "Vite",
];

const keyResults = [
  { label: "App screens", value: "10" },
  { label: "Activity types", value: "7" },
  { label: "Badges to unlock", value: "11" },
  { label: "Goal metrics", value: "4" },
];

export default function FitPulseCaseStudyPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useSEO({
    title: "FitPulse Fitness Tracking App Case Study | We Raise Tech",
    description:
      "How We Raise Tech built FitPulse, a mobile-first fitness app with workout logging, activity and water tracking, weekly goals, achievements, and a friends leaderboard.",
    path: PROJECT_PATH,
    image: SOCIAL_IMAGE,
    imageWidth: 1200,
    imageHeight: 630,
    imageType: "image/jpeg",
    brandTitle: false,
    keywords: [
      "FitPulse app case study",
      "fitness tracking app development",
      "workout tracker app",
      "health and fitness app",
      "We Raise Tech portfolio",
    ],
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "FitPulse", path: PROJECT_PATH },
      ]),
      caseStudyJsonLd({
        name: "FitPulse Fitness Tracking App",
        description:
          "Mobile-first fitness tracking app with workout logging, activity rings, water tracking, weekly goals, achievements, leaderboard, and weight trends.",
        path: PROJECT_PATH,
        image: PROJECT_IMAGE,
        clientName: "FitPulse",
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
            <span className="text-foreground">FitPulse</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <AnimateOnScroll>
              <div className="mb-5 inline-flex rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                App · 2026
              </div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                FitPulse{" "}
                <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  every move counts.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                A mobile-first fitness app for logging workouts, tracking steps, calories, and water, hitting weekly goals, and staying motivated with badges, streaks, and a friends leaderboard.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <GradientButton
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold"
                >
                  Build an App Like This <ArrowRight className="h-4 w-4" />
                </GradientButton>
              </div>
            </AnimateOnScroll>

            {/* Hero screenshot — dashboard */}
            <AnimateOnScroll>
              <div className="mx-auto overflow-hidden rounded-2xl border border-border shadow-2xl">
                <img
                  src={gallery[0].thumbnail}
                  alt="FitPulse home screen preview"
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
              { label: "Product", value: "FitPulse" },
              { label: "Industry", value: "Health & Fitness" },
              { label: "Category", value: "App" },
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
                A fitness tracker people actually open every day.
              </h2>
              <div className="space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  FitPulse was designed for everyday movers rather than athletes: people who want to see at a glance how active they have been today, log a workout in seconds, and get a gentle nudge to keep going.
                </p>
                <p>
                  The home screen brings steps, calories, and active minutes together as progress rings, alongside water intake, the current streak, and a weekly steps chart. Workouts are logged across seven activity types with duration, distance, and intensity, and calories are estimated automatically so logging never feels like a chore.
                </p>
                <p>
                  Motivation is built in: weekly goals that fill up from real activity, bronze-to-gold achievement badges, a friends leaderboard, and a profile with BMI and a weight trend chart that shows progress toward a goal weight over time.
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
              Everything to track, log, and stay motivated
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
                  <Trophy className="mb-3 h-6 w-6 text-primary" aria-hidden="true" />
                  <p className="mb-1 text-sm font-bold text-foreground">Motivation built into the data</p>
                  <p className="text-sm leading-7 text-muted-foreground">
                    Goals, streaks, badges, and leaderboard rankings are all derived from the same logged workouts and activity, so every step a user records moves several progress bars at once.
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
                Ready to build your app?
              </h2>
              <p className="mb-8 text-base leading-8 text-muted-foreground">
                From first prototype to launch, we design and build mobile-first apps with engaging tracking, goals, and gamification that keep users coming back every day.
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
            {selectedImage?.title ?? "Screenshot"} — FitPulse
          </DialogTitle>
          {selectedImage && (
            <div className="flex flex-col">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <p className="text-sm font-semibold text-foreground">{selectedImage.title}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const idx = gallery.findIndex((g) => g.src === selectedImage.src);
                      setSelectedImage(gallery[(idx - 1 + gallery.length) % gallery.length]);
                    }}
                    className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground transition"
                    aria-label="Previous screenshot"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const idx = gallery.findIndex((g) => g.src === selectedImage.src);
                      setSelectedImage(gallery[(idx + 1) % gallery.length]);
                    }}
                    className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground transition"
                    aria-label="Next screenshot"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="max-h-[80vh] overflow-y-auto">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
