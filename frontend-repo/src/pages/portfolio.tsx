import { Link } from "wouter";
import { useState, useEffect, useMemo, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Clock,
  Users,
  Cpu,
  ShoppingCart,
  Palette,
  Shield,
  Layers,
  Globe,
  BarChart3,
  TrendingUp,
  Search,
  Zap,
  Settings,
  Smartphone,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiSpringboot,
  SiPython,
  SiFastapi,
  SiNestjs,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiVercel,
  SiGithub,
  SiDocker,
  SiJavascript,
  SiStripe,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useSEO } from "@/hooks/useDocumentTitle";
import { PAGE_SEO, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

/* ─── Types ─── */
interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  result: string;
  resultLabel: string;
  metrics: { label: string; value: string }[];
  duration: string;
  teamSize: string;
  year: string;
  image: string;
  coverGradient: string;
  accentColor: string;
  bgAccent: string;
  icon: LucideIcon;
  featured: boolean;
  href?: string;
  liveUrl?: string;
}

/* ─── Case Studies Data: one unique project per service ─── */
const caseStudies: CaseStudy[] = [
  {
    id: "samosasheet-food-catalog",
    title: "SamosaSheet — Product & Wholesale Website",
    client: "Karpagam Foods",
    industry: "Food Manufacturing",
    category: "Web Development",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Search Architecture", "Schema.org", "Responsive UX"],
    description:
      "A responsive product catalog and enquiry website for ready-made samosa sheets, built for household, restaurant, catering, retail, and wholesale buyers.",
    challenge:
      "Explain multiple sheet sizes, pack details, preparation, delivery areas, and wholesale ordering clearly to buyers with very different needs.",
    solution:
      "We created a product-first journey with strong visuals, comparison details, folding guidance, trust content, and direct WhatsApp, phone, and bulk-order actions.",
    result: "Retail + Bulk",
    resultLabel: "Product Enquiry Website",
    metrics: [
      { label: "Product Sizes", value: "3" },
      { label: "Sheets / Pack", value: "100" },
      { label: "Core Journeys", value: "Retail + Bulk" },
    ],
    duration: "Production launch",
    teamSize: "Design + Build",
    year: "2026",
    image: "/portfolio/samosasheet/screenshots/homepage-thumb.webp",
    coverGradient: "from-orange-600/25 via-amber-500/15 to-green-500/5",
    accentColor: "text-orange-400",
    bgAccent: "bg-orange-500/10",
    icon: ShoppingCart,
    featured: true,
    href: "/portfolio/samosasheet",
    liveUrl: "https://samosasheet.com/",
  },
  {
    id: "apex-corporate-site",
    title: "Apex — Law Firm Website",
    client: "Law Firm",
    industry: "Legal Services",
    category: "Web Development",
    tags: ["Next.js", "TypeScript", "Sanity CMS", "Framer Motion", "Vercel"],
    description:
      "A clean multi-language website for a large law firm — practice pages, lawyer profiles, blog, and CMS-driven content.",
    challenge:
      "Their old WordPress site scored 38 on Lighthouse and made them look outdated next to competitors.",
    solution:
      "We rebuilt the site on Next.js with a CMS for content, better SEO structure, and a 99 Lighthouse score.",
    result: "38 → 99",
    resultLabel: "Lighthouse Score",
    metrics: [
      { label: "Languages", value: "EN / HI / TA" },
      { label: "CMS Powered", value: "Yes" },
      { label: "Delivery Time", value: "6 weeks" },
    ],
    duration: "6 weeks",
    teamSize: "2 engineers",
    year: "2025",
    image: "/portfolio/apex-law.jpg?v=3",
    coverGradient: "from-violet-600/25 via-purple-500/15 to-fuchsia-500/5",
    accentColor: "text-violet-400",
    bgAccent: "bg-violet-500/10",
    icon: Globe,
    featured: true,
  },
  {
    id: "atlas-fullstack-platform",
    title: "Atlas — Operations Web Platform",
    client: "Field Services Company",
    industry: "Field Services",
    category: "Full-Stack Development",
    tags: ["React", "NestJS", "PostgreSQL", "Docker", "AWS", "TypeScript"],
    description:
      "End-to-end web platform for job scheduling, technician mobile web views, invoicing APIs, and admin reporting.",
    challenge:
      "Frontend and backend were built by different vendors. APIs drifted, deployments broke weekly, and data was inconsistent.",
    solution:
      "We rebuilt the full stack as one product — shared types, modular NestJS APIs, React admin, and CI/CD with staging.",
    result: "One stack",
    resultLabel: "Frontend + Backend",
    metrics: [
      { label: "API Modules", value: "18" },
      { label: "Deploy Frequency", value: "Weekly → Daily" },
      { label: "Delivery Time", value: "14 weeks" },
    ],
    duration: "14 weeks",
    teamSize: "4 engineers",
    year: "2025",
    image: "/portfolio/atlas-fullstack.jpg?v=1",
    coverGradient: "from-cyan-600/25 via-teal-500/15 to-blue-500/5",
    accentColor: "text-cyan-400",
    bgAccent: "bg-cyan-500/10",
    icon: Layers,
    featured: true,
  },
  {
    id: "nova-fashion-ecom",
    title: "Nova — Fashion Online Store",
    client: "Apparel Brand",
    industry: "Fashion",
    category: "E-Commerce",
    tags: ["Next.js 14", "TypeScript", "Stripe", "PostgreSQL", "Vercel", "Cloudinary"],
    description:
      "A custom online store for a clothing brand — product pages, checkout, wishlists, and live stock. Built and launched in 7 weeks.",
    challenge:
      "Mobile buyers were dropping out of checkout, and the previous storefront didn’t match the brand quality they wanted.",
    solution:
      "We built a custom Next.js store with Stripe checkout, live inventory, and fast product images so pages load quickly on mobile.",
    result: "Faster",
    resultLabel: "Mobile Checkout",
    metrics: [
      { label: "Cart Drop-off", value: "Lower after launch" },
      { label: "Page Load (LCP)", value: "Under 2s" },
      { label: "Build Time", value: "7 weeks" },
    ],
    duration: "7 weeks",
    teamSize: "3 engineers",
    year: "2025",
    image: "/portfolio/nova-fashion.jpg?v=3",
    coverGradient: "from-pink-600/25 via-rose-500/15 to-orange-500/5",
    accentColor: "text-pink-400",
    bgAccent: "bg-pink-500/10",
    icon: ShoppingCart,
    featured: true,
  },
  {
    id: "nexus-crm-saas",
    title: "Nexus — B2B CRM for Real Estate",
    client: "Real Estate SaaS Startup",
    industry: "Real Estate",
    category: "SaaS Development",
    tags: ["Next.js", "NestJS", "PostgreSQL", "AWS", "Stripe", "Redis", "Docker"],
    description:
      "A multi-tenant CRM for real-estate teams with lead scoring, pipeline tracking, live updates, and subscription billing.",
    challenge:
      "Agents tracked deals across six spreadsheets. Managers had no clear pipeline view, and deals were getting lost.",
    solution:
      "We built a shared multi-tenant CRM with lead scores, live updates, and Stripe billing for product plans.",
    result: "6 → 1",
    resultLabel: "Tools Replaced",
    metrics: [
      { label: "Spreadsheets Replaced", value: "6 → 1" },
      { label: "Agent Setup Time", value: "2 days → 4 hrs" },
      { label: "Billing", value: "Stripe subscriptions" },
    ],
    duration: "10 weeks",
    teamSize: "4 engineers",
    year: "2025",
    image: "/portfolio/nexus-crm.jpg?v=3",
    coverGradient: "from-blue-600/25 via-indigo-500/15 to-violet-500/5",
    accentColor: "text-blue-400",
    bgAccent: "bg-blue-500/10",
    icon: Cpu,
    featured: true,
  },
  {
    id: "beacon-seo-saas",
    title: "Beacon — SEO Growth Project",
    client: "Developer Tools Company",
    industry: "Dev Tools",
    category: "SEO",
    tags: ["Next.js", "Schema.org", "Search Console", "Ahrefs", "Core Web Vitals"],
    description:
      "Technical SEO and content structure work for a developer tools product — crawl fixes, topic clusters, and performance.",
    challenge:
      "They published often for months, but organic traffic had stopped growing due to technical and structural issues.",
    solution:
      "We fixed technical blockers, reorganized content around clear topics, and improved page speed and search markup.",
    result: "Clearer",
    resultLabel: "Site Structure",
    metrics: [
      { label: "Pages Reviewed", value: "120+" },
      { label: "Core Web Vitals", value: "Improved" },
      { label: "Delivery Time", value: "8 weeks" },
    ],
    duration: "8 weeks",
    teamSize: "2 engineers + 1 SEO strategist",
    year: "2025",
    image: "/portfolio/beacon-seo.jpg?v=3",
    coverGradient: "from-yellow-600/25 via-lime-500/15 to-green-500/5",
    accentColor: "text-yellow-400",
    bgAccent: "bg-yellow-500/10",
    icon: Search,
    featured: false,
  },
  {
    id: "pulse-fintech-redesign",
    title: "Pulse — Payments App Redesign",
    client: "Payments Startup",
    industry: "FinTech",
    category: "UI/UX Design",
    tags: ["Figma", "React Native Web", "TypeScript", "Framer Motion", "Lottie"],
    description:
      "Full redesign of a UPI and wallet app — research, Figma screens, simple animations, and clean engineering handoff.",
    challenge:
      "Many users left during KYC signup. Research showed the flow felt hard to trust and too long.",
    solution:
      "We tested with real users, cut onboarding to three clear steps, added live checks, and clarified success states.",
    result: "3 steps",
    resultLabel: "KYC Signup Flow",
    metrics: [
      { label: "Screens Designed", value: "140+" },
      { label: "User Test Rounds", value: "3" },
      { label: "Delivery Time", value: "8 weeks" },
    ],
    duration: "8 weeks",
    teamSize: "2 designers + 2 engineers",
    year: "2024",
    image: "/portfolio/pulse-fintech.jpg?v=3",
    coverGradient: "from-emerald-600/25 via-teal-500/15 to-cyan-500/5",
    accentColor: "text-emerald-400",
    bgAccent: "bg-emerald-500/10",
    icon: Palette,
    featured: true,
  },
  {
    id: "lumen-shopify-store",
    title: "Lumen — Shopify Boutique Store",
    client: "Lifestyle Brand",
    industry: "Retail",
    category: "Shopify Development",
    tags: ["Shopify Plus", "Liquid", "Hydrogen", "Storefront API", "Klaviyo"],
    description:
      "Custom Shopify theme and app integrations for a lifestyle brand — conversion-focused PDPs, subscriptions, and fast mobile theme.",
    challenge:
      "A generic theme looked commodity, app bloat slowed pages, and checkout customizations were limited.",
    solution:
      "We built a custom Shopify theme, slimmed apps, and added private-app logic for bundles and membership pricing.",
    result: "Custom theme",
    resultLabel: "Shopify Plus Store",
    metrics: [
      { label: "Theme", value: "100% custom" },
      { label: "Mobile LCP", value: "Improved" },
      { label: "Delivery Time", value: "8 weeks" },
    ],
    duration: "8 weeks",
    teamSize: "2 engineers + 1 designer",
    year: "2025",
    image: "/portfolio/lumen-shopify.jpg?v=1",
    coverGradient: "from-green-600/25 via-emerald-500/15 to-teal-500/5",
    accentColor: "text-emerald-400",
    bgAccent: "bg-emerald-500/10",
    icon: ShoppingCart,
    featured: false,
  },
  {
    id: "boost-cro-program",
    title: "Boost — Ecommerce CRO Program",
    client: "D2C Supplements Brand",
    industry: "Health & Wellness",
    category: "E-Commerce Optimization",
    tags: ["CRO", "A/B Testing", "Hotjar", "GA4", "Lighthouse", "Next.js"],
    description:
      "90-day conversion program — funnel diagnostics, speed work, A/B tests on PDP and checkout, and revenue reporting.",
    challenge:
      "Paid traffic was expensive while cart abandonment stayed high and mobile conversion lagged desktop by a wide margin.",
    solution:
      "We fixed Core Web Vitals, simplified checkout fields, ran structured experiments on trust and shipping messaging, and shipped winners.",
    result: "+22%",
    resultLabel: "Conversion Rate Lift",
    metrics: [
      { label: "Experiments Run", value: "14" },
      { label: "Mobile Checkout", value: "Faster path" },
      { label: "Program Length", value: "90 days" },
    ],
    duration: "12 weeks",
    teamSize: "1 CRO lead + 2 engineers",
    year: "2025",
    image: "/portfolio/boost-cro.jpg?v=1",
    coverGradient: "from-indigo-600/25 via-blue-500/15 to-lime-500/5",
    accentColor: "text-indigo-400",
    bgAccent: "bg-indigo-500/10",
    icon: TrendingUp,
    featured: false,
  },
  {
    id: "shield-site-care",
    title: "Shield — Website Care Program",
    client: "Multi-Brand Retail Group",
    industry: "Retail",
    category: "Website Maintenance",
    tags: ["Uptime Monitoring", "Cloudflare", "Backups", "Security", "Staging Updates"],
    description:
      "Ongoing maintenance for five brand sites — security patches, backups, uptime alerts, and monthly performance reports.",
    challenge:
      "Sites were updated ad hoc. Plugins drifted out of date, backups were untested, and one store went down during a sale.",
    solution:
      "We set up monitoring, daily off-site backups, staged updates, malware scanning, and a priority support channel.",
    result: "99.9%",
    resultLabel: "Uptime Maintained",
    metrics: [
      { label: "Sites Covered", value: "5" },
      { label: "Critical Incidents", value: "Same-day response" },
      { label: "Plan", value: "Ongoing retainer" },
    ],
    duration: "Ongoing retainer",
    teamSize: "2 engineers",
    year: "2025",
    image: "/portfolio/shield-site-care.jpg?v=1",
    coverGradient: "from-slate-600/25 via-zinc-500/15 to-neutral-500/5",
    accentColor: "text-slate-300",
    bgAccent: "bg-slate-500/10",
    icon: Settings,
    featured: false,
  },
  {
    id: "voyage-travel-app",
    title: "Voyage — Travel Booking App",
    client: "Boutique Travel Startup",
    industry: "Travel",
    category: "Mobile App Development",
    tags: ["React Native", "TypeScript", "Firebase", "Stripe", "Maps", "Push"],
    description:
      "iOS and Android app for itinerary booking, live trip updates, and in-app chat with travel concierges.",
    challenge:
      "Customers abandoned a slow mobile web booking flow. Support lived in WhatsApp with no history.",
    solution:
      "We shipped a React Native app with secure checkout, offline trip details, push alerts, and a shared support inbox.",
    result: "iOS + Android",
    resultLabel: "One Codebase",
    metrics: [
      { label: "Platforms", value: "iOS & Android" },
      { label: "Checkout", value: "In-app Stripe" },
      { label: "Delivery Time", value: "12 weeks" },
    ],
    duration: "12 weeks",
    teamSize: "3 engineers + 1 designer",
    year: "2025",
    image: "/portfolio/voyage-travel-app.jpg?v=1",
    coverGradient: "from-violet-600/25 via-purple-500/15 to-indigo-500/5",
    accentColor: "text-violet-400",
    bgAccent: "bg-violet-500/10",
    icon: Smartphone,
    featured: true,
  },
  {
    id: "ledger-ops-suite",
    title: "Ledger — Operations Suite",
    client: "Regional Distribution Company",
    industry: "Logistics & Wholesale",
    category: "Custom Software",
    tags: ["Node.js", "PostgreSQL", "React", "Docker", "AWS", "REST APIs"],
    description:
      "Custom internal software for inventory, purchase orders, vendor approvals, and finance handoff — replacing three legacy tools.",
    challenge:
      "Staff re-entered order data across spreadsheet, email, and an outdated desktop app. Approvals took days.",
    solution:
      "We built a role-based operations suite with automated purchase workflows, inventory sync, audit logs, and accounting APIs.",
    result: "3 tools → 1",
    resultLabel: "Unified Ops System",
    metrics: [
      { label: "Manual Re-entry", value: "Removed" },
      { label: "Approval Time", value: "Days → Hours" },
      { label: "Delivery Time", value: "16 weeks" },
    ],
    duration: "16 weeks",
    teamSize: "4 engineers",
    year: "2024",
    image: "/portfolio/ledger-ops-suite.jpg?v=1",
    coverGradient: "from-amber-600/25 via-orange-500/15 to-yellow-500/5",
    accentColor: "text-amber-400",
    bgAccent: "bg-amber-500/10",
    icon: Terminal,
    featured: true,
  },
];

