import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Layers,
  LayoutGrid,
  Moon,
  Palette,
  Search,
  Smartphone,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSEO } from "@/hooks/useDocumentTitle";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";

const PROJECT_PATH = "/portfolio/aura-architecture";
const SOCIAL_IMAGE = "/portfolio/aura-architecture/og.jpg";
const SCREENSHOT_PATH = "/portfolio/aura-architecture/screenshots";
const PROJECT_IMAGE = `${SCREENSHOT_PATH}/home.webp`;

type GalleryImage = {
  src: string;
  thumbnail: string;
  title: string;
  alt: string;
  width: number;
  height: number;
};

const gallery: GalleryImage[] = [
  {
    src: `${SCREENSHOT_PATH}/home.webp`,
    thumbnail: `${SCREENSHOT_PATH}/home.webp`,
    title: "Homepage",
    alt: "Full-page screenshot of the AURA Architecture Studio homepage",
    width: 1440,
    height: 6000,
  },
  {
    src: `${SCREENSHOT_PATH}/services.webp`,
    thumbnail: `${SCREENSHOT_PATH}/services.webp`,
    title: "Services",
    alt: "Screenshot of the AURA Architecture Studio services page showing three disciplines",
    width: 1440,
    height: 4200,
  },
  {
    src: `${SCREENSHOT_PATH}/interior-design.webp`,
    thumbnail: `${SCREENSHOT_PATH}/interior-design.webp`,
    title: "Interior Design",
    alt: "Screenshot of the AURA Interior Design service detail page",
    width: 1440,
    height: 5800,
  },
  {
    src: `${SCREENSHOT_PATH}/exterior-design.webp`,
    thumbnail: `${SCREENSHOT_PATH}/exterior-design.webp`,
    title: "Exterior Design",
    alt: "Screenshot of the AURA Exterior Design service detail page",
    width: 1440,
    height: 5800,
  },
  {
    src: `${SCREENSHOT_PATH}/portfolio-page.webp`,
    thumbnail: `${SCREENSHOT_PATH}/portfolio-page.webp`,
    title: "Portfolio",
    alt: "Screenshot of the AURA Architecture Studio portfolio page with filterable project cards",
    width: 1440,
    height: 4800,
  },
  {
    src: `${SCREENSHOT_PATH}/about.png`,
    thumbnail: `${SCREENSHOT_PATH}/about.png`,
    title: "About",
    alt: "Screenshot of the AURA Architecture Studio about page",
    width: 1440,
    height: 3600,
  },
  {
    src: `${SCREENSHOT_PATH}/contact.webp`,
    thumbnail: `${SCREENSHOT_PATH}/contact.webp`,
    title: "Start a Project",
    alt: "Screenshot of the AURA Architecture Studio project brief / contact form page",
    width: 1440,
    height: 4000,
  },
];

const capabilities = [
  {
    icon: Palette,
    title: "Dark editorial design system",
    copy: "A deep charcoal palette with warm terracotta accents and serif headings creates a premium, gallery-quality feel that positions the studio above typical architecture websites.",
  },
  {
    icon: Layers,
    title: "Three-discipline service structure",
    copy: "Architectural Design, Interior Design, and Exterior Design each have dedicated detail pages with scope, deliverables, typical process, and an FAQ — removing ambiguity before the first call.",
  },
  {
    icon: LayoutGrid,
    title: "Filterable portfolio grid",
    copy: "Projects are filterable by discipline, status, and location, with clear 'Concept Visualisation' and 'Completed Project' status badges so prospective clients always know what they're looking at.",
  },
  {
    icon: Search,
    title: "Structured project brief form",
    copy: "A detailed intake form captures property type, required service, budget band, and project brief — giving the studio qualified leads instead of generic enquiries.",
  },
  {
    icon: Moon,
    title: "Light / dark mode toggle",
    copy: "A theme toggle in the navbar lets visitors switch between light and dark presentations without losing state — catering to both daytime and evening browsing habits.",
  },
  {
    icon: Smartphone,
    title: "Responsive across all devices",
    copy: "Every page — from the homepage hero to the filterable portfolio — is fully responsive, with touch-optimised interactions and consistent typography at any viewport.",
  },
];

