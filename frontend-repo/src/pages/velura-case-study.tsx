import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Filter,
  LayoutGrid,
  Search,
  ShieldCheck,
  ShoppingCart,
  UserCircle2,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSEO } from "@/hooks/useDocumentTitle";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";

const PROJECT_PATH = "/portfolio/velura";
const SOCIAL_IMAGE = "/portfolio/velura/og.jpg";
const SCREENSHOT_PATH = "/portfolio/velura/screenshots";
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
    alt: "Full-page screenshot of the VELURA homepage with hero banner, categories, and product grid",
    width: 592,
    height: 2000,
  },
  {
    src: `${SCREENSHOT_PATH}/all-products.webp`,
    thumbnail: `${SCREENSHOT_PATH}/all-products.webp`,
    title: "All Products",
    alt: "Screenshot of the VELURA all products page with sidebar category filter and product grid",
    width: 812,
    height: 2000,
  },
  {
    src: `${SCREENSHOT_PATH}/categories.webp`,
    thumbnail: `${SCREENSHOT_PATH}/categories.webp`,
    title: "Shop by Category",
    alt: "Screenshot of the VELURA shop by category page showing all 6 categories",
    width: 1350,
    height: 1122,
  },
  {
    src: `${SCREENSHOT_PATH}/cart.png`,
    thumbnail: `${SCREENSHOT_PATH}/cart.png`,
    title: "Shopping Cart",
    alt: "Screenshot of the VELURA shopping cart with 4 items and order summary",
    width: 1350,
    height: 1218,
  },
  {
    src: `${SCREENSHOT_PATH}/checkout.png`,
    thumbnail: `${SCREENSHOT_PATH}/checkout.png`,
    title: "Checkout",
    alt: "Screenshot of the VELURA checkout page with shipping info, payment method, and order summary",
    width: 1350,
    height: 1310,
  },
  {
    src: `${SCREENSHOT_PATH}/account.png`,
    thumbnail: `${SCREENSHOT_PATH}/account.png`,
    title: "Account Settings",
    alt: "Screenshot of the VELURA account settings page with profile, address, and preferences",
    width: 1350,
    height: 1523,
  },
  {
    src: `${SCREENSHOT_PATH}/sign-in.png`,
    thumbnail: `${SCREENSHOT_PATH}/sign-in.png`,
    title: "Sign In",
    alt: "Screenshot of the VELURA sign in page",
    width: 1350,
    height: 1291,
  },
  {
    src: `${SCREENSHOT_PATH}/create-account.png`,
    thumbnail: `${SCREENSHOT_PATH}/create-account.png`,
    title: "Create Account",
    alt: "Screenshot of the VELURA create account page",
    width: 1350,
    height: 1291,
  },
];

const capabilities = [
  {
    icon: LayoutGrid,
    title: "Curated product catalog",
    copy: "54 products across 6 categories — Accessories, Denim, Footwear, Men, Outerwear, Women — each with images, pricing, discount badges, ratings, and category tags.",
  },
  {
    icon: Filter,
    title: "Category filtering & sorting",
    copy: "Sidebar category filter on the products page and a sort dropdown (Recommended, Price, Rating) let shoppers narrow results without leaving the page.",
  },
  {
    icon: ShoppingCart,
    title: "Full cart & checkout flow",
    copy: "Cart supports quantity adjustments, item removal, and live subtotal updates. Checkout pre-fills shipping details from the user's account and surfaces a saved payment method.",
  },
  {
    icon: UserCircle2,
    title: "Account & profile management",
    copy: "Users can update name, email, date of birth, gender, address, phone, and an 'About you' bio. Changes persist across sessions and pre-populate the checkout form.",
  },
  {
    icon: CreditCard,
    title: "Billing & order history",
    copy: "Tabbed account section covers Settings, Wishlists, Orders history, Change password, and Billing — giving returning customers a single place to manage their relationship with the store.",
  },
  {
    icon: ShieldCheck,
    title: "Auth flows & security",
    copy: "Sign-in and Create Account pages with password visibility toggle, field validation, and clear error states. Session-aware navigation switches between Sign In button and the user avatar dropdown.",
  },
];