const CATEGORIES = [
  "All",
  "Web Development",
  "Full-Stack Development",
  "E-Commerce",
  "SaaS Development",
  "SEO",
  "UI/UX Design",
  "Shopify Development",
  "E-Commerce Optimization",
  "Website Maintenance",
  "Mobile App Development",
  "Custom Software",
] as const;

const techCategories = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React.js", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "Framer Motion", Icon: SiFramer },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "NestJS", Icon: SiNestjs },
      { name: "Java", Icon: FaJava },
      { name: "Spring Boot", Icon: SiSpringboot },
      { name: "Python", Icon: SiPython },
      { name: "FastAPI", Icon: SiFastapi },
    ],
  },
  {
    id: "database",
    label: "Database",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MySQL", Icon: SiMysql },
      { name: "MongoDB", Icon: SiMongodb },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    items: [
      { name: "AWS", Icon: FaAws },
      { name: "Vercel", Icon: SiVercel },
      { name: "Docker", Icon: SiDocker },
      { name: "GitHub", Icon: SiGithub },
      { name: "Stripe", Icon: SiStripe },
    ],
  },
];

/* ─── Hero ─── */
function HeroSection() {
  const scrollToCaseStudies = () => {
    document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pt-28">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-5%,hsl(var(--primary)/0.18),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Orbs */}
      <div className="absolute top-1/4 -left-40 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-[140px] pointer-events-none -z-10 animate-orb-drift" />
      <div className="absolute bottom-1/4 -right-40 w-[28rem] h-[28rem] rounded-full bg-secondary/10 blur-[140px] pointer-events-none -z-10 animate-orb-drift delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-blue-500/5 blur-[180px] pointer-events-none -z-10" />

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Breadcrumb */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/30 text-xs text-muted-foreground mb-8 backdrop-blur-sm">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
          <span className="text-foreground font-medium">Portfolio</span>
        </div>

        {/* Badge */}
        <div className="mb-8 relative inline-flex group cursor-default animate-fade-in">
          <div className="absolute transition-all duration-1000 opacity-40 -inset-px bg-gradient-to-r from-primary via-blue-400 to-secondary rounded-full blur-lg group-hover:opacity-70" />
          <div className="relative inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold text-foreground bg-card border border-border/50 rounded-full uppercase tracking-widest backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" aria-hidden="true" />
            Portfolio · Selected Case Studies
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-heading font-extrabold tracking-tighter leading-[1.04] mb-6 max-w-4xl">
          <span className="text-foreground">From First Call</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent animate-gradient">
            to Live Product.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-4 mx-auto">
          We've built CRMs, stores, SaaS tools, and design systems for founders who needed more than a vendor —
          they needed a team that cares about the outcome as much as they do.
        </p>

        {/* Sub-note */}
        <p className="text-sm text-muted-foreground/60 mb-10 italic">
          Each project below shows the real problem, what we built, and what changed after launch.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <GradientButton href="/contact#contact-form" className="w-full sm:w-auto px-9 py-4 text-sm font-semibold rounded-xl">
            Let's Build Together <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </GradientButton>
          <button
            type="button"
            onClick={scrollToCaseStudies}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 text-sm font-semibold rounded-xl border border-border/60 bg-card/40 hover:bg-card/80 hover:border-primary/30 text-foreground transition-all cursor-pointer"
          >
            See the Work <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </section>
  );
}

