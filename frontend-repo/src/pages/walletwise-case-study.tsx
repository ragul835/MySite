import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChartPie,
  Receipt,
  Landmark,
  PiggyBank,
  ArrowLeftRight,
  Palette,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSEO } from "@/hooks/useDocumentTitle";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";

const PROJECT_PATH = "/portfolio/walletwise";
const SOCIAL_IMAGE = "/portfolio/walletwise/og.jpg";
const SCREENSHOT_PATH = "/portfolio/walletwise/screenshots";
const PROJECT_IMAGE = `${SCREENSHOT_PATH}/overview.webp`;

type GalleryImage = {
  src: string;
  thumbnail: string;
  title: string;
  alt: string;
  width: number;
  height: number;
};

const shot = (file: string, title: string, alt: string): GalleryImage => ({
  src: `${SCREENSHOT_PATH}/${file}`,
  thumbnail: `${SCREENSHOT_PATH}/${file}`,
  title,
  alt,
  width: 800,
  height: 1784,
});

const gallery: GalleryImage[] = [
  shot("overview.webp", "Overview", "WalletWise overview with net worth across four accounts, income, spent and net totals, a spending-by-category donut chart, and a six-month income vs spending bar chart"),
  shot("transactions.webp", "Activity", "WalletWise transactions list grouped by date with merchant search, income / expense and category filters, and per-account labels"),
  shot("accounts.webp", "Accounts", "WalletWise accounts screen with total assets, credit used, and colour-coded checking, savings, credit card, and cash account cards"),
  shot("budgets.webp", "Budgets", "WalletWise budgets screen with monthly spend against target and category budgets with progress bars and over-budget warnings"),
  shot("add-expense.webp", "Add Expense", "WalletWise add expense sheet with amount, account picker, category chips, optional merchant, and date"),
  shot("add-income.webp", "Add Income", "WalletWise add income sheet with amount, account, salary, freelance, investment, gifts and other categories, and date"),
  shot("profile.webp", "Profile", "WalletWise profile with net worth, account and activity counts, and settings for name, monthly budget target, and accent colour"),
  shot("sign-in.webp", "Sign In", "WalletWise sign in screen with email and password"),
  shot("sign-up.webp", "Sign Up", "WalletWise create account screen with name, email, and password"),
];

const heroShots = [gallery[2], gallery[0], gallery[3]];

const capabilities = [
  {
    icon: ChartPie,
    title: "Net worth at a glance",
    copy: "The overview rolls every account into one net worth figure with income, spent, and net totals for the month, a spending-by-category donut, and a six-month income vs spending chart.",
  },
  {
    icon: Receipt,
    title: "Fast transaction logging",
    copy: "A bottom sheet adds an expense or income in seconds: amount, account, a category chip, an optional merchant, and the date — balances and charts update instantly.",
  },
  {
    icon: ArrowLeftRight,
    title: "Searchable activity feed",
    copy: "Transactions are grouped by day with merchant and note search, plus income, expense, and category filters, and each entry shows the account it came from.",
  },
  {
    icon: Landmark,
    title: "Multiple accounts",
    copy: "Checking, savings, credit card, and cash accounts each track their own balance from an opening amount, with total assets and credit used summarised up top.",
  },
  {
    icon: PiggyBank,
    title: "Category budgets",
    copy: "Monthly limits per category with progress bars and percentage badges that turn amber near the limit and red when a budget is over, plus a total left-to-spend figure.",
  },
  {
    icon: Palette,
    title: "Personal settings",
    copy: "Users edit their name, set a monthly budget target, and pick an accent colour that themes the whole app.",
  },
  {
    icon: ShieldCheck,
    title: "Secure accounts",
    copy: "Sign up and sign in flows with hashed passwords and token-based sessions keep each person's financial data private to them.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first experience",
    copy: "A clean light UI with bottom tab navigation, a floating Add button, and thumb-friendly sheets designed for logging spending on the go.",
  },
];

const deliverables = [
  "Mobile-first personal finance web app with bottom tab navigation",
  "Sign up and sign in flows with secure accounts",
  "Overview dashboard with net worth and monthly income, spent, and net",
  "Spending-by-category donut and six-month income vs spending chart",
  "Add expense and add income sheets with 11 expense and 5 income categories",
  "Activity feed grouped by date with search and filters",
  "Checking, savings, credit card, and cash accounts with live balances",
  "Monthly category budgets with near-limit and over-budget states",
  "Profile with net worth, account and activity counts",
  "Editable name, monthly budget target, and accent colour",
  "Responsive UI optimised for phones and desktops",
];