const deliverables = [
  "Full-stack e-commerce web application",
  "Homepage with hero, feature bar, category grid, best-sellers, and featured sections",
  "Product listing page with sidebar filter and sort controls",
  "Shop by Category page with 6 category cards",
  "Product detail pages with images, ratings, size selection, and add-to-cart",
  "Shopping cart with quantity controls, item removal, and live totals",
  "Checkout page with pre-filled shipping info and saved payment method",
  "Order placement and confirmation flow",
  "Full account dashboard — settings, wishlists, orders, billing, password",
  "Sign in and create account pages with field validation",
  "Session-aware navbar with cart count badge and user avatar",
  "Responsive layout across mobile, tablet, and desktop",
];

const techStack = [
  "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL",
  "Prisma", "REST API", "JWT Auth", "Responsive UX", "Vite",
];

const keyResults = [
  { label: "Pages designed & built", value: "15+" },
  { label: "Products in catalog", value: "54" },
  { label: "Product categories", value: "6" },
  { label: "Account dashboard tabs", value: "5" },
];

export default function VeluraCaseStudyPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useSEO({
    title: "VELURA Fashion E-Commerce Case Study | We Raise Tech",
    description:
      "How We Raise Tech built VELURA, a full-stack fashion e-commerce platform with product catalog, cart, checkout, and customer account management.",
    path: PROJECT_PATH,
    image: SOCIAL_IMAGE,
    imageWidth: 1200,
    imageHeight: 630,
    imageType: "image/jpeg",
    brandTitle: false,
    keywords: [
      "VELURA e-commerce case study",
      "fashion e-commerce website",
      "full-stack online store",
      "React e-commerce",
      "We Raise Tech portfolio",
    ],
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "VELURA", path: PROJECT_PATH },
      ]),
      caseStudyJsonLd({
        name: "VELURA Fashion E-Commerce Platform",
        description:
          "Full-stack fashion e-commerce web application with product catalog, cart, checkout, and complete account management dashboard.",
        path: PROJECT_PATH,
        image: PROJECT_IMAGE,
        clientName: "VELURA",
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
            <span className="text-foreground">VELURA</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <AnimateOnScroll>
              <div className="mb-5 inline-flex rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                E-Commerce · 2026
              </div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                VELURA{" "}
                <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  premium fashion, end to end.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                A full-stack fashion e-commerce platform with a curated 54-product catalog, category browsing, cart and checkout, and a complete account dashboard — built for a premium shopping experience from first visit to repeat purchase.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <GradientButton
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold"
                >
                  Build a Store Like This <ArrowRight className="h-4 w-4" />
                </GradientButton>
              </div>
            </AnimateOnScroll>

            {/* Hero screenshot — homepage at native width */}
            <AnimateOnScroll>
              <div className="mx-auto max-w-[592px] overflow-hidden rounded-2xl border border-border shadow-2xl">
                <img
                  src={gallery[0].thumbnail}
                  alt="VELURA homepage preview"
                  className="h-[480px] w-full object-cover object-top"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </AnimateOnScroll>
          </div>

          {/* Quick meta */}
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
            {[
              { label: "Client", value: "VELURA" },
              { label: "Industry", value: "Fashion & Apparel" },
              { label: "Category", value: "E-Commerce" },
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
                A fashion store that works like the premium brands it sells.
              </h2>
              <div className="space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  VELURA needed more than a product listing page. The brief was for a complete shopping experience — one that felt premium from the homepage hero through to the account dashboard — without the complexity of a full SaaS platform.
                </p>
                <p>
                  The store spans six fashion categories with 54 products, each carrying ratings, discount badges, pricing, and category metadata. Shoppers can filter by category, sort by relevance or price, manage a cart with live totals, and check out with pre-filled details pulled from their saved profile.
                </p>
                <p>
                  Account management goes beyond a basic profile form: a tabbed dashboard covers personal settings, wishlists, order history, billing, and password management — giving repeat customers the kind of experience that drives retention.
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
              Every layer of the shopping journey
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
                  <ShoppingCart className="mb-3 h-6 w-6 text-primary" aria-hidden="true" />
                  <p className="mb-1 text-sm font-bold text-foreground">Premium fashion e-commerce</p>
                  <p className="text-sm leading-7 text-muted-foreground">
                    VELURA is a one-stop destination for curated fashion — accessories, denim, footwear, outerwear, and more. The platform is designed to convert first-time visitors into repeat buyers through a frictionless shopping experience.
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
                Ready to launch your online store?
              </h2>
              <p className="mb-8 text-base leading-8 text-muted-foreground">
                Whether you're launching a new brand or replacing an existing storefront, we'll design and build an e-commerce experience that converts browsers into buyers.
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
            {selectedImage?.title ?? "Screenshot"} — VELURA
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
