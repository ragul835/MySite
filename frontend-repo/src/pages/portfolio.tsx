import { Link, useLocation } from "wouter";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  X,
  Package,
  Users,
  Zap,
  Star,
  Plus,
  KanbanSquare,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useSEO } from "@/hooks/useDocumentTitle";
import { PAGE_SEO, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

/* ─── Types ─── */
interface KeyResult { text: string }

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  badgeClass: string;
  tags: string[];
  description: string;
  keyResults: KeyResult[];
  year: string;
  image: string;
  icon: LucideIcon;
  featured: boolean;
  href?: string;
  liveUrl?: string;
}

/* ─── Data ─── */
const caseStudies: CaseStudy[] = [
  {
    id: "shakthi-yoga-platform",
    title: "Shakthi Yoga — Studio Management Platform",
    client: "Shakthi Yoga",
    industry: "Yoga & Wellness",
    category: "Full-Stack Development",
    badgeClass: "bg-purple-600 text-white",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    description:
      "A full-stack yoga studio platform with a calm marketing site, a student portal for booking classes and passes, and an admin panel for classes, enrollments, payments, and attendance.",
    keyResults: [
      { text: "10+ Admin modules replacing manual spreadsheet workflows" },
      { text: "Role-based access for Admin and Student portals" },
      { text: "End-to-end booking flow from class listing to payment" },
    ],
    year: "2026",
    image: "/portfolio/shakthi-yoga/screenshots/home-thumb.jpg",
    icon: Users,
    featured: true,
    href: "/portfolio/shakthi-yoga",
  },
  {
    id: "samosasheet-food-catalog",
    title: "SamosaSheet — Product & Wholesale Website",
    client: "Karpagam Foods",
    industry: "Food Manufacturing",
    category: "Web Development",
    badgeClass: "bg-blue-600 text-white",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Schema.org", "Responsive UX"],
    description:
      "A responsive product catalog and enquiry website for ready-made samosa sheets, built for household, restaurant, catering, retail, and wholesale buyers.",
    keyResults: [
      { text: "3 Product sizes clearly showcased with comparison details" },
      { text: "Retail + Bulk enquiry flows with WhatsApp & direct contact" },
      { text: "Schema.org structured data for local SEO visibility" },
    ],
    year: "2026",
    image: "/portfolio/samosasheet/screenshots/homepage-thumb.webp",
    icon: Package,
    featured: false,
    href: "/portfolio/samosasheet",
    liveUrl: "https://samosasheet.com/",
  },
  {
    id: "velura-ecommerce",
    title: "VELURA — Fashion E-Commerce Platform",
    client: "VELURA",
    industry: "Fashion & Apparel",
    category: "E-Commerce",
    badgeClass: "bg-emerald-700 text-white",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "REST API"],
    description:
      "A full-stack fashion e-commerce platform with a 54-product catalog, category filtering, cart and checkout, and a full account dashboard — built for a premium shopping experience.",
    keyResults: [
      { text: "54 products across 6 categories with ratings and discount badges" },
      { text: "Full cart → checkout flow with pre-filled account details" },
      { text: "5-tab account dashboard covering settings, orders, and billing" },
    ],
    year: "2026",
    image: "/portfolio/velura/screenshots/home.webp",
    icon: Package,
    featured: false,
    href: "/portfolio/velura",
  },
  {
    id: "aura-architecture-studio",
    title: "AURA Architecture Studio — UI/UX Design",
    client: "AURA Architecture Studio",
    industry: "Architecture & Interior Design",
    category: "UI/UX Design",
    badgeClass: "bg-amber-700 text-white",
    tags: ["React", "TypeScript", "Tailwind CSS", "Dark Theme", "Responsive UX"],
    description:
      "A premium dark-themed multi-page website for an architecture, interior, and exterior design studio in India — with a filterable portfolio, structured service pages, and a project brief intake form.",
    keyResults: [
      { text: "10+ custom-designed pages covering all three disciplines" },
      { text: "Filterable portfolio grid with concept vs completed status badges" },
      { text: "Structured intake form converting visitors into qualified enquiries" },
    ],
    year: "2026",
    image: "/portfolio/aura-architecture/screenshots/home.webp",
    icon: Zap,
    featured: false,
    href: "/portfolio/aura-architecture",
  },
  {
    id: "flowdesk-saas",
    title: "FlowDesk — SaaS Project Management Platform",
    client: "FlowDesk",
    industry: "Productivity & Collaboration",
    category: "SaaS",
    badgeClass: "bg-indigo-600 text-white",
    tags: ["React", "TypeScript", "Node.js", "WebSockets", "PostgreSQL", "Tailwind CSS"],
    description:
      "A multi-tenant SaaS project management app with Kanban boards, real-time sync over WebSockets, Owner / Admin / Member roles, and an analytics dashboard for team workload and progress.",
    keyResults: [
      { text: "Kanban boards with priority, assignee, and due-date tracking" },
      { text: "Real-time updates and live presence across every teammate" },
      { text: "Role-based access with completion-rate and workload analytics" },
    ],
    year: "2026",
    image: "/portfolio/flowdesk/screenshots/dashboard.webp",
    icon: KanbanSquare,
    featured: false,
    href: "/portfolio/flowdesk",
  },
];

