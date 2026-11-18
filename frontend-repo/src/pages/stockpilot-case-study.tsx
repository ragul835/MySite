import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Boxes,
  ScanLine,
  ShieldCheck,
  ShoppingCart,
  Warehouse,
  History,
  BellRing,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSEO } from "@/hooks/useDocumentTitle";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";

const PROJECT_PATH = "/portfolio/stockpilot";
const SOCIAL_IMAGE = "/portfolio/stockpilot/og.jpg";
const SCREENSHOT_PATH = "/portfolio/stockpilot/screenshots";
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
  shot("dashboard.webp", "Dashboard", "StockPilot dashboard with total SKUs, inventory value, low-stock and pending-order KPIs, inventory value by category chart, category mix donut, recent stock movements, and reorder suggestions", 1273, 1095),
  shot("products.webp", "Products", "StockPilot products table with SKU, barcode, category, warehouse, on-hand quantity, reorder level, cost and price, and stock status badges", 1273, 945),
  shot("new-product.webp", "New Product", "StockPilot new product form with SKU, category, name, description, unit cost and price, opening quantity, reorder level, warehouse, and sales channels", 1273, 995),
  shot("purchase-orders.webp", "Purchase Orders", "StockPilot purchase orders list with draft, ordered, and received statuses, totals, expected dates, and receive actions", 1288, 961),
  shot("new-purchase-order.webp", "New Purchase Order", "StockPilot new purchase order dialog with supplier, expected date, notes, line items, and draft or ordered status", 1288, 961),
  shot("warehouses.webp", "Warehouses", "StockPilot warehouses page showing location, product count, units on hand, and stock value per warehouse", 1288, 961),
  shot("new-warehouse.webp", "New Warehouse", "StockPilot new warehouse dialog with name, code, and location fields", 1288, 961),
  shot("suppliers.webp", "Suppliers", "StockPilot suppliers page with contact email, phone, and lead time for each vendor", 1288, 961),
  shot("new-supplier.webp", "New Supplier", "StockPilot new supplier dialog with name, email, phone, and lead time in days", 1288, 961),
  shot("scan-lookup.webp", "Scan / Lookup", "StockPilot barcode and SKU scan lookup page with USB scanner support", 1288, 961),
  shot("stock-history.webp", "Stock History", "StockPilot stock history log of IN, OUT, and ADJUST movements with reason, reference, user, and time", 1288, 961),
  shot("users.webp", "Users", "StockPilot users page with Admin, Manager, and Staff role controls", 1288, 961),
  shot("sign-in.webp", "Sign In", "StockPilot sign-in page with email and password fields", 1288, 961),
];

const capabilities = [
  {
    icon: Boxes,
    title: "Product & SKU catalog",
    copy: "Every product carries a SKU, barcode, category, cost and price, reorder level, warehouse, and sales channels — with search, category filters, a low-stock toggle, and CSV import / export.",
  },
  {
    icon: Warehouse,
    title: "Multi-warehouse stock",
    copy: "Stock is tracked per warehouse, with each location showing its product count, units on hand, and total stock value so teams know exactly where inventory sits.",
  },
  {
    icon: ShoppingCart,
    title: "Purchase orders & suppliers",
    copy: "Create multi-line POs against suppliers, move them from Draft to Ordered, and receive them straight into inventory — with supplier contacts and lead times kept alongside.",
  },
  {
    icon: BellRing,
    title: "Reorder alerts",
    copy: "Products that fall below their reorder level surface automatically as low or out of stock, with reorder suggestions and progress bars on the dashboard and a badge in the sidebar.",
  },
  {
    icon: ScanLine,
    title: "Barcode scan & lookup",
    copy: "A scan field built for USB barcode scanners finds any product instantly by barcode or SKU, so warehouse staff can check and adjust stock without hunting through lists.",
  },
  {
    icon: History,
    title: "Audited stock history",
    copy: "Every IN, OUT, and ADJUST movement is logged with quantity, reason, reference, user, and timestamp — filterable by type and exportable for reconciliation.",
  },
  {
    icon: BarChart3,
    title: "Inventory analytics",
    copy: "A live dashboard rolls up total SKUs, inventory value at cost and retail, low-stock counts, and pending orders, plus value-by-category and category-mix charts.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    copy: "Admin, Manager, and Staff roles control who can manage users, edit products, and approve purchasing — managed inline from the Users page.",
  },
];