/* ─── Shared metric + footer blocks ─── */
function MetricRow({
  metrics,
  accentColor,
  compact = false,
}: {
  metrics: { label: string; value: string }[];
  accentColor: string;
  compact?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {metrics.map((m) => (
        <div
          key={m.label}
          className={`rounded-xl bg-muted/40 border border-border/40 text-center flex flex-col items-center justify-center ${
            compact ? "p-2.5 min-h-[4.25rem]" : "p-3 min-h-[4.75rem]"
          }`}
        >
          <div
            className={`font-heading font-black ${accentColor} mb-0.5 leading-tight break-words ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            {m.value}
          </div>
          <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground leading-tight line-clamp-2">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function CardFooter({ cs }: { cs: CaseStudy }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 mt-auto pt-4 border-t border-border/30 text-[10px] text-muted-foreground">
      <span className="inline-flex items-center gap-1 shrink-0">
        <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
        <span>{cs.duration}</span>
      </span>
      <span className="inline-flex items-center gap-1 min-w-0">
        <Users className="w-3 h-3 shrink-0" aria-hidden="true" />
        <span className="truncate">{cs.teamSize}</span>
      </span>
      <span className="ml-auto font-semibold text-foreground/40 shrink-0 tabular-nums">{cs.year}</span>
    </div>
  );
}

function CaseStudyActions({ cs }: { cs: CaseStudy }) {
  if (!cs.href && !cs.liveUrl) return null;
  return (
    <div className={`mb-4 grid gap-2 ${cs.href && cs.liveUrl ? "sm:grid-cols-2" : "grid-cols-1"}`}>
      {cs.href && (
        <Link
          href={cs.href}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-primary/25 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/50 hover:bg-primary/10"
          aria-label={`View the full ${cs.title} case study`}
        >
          View case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
      {cs.liveUrl && (
        <a
          href={cs.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          aria-label={`View the live ${cs.title} website in a new tab`}
        >
          View live site <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

function FeaturedCard({ cs }: { cs: CaseStudy }) {
  const Icon = cs.icon;
  return (
    <div
      data-testid={`card-cs-${cs.id}`}
      className="premium-card overflow-hidden group flex flex-col md:flex-row h-full min-h-0"
    >
      {/* Image panel */}
      <div className="relative w-full md:w-[42%] md:min-w-[280px] h-52 sm:h-60 md:h-auto md:min-h-[320px] shrink-0 overflow-hidden">
        <img
          src={cs.image}
          alt={`${cs.title} project preview`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
        <div className="absolute top-3 left-3 right-3 z-10 flex items-start justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/50 text-white border border-white/20">
            {cs.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/50 text-white/90 border border-white/20">
            {cs.industry}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6">
          <div className="text-4xl sm:text-5xl font-heading font-black text-white drop-shadow-md leading-none mb-1">
            {cs.result}
          </div>
          <div className="text-xs sm:text-sm font-semibold text-white/85 uppercase tracking-widest">
            {cs.resultLabel}
          </div>
        </div>
      </div>

      {/* Content panel */}
      <div className="flex-1 min-w-0 p-5 sm:p-6 md:p-7 flex flex-col">
        <div className="flex items-center gap-2 mb-1.5 min-w-0">
          <Icon className={`w-4 h-4 shrink-0 ${cs.accentColor}`} aria-hidden="true" />
          <span className="text-xs text-muted-foreground font-medium truncate">{cs.client}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mb-2 leading-snug">
          {cs.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {cs.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          <div className="rounded-xl bg-muted/40 border border-border/40 p-3 h-full">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Challenge
            </div>
            <p className="text-xs text-foreground leading-relaxed line-clamp-4">{cs.challenge}</p>
          </div>
          <div className="rounded-xl bg-muted/40 border border-border/40 p-3 h-full">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Solution
            </div>
            <p className="text-xs text-foreground leading-relaxed line-clamp-4">{cs.solution}</p>
          </div>
        </div>

        <div className="mb-4">
          <MetricRow metrics={cs.metrics} accentColor={cs.accentColor} />
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {cs.tags.slice(0, 8).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-card border border-border/60 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <CaseStudyActions cs={cs} />
        <CardFooter cs={cs} />
      </div>
    </div>
  );
}

function RegularCard({ cs }: { cs: CaseStudy }) {
  const Icon = cs.icon;
  return (
    <div
      data-testid={`card-cs-${cs.id}`}
      className="premium-card overflow-hidden group flex flex-col h-full"
    >
      <div className="relative h-44 sm:h-48 shrink-0 overflow-hidden">
        <img
          src={cs.image}
          alt={`${cs.title} project preview`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
        <div className="absolute top-3 left-3 right-3 z-10 flex items-start justify-between gap-2">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/50 text-white border border-white/20">
            {cs.category}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/50 text-white/90 border border-white/20 max-w-[45%] truncate">
            {cs.industry}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
          <div className="text-2xl sm:text-3xl font-heading font-black text-white drop-shadow-md leading-none">
            {cs.result}
          </div>
          <div className="text-[10px] font-semibold text-white/85 uppercase tracking-widest mt-1">
            {cs.resultLabel}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-2 mb-1.5 min-w-0">
          <Icon className={`w-4 h-4 shrink-0 ${cs.accentColor}`} aria-hidden="true" />
          <span className="text-xs text-muted-foreground truncate">{cs.client}</span>
        </div>
        <h3 className="text-base font-heading font-bold text-foreground mb-2 leading-snug line-clamp-2 min-h-[2.5rem]">
          {cs.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
          {cs.description}
        </p>

        <div className="mb-4">
          <MetricRow metrics={cs.metrics} accentColor={cs.accentColor} compact />
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4 max-h-[3.25rem] overflow-hidden">
          {cs.tags.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-card border border-border/60 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <CaseStudyActions cs={cs} />
        <CardFooter cs={cs} />
      </div>
    </div>
  );
}

/* ─── Case Studies Filter + Grid ─── */
function CaseStudiesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? caseStudies
        : caseStudies.filter((cs) => cs.category === activeCategory),
    [activeCategory]
  );

  const featured = useMemo(
    () => filtered.filter((cs) => cs.featured && activeCategory === "All"),
    [filtered, activeCategory]
  );
  const regular = useMemo(
    () =>
      activeCategory === "All"
        ? filtered.filter((cs) => !cs.featured)
        : filtered,
    [filtered, activeCategory]
  );

  return (
    <section id="case-studies" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <Container>
        <AnimateOnScroll>
          <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Projects
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground mb-3">
              Selected Client Work
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              A look at what we built, the problem we solved, and the results after launch.
            </p>
          </div>
        </AnimateOnScroll>

        <div
          className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-pressed={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-sm shadow-primary/20"
                    : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured — full width, stacked cleanly */}
        {featured.length > 0 && (
          <div className="flex flex-col gap-5 mb-5">
            <AnimatePresence mode="popLayout">
              {featured.map((cs) => (
                <motion.div
                  key={cs.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  <FeaturedCard cs={cs} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Regular grid — equal columns */}
        {regular.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
            <AnimatePresence mode="popLayout">
              {regular.map((cs) => (
                <motion.div
                  key={cs.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="h-full min-h-0"
                >
                  <RegularCard cs={cs} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">
            No projects in this category yet.
          </p>
        )}
      </Container>
    </section>
  );
}

/* ─── Technologies ─── */
function TechnologiesSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <AnimateOnScroll>
          <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Tools We Use
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground mb-3">
              Tech We Build With
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Proven tools we use for speed, reliability, and easy maintenance.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-8 md:mb-10 p-0">
              {techCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="px-4 sm:px-5 py-2 rounded-full border border-border/50 bg-card/30 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary transition-all text-sm font-medium"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {techCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="mt-0">
                <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
                  {cat.items.map((tech) => {
                    const TechIcon = tech.Icon as ComponentType<{ className?: string }>;
                    return (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md hover:border-primary/40 hover:bg-primary/5 transition-all group cursor-default"
                      >
                        <TechIcon
                          className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-foreground whitespace-nowrap">
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <Container className="relative z-10 text-center">
        <AnimateOnScroll>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-7">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" /> Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground mb-5 max-w-3xl mx-auto leading-[1.1]">
            Have a Project{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              In Mind?
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-9 max-w-xl mx-auto leading-relaxed">
            Tell us what you need. We usually reply within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <GradientButton href="/contact#contact-form" className="w-full sm:w-auto px-10 py-4 text-base font-semibold">
              Start Your Project <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </GradientButton>
            <a
              href="mailto:contact@weraisetech.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors py-2"
            >
              or email contact@weraisetech.com →
            </a>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Page ─── */
export default function PortfolioPage() {
  useSEO({
    title: PAGE_SEO.portfolio.title,
    description: PAGE_SEO.portfolio.description,
    path: PAGE_SEO.portfolio.path,
    brandTitle: false,
    keywords: [
      "software portfolio",
      "web development case studies",
      "mobile app portfolio",
      "SaaS case study",
      "SamosaSheet website case study",
      "We Raise Tech projects",
    ],
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
      ]),
      itemListJsonLd(
        "We Raise Tech Client Case Studies",
        caseStudies.map((cs) => ({
          name: cs.title,
          path: cs.href || "/portfolio",
          description: cs.description,
        }))
      ),
    ],
  });

  return (
    <div className="w-full flex flex-col">
      <HeroSection />

      <CaseStudiesSection />
      <TechnologiesSection />
      <CTASection />
    </div>
  );
}