const CATEGORIES = ["All", "SaaS", "Web Development", "Full-Stack Development", "E-Commerce", "UI/UX Design"] as const;

const STATS = [
  { icon: Package, value: "50+", label: "Products Delivered" },
  { icon: Users, value: "20+", label: "Founders Served" },
  { icon: Zap, value: "4+", label: "Years in Engineering" },
  { icon: Star, value: "100%", label: "Client Satisfaction" },
];

const FAQ_LEFT = [
  { q: "What types of projects do you showcase in your portfolio?", a: "We showcase a range of SaaS, web development, full-stack, e-commerce, and UI/UX projects across multiple industries including food, yoga, fashion, and fintech." },
  { q: "Can I see case studies similar to my industry?", a: "Yes — use the category filter above to narrow projects. If you don't see your exact niche, reach out and we'll walk you through relevant work over a call." },
  { q: "How do you highlight project results in your portfolio?", a: "Each project shows the real problem, what we built, and measurable results — not just pretty screenshots. We focus on outcomes like load times, booking flows, and conversion impact." },
  { q: "Can I contact your team for a consultation after viewing a case study?", a: "Absolutely. Every project page has a direct CTA to book a free consultation or start a conversation about your project." },
];

const FAQ_RIGHT = [
  { q: "Are your portfolio projects live and functional?", a: "Most are live and linked directly in the project card. Where a site isn't public, we share screenshots and flow walkthroughs on request." },
  { q: "How long does it take to complete a typical project?", a: "Timelines vary — a focused landing site can ship in 2–3 weeks, while a full-stack product like a studio management platform typically takes 8–14 weeks." },
  { q: "Are your services available for startups and established companies?", a: "Yes. We work with early-stage founders building their first product and with established businesses replacing legacy systems or scaling their tech." },
  { q: "How often do you update your portfolio?", a: "We add new projects as they launch. If you want to see recent work not listed here yet, just ask — we're usually a few weeks behind publishing." },
];