const deliverables = [
  "Multi-tenant SaaS inventory and order management web app",
  "Dashboard with stock KPIs, category charts, and reorder suggestions",
  "Product catalog with SKU, barcode, pricing, and reorder levels",
  "CSV import and export for products and stock history",
  "Multi-warehouse stock tracking with per-location value",
  "Purchase order workflow: Draft → Ordered → Received",
  "Supplier directory with contacts and lead times",
  "Low-stock and out-of-stock reorder alerts",
  "Barcode / SKU scan lookup with USB scanner support",
  "Stock movement history with IN / OUT / ADJUST filters",
  "User management with Admin / Manager / Staff roles",
  "Secure sign-in and responsive dark-themed UI",
];

const techStack = [
  "React", "TypeScript", "Tailwind CSS", "Node.js", "Express",
  "PostgreSQL", "Prisma", "REST API", "JWT Auth", "RBAC", "Recharts", "Vite",
];

const keyResults = [
  { label: "Core app screens", value: "13" },
  { label: "Stock movement types", value: "3" },
  { label: "Access roles", value: "3" },
  { label: "PO lifecycle stages", value: "3" },
];

export default function StockPilotCaseStudyPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useSEO({
    title: "StockPilot SaaS Inventory Management Case Study | We Raise Tech",
    description:
      "How We Raise Tech built StockPilot, a SaaS inventory and order management platform with multi-warehouse stock, purchase orders, reorder alerts, and barcode lookup.",
    path: PROJECT_PATH,
    image: SOCIAL_IMAGE,
    imageWidth: 1200,
    imageHeight: 630,
    imageType: "image/jpeg",
    brandTitle: false,
    keywords: [
      "StockPilot SaaS case study",
      "inventory management SaaS",
      "purchase order software",
      "warehouse stock tracking app",
      "We Raise Tech portfolio",
    ],
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "StockPilot", path: PROJECT_PATH },
      ]),
      caseStudyJsonLd({
        name: "StockPilot SaaS Inventory & Order Management Platform",
        description:
          "SaaS inventory management app with multi-warehouse stock, purchase orders, supplier management, reorder alerts, barcode lookup, and stock history.",
        path: PROJECT_PATH,
        image: PROJECT_IMAGE,
        clientName: "StockPilot",
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
            <span className="text-foreground">StockPilot</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <AnimateOnScroll>
              <div className="mb-5 inline-flex rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                SaaS · 2026
              </div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                StockPilot{" "}
                <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  inventory on autopilot.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                A SaaS inventory and order management platform with multi-warehouse stock, purchase orders, supplier management, reorder alerts, and barcode lookup — so teams always know what they have, where it is, and what to reorder.
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
                  alt="StockPilot dashboard preview"
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
              { label: "Product", value: "StockPilot" },
              { label: "Industry", value: "Retail & Wholesale Operations" },
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
                Replacing spreadsheets with a single source of stock truth.
              </h2>
              <div className="space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  StockPilot was built for product businesses that sell online, in retail, and wholesale, and had outgrown tracking stock in spreadsheets. They needed one place to see every SKU, how many units sit in each warehouse, and what that inventory is worth.
                </p>
                <p>
                  The core is a product catalog tied to warehouses and an audited movement log: every unit received from a purchase order, sold through a channel, or corrected in a stocktake is recorded as an IN, OUT, or ADJUST entry with a reason, reference, and the person who made it.
                </p>
                <p>
                  Around it sits the procurement loop — suppliers with lead times, multi-line purchase orders that move from Draft to Ordered to Received, and reorder alerts that flag low and out-of-stock items before they become missed sales — plus barcode lookup for the warehouse floor and role-based access for Admins, Managers, and Staff.
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
              Everything to run inventory end to end
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
                  <History className="mb-3 h-6 w-6 text-primary" aria-hidden="true" />
                  <p className="mb-1 text-sm font-bold text-foreground">Every unit accounted for</p>
                  <p className="text-sm leading-7 text-muted-foreground">
                    Stock levels are never edited directly — every change is written as a movement in the ledger, so on-hand counts, warehouse values, and dashboard totals always reconcile with a full audit trail.
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
                From MVP to multi-tenant platform, we design and build SaaS products with operational workflows, role-based access, and dashboards your users will rely on every day.
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
            {selectedImage?.title ?? "Screenshot"} — StockPilot
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
