import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Globe2,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSEO } from "@/hooks/useDocumentTitle";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";

const PROJECT_PATH = "/portfolio/samosasheet";
const PROJECT_IMAGE = "/portfolio/samosasheet/samosa-sheets-rectangular-premium-hero-v3.webp";
const SCREENSHOT_PATH = "/portfolio/samosasheet/screenshots";
const SITE_SCREENSHOT = `${SCREENSHOT_PATH}/homepage-thumb.webp`;

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
    src: `${SCREENSHOT_PATH}/homepage-full.webp`,
    thumbnail: SITE_SCREENSHOT,
    title: "Homepage",
    alt: "Full-page desktop screenshot of the live SamosaSheet homepage",
    width: 1600,
    height: 8673,
  },
  {
    src: `${SCREENSHOT_PATH}/products-full.webp`,
    thumbnail: `${SCREENSHOT_PATH}/products-thumb.webp`,
    title: "Products",
    alt: "Full-page desktop screenshot of the SamosaSheet products page",
    width: 1600,
    height: 1588,
  },
  {
    src: `${SCREENSHOT_PATH}/how-to-use-full.webp`,
    thumbnail: `${SCREENSHOT_PATH}/how-to-use-thumb.webp`,
    title: "How to Use",
    alt: "Full-page desktop screenshot of the SamosaSheet preparation guide",
    width: 1600,
    height: 1954,
  },
  {
    src: `${SCREENSHOT_PATH}/about-full.webp`,
    thumbnail: `${SCREENSHOT_PATH}/about-thumb.webp`,
    title: "About",
    alt: "Full-page desktop screenshot of the SamosaSheet about page",
    width: 1600,
    height: 2052,
  },
  {
    src: `${SCREENSHOT_PATH}/bulk-orders-full.webp`,
    thumbnail: `${SCREENSHOT_PATH}/bulk-orders-thumb.webp`,
    title: "Bulk Orders",
    alt: "Full-page desktop screenshot of the SamosaSheet wholesale enquiries page",
    width: 1600,
    height: 1345,
  },
  {
    src: `${SCREENSHOT_PATH}/contact-full.webp`,
    thumbnail: `${SCREENSHOT_PATH}/contact-thumb.webp`,
    title: "Contact",
    alt: "Full-page desktop screenshot of the SamosaSheet contact and FAQ page",
    width: 1600,
    height: 2862,
  },
  {
    src: `${SCREENSHOT_PATH}/whatsapp-order-flow-full.webp`,
    thumbnail: `${SCREENSHOT_PATH}/whatsapp-order-flow-thumb.webp`,
    title: "WhatsApp Order Flow",
    alt: "Desktop screenshot of the SamosaSheet delivery details modal for WhatsApp ordering",
    width: 1600,
    height: 814,
  },
];

const capabilities = [
  {
    icon: ShoppingBag,
    title: "Product-first catalog",
    copy: "Clear product cards for 5 × 5, 7 × 7, and 8 × 8 inch sheets, with pack size, use case, and storage information.",
  },
  {
    icon: MessageCircle,
    title: "Fast enquiry journey",
    copy: "WhatsApp, phone, bulk-order, and location actions reduce friction for home, restaurant, catering, retail, and wholesale buyers.",
  },
  {
    icon: Smartphone,
    title: "Responsive experience",
    copy: "Touch-friendly navigation, readable product layouts, and responsive calls to action work across mobile, tablet, and desktop.",
  },
  {
    icon: Search,
    title: "Discoverability foundation",
    copy: "Unique metadata, canonical URLs, crawlable content, sitemap coverage, structured data, and regional service-area copy support discovery.",
  },
  {
    icon: ShieldCheck,
    title: "Trust and accessibility",
    copy: "Business details, product guidance, descriptive image text, keyboard focus states, and secure external links improve confidence and usability.",
  },
  {
    icon: Globe2,
    title: "Production delivery",
    copy: "A modern Next.js build with optimized WebP media, cache-friendly assets, and deployment-ready security and sharing metadata.",
  },
];

export default function SamosaSheetCaseStudyPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useSEO({
    title: "SamosaSheet Website Case Study | We Raise Tech",
    description:
      "See how We Raise Tech built SamosaSheet, a responsive, search-ready product catalog and enquiry website for Karpagam Foods in Chennai.",
    path: PROJECT_PATH,
    image: PROJECT_IMAGE,
    imageWidth: 1672,
    imageHeight: 941,
    imageType: "image/webp",
    brandTitle: false,
    keywords: [
      "SamosaSheet case study",
      "food supplier website design",
      "Next.js product catalog",
      "local business website",
      "responsive web development",
    ],
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "SamosaSheet", path: PROJECT_PATH },
      ]),
      caseStudyJsonLd({
        name: "SamosaSheet Website for Karpagam Foods",
        description:
          "Responsive product catalog, wholesale enquiry, local search structure, and WhatsApp conversion website for a Chennai samosa sheet supplier.",
        path: PROJECT_PATH,
        image: PROJECT_IMAGE,
        clientName: "Karpagam Foods",
        clientUrl: "https://samosasheet.com/",
        dateCreated: "2026",
      }),
    ],
  });

  return (
    <div className="w-full overflow-hidden">
      <section className="relative pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,hsl(var(--primary)/0.16),transparent)]" />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href="/portfolio" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Portfolio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">SamosaSheet</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <AnimateOnScroll>
              <div className="mb-5 inline-flex rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Live client project · 2026
              </div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                SamosaSheet
                <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  product discovery made simple.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                A responsive product catalog and enquiry website for Karpagam Foods, helping households and professional kitchens compare ready-made samosa sheets and order with confidence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://samosasheet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
                >
                  Visit live website <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#gallery"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 font-semibold transition hover:border-primary/40 hover:text-primary"
                >
                  View all visuals <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card p-2 shadow-2xl shadow-primary/10">
                <img
                  src={SITE_SCREENSHOT}
                  alt="Desktop screenshot of the live SamosaSheet homepage"
                  width={960}
                  height={720}
                  fetchPriority="high"
                  className="aspect-[6/5] w-full rounded-[1.55rem] object-cover object-top"
                />
              </div>
            </AnimateOnScroll>
          </div>

          <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Client", "Karpagam Foods"],
              ["Industry", "Food manufacturing & supply"],
              ["Delivery", "Website, UX & search strategy"],
              ["Market", "Chennai & South India"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-border/50 bg-card/50 p-5">
                <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</dt>
                <dd className="mt-2 font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-y border-border/40 bg-card/25 py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <AnimateOnScroll>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">The challenge</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Turn a specialist food product into a clear digital buying journey.</h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                Buyers range from families to restaurants, caterers, retailers, and wholesalers. The site needed to explain sheet sizes, pack details, storage, preparation, service areas, and ordering options without making the experience feel technical or crowded.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">The solution</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">A fast catalog built around products, trust, and enquiries.</h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                We shaped the experience around product comparison and buyer intent: strong food photography, direct WhatsApp and phone actions, a wholesale path, folding guidance, frequently asked questions, business information, and location-aware search content.
              </p>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <AnimateOnScroll className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">What we delivered</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">A complete production website, not just a landing page.</h2>
          </AnimateOnScroll>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, copy }) => (
              <AnimateOnScroll key={title}>
                <article className="h-full rounded-2xl border border-border/50 bg-card/45 p-6 transition hover:border-primary/30 hover:bg-card/70">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section id="gallery" className="scroll-mt-24 border-y border-border/40 bg-card/20 py-20 sm:py-24">
        <Container>
          <AnimateOnScroll className="mb-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Project gallery</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">The live website, page by page.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Browse the supplied full-page captures of the production homepage, product catalog, preparation guide, company story, bulk-order journey, contact page, and WhatsApp ordering flow.
            </p>
          </AnimateOnScroll>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image, index) => (
              <AnimateOnScroll key={image.src}>
                <button
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group block w-full overflow-hidden rounded-2xl border border-border/50 bg-card text-left transition hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`Open ${image.title}`}
                >
                  <span className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-white/95">
                    <img
                      src={image.thumbnail}
                      alt={image.alt}
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding="async"
                      width={960}
                      height={720}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.025]"
                    />
                    <span className="absolute right-3 top-3 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-900 shadow-sm backdrop-blur">
                      View capture
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="text-sm font-semibold">{image.title}</span>
                    <span className="text-xs text-muted-foreground">{image.width} × {image.height}</span>
                  </span>
                </button>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Need a product website that earns trust and enquiries?</h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                We can plan, design, build, optimize, and launch the complete experience—from mobile UX and product storytelling to search architecture.
              </p>
              <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
                {["Responsive product experience", "Search structure and schema", "Conversion-focused contact paths", "Production deployment and QA"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <GradientButton href="/contact#contact-form" className="w-full justify-center px-8 py-4 lg:w-auto">
              Start your project <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </GradientButton>
          </div>
        </Container>
      </section>

      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        {selectedImage && (
          <DialogContent className="block max-h-[90vh] max-w-6xl overflow-y-auto overscroll-contain border-white bg-white p-2 text-slate-900 shadow-2xl [&>button]:z-10 [&>button]:rounded-full [&>button]:bg-white [&>button]:p-2 [&>button]:opacity-100">
            <DialogTitle className="sr-only">{selectedImage.title} website screenshot</DialogTitle>
            <figure>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                decoding="async"
                className="h-auto w-full rounded-xl"
              />
              <figcaption className="sticky bottom-0 mx-2 flex items-center justify-between gap-4 rounded-xl bg-white/95 px-4 py-3 text-sm text-slate-900 shadow-sm backdrop-blur">
                <span className="font-semibold">{selectedImage.title}</span>
                <span className="text-xs text-slate-500">Full-page capture · {selectedImage.width} × {selectedImage.height}</span>
              </figcaption>
            </figure>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