/* ─── FAQ Accordion (custom, no radix) ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-gray-900 hover:text-purple-600 transition-colors"
      >
        <span>{q}</span>
        <span className={`shrink-0 w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center transition-transform ${open ? "rotate-45 border-purple-500 text-purple-500" : "text-gray-400"}`}>
          <Plus className="w-3 h-3" />
        </span>
      </button>
      {open && (
        <p className="pb-4 text-sm text-gray-600 leading-relaxed pr-6">{a}</p>
      )}
    </div>
  );
}

/* ─── Featured card ─── */
function FeaturedCard({ cs }: { cs: CaseStudy }) {
  const [, navigate] = useLocation();
  return (
    <div className="mb-14">
      <div
        className={`bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row${cs.href ? " cursor-pointer" : ""}`}
        onClick={() => { if (cs.href) navigate(cs.href); }}
      >
        {/* Image */}
        <div className="relative w-full md:w-[46%] h-56 sm:h-72 md:h-auto md:min-h-[360px] shrink-0 overflow-hidden bg-gray-100">
          <img
            src={cs.image}
            alt={`${cs.title} preview`}
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-7 sm:p-9 flex flex-col">
          <span className={`self-start px-3 py-1 rounded-full text-xs font-bold mb-4 ${cs.badgeClass}`}>
            {cs.category}
          </span>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 leading-snug mb-3">
            {cs.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            {cs.description}
          </p>

          <p className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-2">Key Results:</p>
          <ul className="space-y-1.5 mb-6">
            {cs.keyResults.map((r) => (
              <li key={r.text} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-[0.4rem] w-1.5 h-1.5 rounded-full bg-gray-800 shrink-0" />
                {r.text}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mb-7">
            {cs.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded text-xs text-gray-600 border border-gray-200 bg-gray-50">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-2.5" onClick={(e) => e.stopPropagation()}>
            {cs.href && (
              <Link
                href={cs.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors"
              >
                View Case Study <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {cs.liveUrl && (
              <a
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:border-purple-500 hover:text-purple-600 transition-colors"
              >
                Live Site <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Regular grid card ─── */
function RegularCard({ cs }: { cs: CaseStudy }) {
  const [, navigate] = useLocation();
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full group hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300${cs.href ? " cursor-pointer" : ""}`}
      onClick={() => { if (cs.href) navigate(cs.href); }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100 shrink-0">
        <img
          src={cs.image}
          alt={`${cs.title} preview`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded text-[11px] font-bold ${cs.badgeClass}`}>
          {cs.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-heading font-bold text-gray-900 mb-2 leading-snug">
          {cs.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
          {cs.description}
        </p>

        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-700 mb-2">Key Results:</p>
        <ul className="space-y-1 mb-4 flex-1">
          {cs.keyResults.slice(0, 3).map((r) => (
            <li key={r.text} className="flex items-start gap-1.5 text-xs text-gray-600">
              <span className="mt-[0.3rem] w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
              <span className="line-clamp-2">{r.text}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mb-4 max-h-11 overflow-hidden">
          {cs.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded text-[10px] border border-gray-200 text-gray-500 bg-gray-50">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
          {cs.href ? (
            <Link
              href={cs.href}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:border-purple-500 hover:text-purple-600 transition-colors"
            >
              View Details <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-400 cursor-default">
              Coming Soon
            </span>
          )}
          {cs.liveUrl && (
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors"
            >
              Live Site <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useSEO({
    title: PAGE_SEO.portfolio.title,
    description: PAGE_SEO.portfolio.description,
    path: PAGE_SEO.portfolio.path,
    brandTitle: false,
    keywords: ["software portfolio", "web development case studies", "SaaS case study", "We Raise Tech projects"],
    jsonLd: [
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }]),
      itemListJsonLd(
        "We Raise Tech Client Case Studies",
        caseStudies.map((cs) => ({ name: cs.title, path: cs.href || "/portfolio", description: cs.description }))
      ),
    ],
  });

  const filtered = useMemo(() => {
    let list = activeCategory === "All" ? caseStudies : caseStudies.filter((cs) => cs.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((cs) =>
        cs.title.toLowerCase().includes(q) ||
        cs.description.toLowerCase().includes(q) ||
        cs.tags.some((t) => t.toLowerCase().includes(q)) ||
        cs.industry.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  const hasActiveFilters = activeCategory !== "All" || search.trim().length > 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, search, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = (safeCurrentPage - 1) * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, filtered.length);
  const paginatedProjects = useMemo(
    () => filtered.slice(pageStart, pageEnd),
    [filtered, pageStart, pageEnd]
  );

  const featuredProject = !hasActiveFilters && safeCurrentPage === 1
    ? paginatedProjects.find((cs) => cs.featured) ?? null
    : null;

  const regularList = useMemo(
    () => hasActiveFilters ? paginatedProjects : paginatedProjects.filter((cs) => !cs.featured),
    [paginatedProjects, hasActiveFilters]
  );

  return (
    <div className="w-full flex flex-col bg-white">

      {/* ── Hero / Header ── */}
      <section className="bg-gradient-to-b from-purple-50/70 via-purple-50/30 to-white pt-16 pb-12 md:pt-20 md:pb-14">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4">Our Portfolio</p>
            <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] font-heading font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-4">
              Successful Projects{" "}
              <span className="text-purple-600">&amp; Case Studies</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Explore our portfolio of successful projects that have helped businesses transform and
              grow through innovative technology solutions.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-10 md:gap-16">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="w-5 h-5 text-purple-600 mb-1" aria-hidden="true" />
                <span className="text-3xl sm:text-4xl font-heading font-black text-gray-900 leading-none">{value}</span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-10 md:py-14">
        <Container>
          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search projects, technologies, or categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 transition"
              />
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearch("");
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-purple-400 hover:text-purple-600 transition shrink-0"
              >
                <X className="w-4 h-4" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400 mb-7">Showing {filtered.length} projects</p>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-10" role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`min-h-8 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all cursor-pointer border ${isActive
                    ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-purple-400 hover:text-purple-600"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Featured project carousel */}
          {!hasActiveFilters && featuredProject && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-5">Featured Projects</p>
              <FeaturedCard cs={featuredProject} />
            </div>
          )}

          {/* More Projects grid */}
          {regularList.length > 0 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-1.5">
                  {hasActiveFilters ? "Projects" : "More Projects"}
                </h2>
                <p className="text-sm text-gray-500">Discover more of our successful projects across different industries and technologies.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {regularList.map((cs) => (
                  <RegularCard key={cs.id} cs={cs} />
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-16">No projects match your search.</p>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <span>Showing {pageStart + 1}–{pageEnd} of {filtered.length} results</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={safeCurrentPage === 1}
                  className="px-2.5 py-1.5 rounded border border-gray-200 text-gray-600 transition hover:border-purple-400 hover:text-purple-600 disabled:text-gray-300 disabled:hover:border-gray-200 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-current={safeCurrentPage === page ? "page" : undefined}
                    className={`px-2.5 py-1.5 rounded border font-semibold transition ${safeCurrentPage === page
                      ? "border-purple-600 bg-purple-600 text-white"
                      : "border-gray-200 text-gray-600 hover:border-purple-400 hover:text-purple-600"
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={safeCurrentPage === totalPages}
                  className="px-2.5 py-1.5 rounded border border-gray-200 text-gray-600 transition hover:border-purple-400 hover:text-purple-600 disabled:text-gray-300 disabled:hover:border-gray-200 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <label className="inline-flex items-center gap-1.5 text-gray-500">
                Show
                <select
                  value={pageSize}
                  onChange={(event) => setPageSize(Number(event.target.value))}
                  className="rounded border border-gray-200 bg-white px-2 py-1 text-gray-700 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  aria-label="Projects per page"
                >
                  <option value={6}>6</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
                per page
              </label>
            </div>
          )}
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 md:py-18 border-t border-gray-100">
        <Container>
          <div className="text-center mb-10 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500">
              Common questions about our enterprise software development services and process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 max-w-5xl mx-auto">
            <div>
              {FAQ_LEFT.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
            <div>
              {FAQ_RIGHT.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20 bg-gray-900">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white leading-[1.1] mb-4">
              Your Next Success Story Starts Here
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
              Our case studies showcase what we can do — now let's explore how we can do it for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/contact#contact-form"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors"
              >
                Start Your Success Story Today <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact#contact-form"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-gray-600 text-gray-200 text-sm font-semibold hover:border-purple-500 hover:text-purple-400 transition-colors"
              >
                Schedule Free Consultation <Plus className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-5">
              No commitment required · Free consultation · 24/7 support
            </p>
          </div>
        </Container>
      </section>

    </div>
  );
}