const techStack = [
  "React", "TypeScript", "Tailwind CSS", "Node.js", "Express",
  "PostgreSQL", "Prisma", "REST API", "JWT Auth", "Recharts", "PWA", "Vite",
];

const keyResults = [
  { label: "App screens", value: "9" },
  { label: "Account types", value: "4" },
  { label: "Spending categories", value: "11" },
  { label: "Income categories", value: "5" },
];

export default function WalletWiseCaseStudyPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useSEO({
    title: "WalletWise Personal Finance App Case Study | We Raise Tech",
    description:
      "How We Raise Tech built WalletWise, a mobile-first personal finance app with multi-account net worth, expense tracking, category budgets, and spending charts.",
    path: PROJECT_PATH,
    image: SOCIAL_IMAGE,
    imageWidth: 1200,
    imageHeight: 630,
    imageType: "image/jpeg",
    brandTitle: false,
    keywords: [
      "WalletWise app case study",
      "personal finance app development",
      "budgeting app",
      "expense tracker app",
      "We Raise Tech portfolio",
    ],
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "WalletWise", path: PROJECT_PATH },
      ]),
      caseStudyJsonLd({
        name: "WalletWise Personal Finance App",
        description:
          "Mobile-first personal finance app with net worth tracking, multiple accounts, expense and income logging, category budgets, and spending charts.",
        path: PROJECT_PATH,
        image: PROJECT_IMAGE,
        clientName: "WalletWise",
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
            <span className="text-foreground">WalletWise</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <AnimateOnScroll>
              <div className="mb-5 inline-flex rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                App · 2026
              </div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                WalletWise{" "}
                <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  money, beautifully organized.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                A mobile-first personal finance app for tracking net worth across accounts, logging income and expenses in seconds, and staying on top of monthly category budgets.
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

            {/* Hero screenshots — three phone screens */}
            <AnimateOnScroll>
              <div className="mx-auto flex max-w-xl items-center justify-center gap-3 sm:gap-5">
                {heroShots.map((img, i) => (
                  <div
                    key={img.src}
                    className={`overflow-hidden rounded-[1.25rem] border border-border bg-background shadow-2xl ${
                      i === 1 ? "w-[38%]" : "w-[31%] opacity-95"
                    }`}
                  >
                    <img
                      src={img.thumbnail}
                      alt={`WalletWise ${img.title} screen preview`}
                      width={img.width}
                      height={img.height}
                      className="h-auto w-full"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>

          {/* Quick meta */}
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
            {[
              { label: "Product", value: "WalletWise" },
              { label: "Industry", value: "Personal Finance" },
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
                A money app that feels calm, not complicated.
              </h2>
              <div className="space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  WalletWise was designed for people who want a clear picture of their money without spreadsheets: what they own, what they owe, and where this month's spending went.
                </p>
                <p>
                  The overview brings every account together into a single net worth figure, with the month's income, spending, and net beside it. A category donut shows where money is going, and a six-month bar chart compares income against spending over time.
                </p>
                <p>
                  Logging is built for speed: a bottom sheet captures an expense or income with an amount, account, and category chip in a few taps. Every entry flows straight into account balances, the activity feed, and monthly category budgets that warn when a limit is close or over.
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
              Everything to track, budget, and understand spending
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Screen by screen</p>
            <h2 className="mb-10 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Every screen, every flow
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
                    className="aspect-[9/16] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
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
                  <PiggyBank className="mb-3 h-6 w-6 text-primary" aria-hidden="true" />
                  <p className="mb-1 text-sm font-bold text-foreground">One entry, every view updated</p>
                  <p className="text-sm leading-7 text-muted-foreground">
                    Account balances, net worth, budgets, and charts are all derived from the same transaction log, so a single logged expense updates the whole picture at once.
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
                From first prototype to launch, we design and build mobile-first apps with clear dashboards, fast data entry, and insights that keep users coming back.
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
        <DialogContent className="max-w-md p-0 overflow-hidden bg-background">
          <DialogTitle className="sr-only">
            {selectedImage?.title ?? "Screenshot"} — WalletWise
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