const deliverables = [
  "Multi-page website with 10+ custom-designed pages",
  "Responsive design across mobile, tablet, and desktop",
  "Light / dark mode theme toggle",
  "Filterable portfolio grid with status badges",
  "Three service detail pages with scope and FAQ sections",
  "Structured project brief intake form",
  "Floating WhatsApp + Call contact widget",
  "Before / after design comparison slider on homepage",
  "Schema.org structured data for local SEO",
  "Performance-optimised WebP imagery pipeline",
];

const techStack = [
  "React", "TypeScript", "Tailwind CSS", "Wouter", "shadcn/ui",
  "Vite", "WebP media pipeline", "Schema.org", "Responsive UX",
];

export default function AuraArchitectureCaseStudyPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useSEO({
    title: "AURA Architecture Website Case Study | We Raise Tech",
    description:
      "How We Raise Tech designed and built a premium multi-page website for AURA, an architecture, interior, and exterior design studio in India.",
    path: PROJECT_PATH,
    image: SOCIAL_IMAGE,
    imageWidth: 1200,
    imageHeight: 630,
    imageType: "image/jpeg",
    brandTitle: false,
    keywords: [
      "AURA Architecture Studio case study",
      "architecture website design",
      "UI/UX design India",
      "interior design website",
      "dark theme website design",
      "We Raise Tech portfolio",
    ],
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "AURA Architecture Studio", path: PROJECT_PATH },
      ]),
      caseStudyJsonLd({
        name: "AURA Architecture Studio Website",
        description:
          "Premium dark-themed multi-page website for an architecture, interior design, and exterior design practice, featuring a filterable portfolio, structured project brief form, and service detail pages.",
        path: PROJECT_PATH,
        image: PROJECT_IMAGE,
        clientName: "AURA Architecture Studio",
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
            <span className="text-foreground">AURA Architecture Studio</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <AnimateOnScroll>
              <div className="mb-5 inline-flex rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                UI/UX Design · 2026
              </div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                AURA Architecture{" "}
                <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  a property designed end to end.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                A premium dark-themed multi-page website for an architecture, interior, and exterior design studio in India — built to position the practice, showcase completed and concept projects, and convert first-time visitors into qualified enquiries.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <GradientButton
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold"
                >
                  Start a Similar Project <ArrowRight className="h-4 w-4" />
                </GradientButton>
              </div>
            </AnimateOnScroll>

            {/* Hero screenshot */}
            <AnimateOnScroll>
              <div className="mx-auto max-w-[400px] overflow-hidden rounded-2xl border border-border shadow-2xl">
                <img
                  src={gallery[0].thumbnail}
                  alt="AURA Architecture Studio homepage preview"
                  className="h-[420px] w-full object-cover object-top"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </AnimateOnScroll>
          </div>

          {/* Quick meta */}
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
            {[
              { label: "Client", value: "AURA Architecture Studio" },
              { label: "Industry", value: "Architecture & Design" },
              { label: "Category", value: "UI/UX Design" },
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

      {/* ── Overview ── */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimateOnScroll>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">The brief</p>
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
                One studio. Three disciplines. A single cohesive website.
              </h2>
              <div className="space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  AURA Architecture Studio needed a website that did more than list services — it needed to communicate a clear design philosophy, build credibility with concept-stage and completed work, and give prospective clients a structured way to start a conversation.
                </p>
                <p>
                  The studio's three disciplines (architecture, interior design, and exterior design) had previously been difficult to explain clearly. Visitors arriving from search or referral often left without understanding what was included in a typical engagement, what the deliverables looked like, or how much involvement the studio expected from the client.
                </p>
                <p>
                  We designed and built a dark editorial website with a warm accent palette, structured service pages, a filterable portfolio, and a detailed intake form — giving the studio a client-facing presence that works as hard as the design practice itself.
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
              Six design decisions that drive results
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
              Every page, every screen
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
                  <Building2 className="mb-3 h-6 w-6 text-primary" aria-hidden="true" />
                  <p className="mb-1 text-sm font-bold text-foreground">Architecture studio · India</p>
                  <p className="text-sm leading-7 text-muted-foreground">
                    AURA Architecture Studio offers architecture, interior design, and exterior design for homes and selected commercial spaces in India. The website positions the studio's integrated approach clearly — from first visit to qualified enquiry.
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
                Ready to build your studio's online presence?
              </h2>
              <p className="mb-8 text-base leading-8 text-muted-foreground">
                Whether you're a design practice, a service business, or a product startup, we'll design and build a site that reflects your work and converts the right clients.
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
            {selectedImage?.title ?? "Screenshot"} — AURA Architecture Studio
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
