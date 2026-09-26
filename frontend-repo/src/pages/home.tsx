import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import {
  Code2, ShoppingCart, Layers, Palette, Search, ShoppingBag,
  ArrowRight, CheckCircle, Shield, Cpu, Zap, Plus, Minus,
  Smartphone, Target, TrendingUp, Globe, Users, Star,
  ArrowUpRight, Sparkles, MousePointer2, BarChart3, Settings, Terminal
} from "lucide-react";
import {
  SiDocker,
  SiFastapi,
  SiFramer,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import type { IconType } from "react-icons";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useSEO } from "@/hooks/useDocumentTitle";
import {
  PAGE_SEO,
  faqJsonLd,
} from "@/lib/seo";

/* ─── Data ─── */
const services = [
  { icon: Code2, slug: "web-development", title: "Full-Stack Web Development", description: "Complete frontend and backend web solutions engineered for performance, scalability, SEO, and business growth.", tag: "Popular" },
  { icon: ShoppingCart, slug: "e-commerce", title: "E-Commerce Development", description: "Custom online stores, marketplaces, integrations, and conversion-focused commerce platforms built to scale.", tag: "High ROI" },
  { icon: ShoppingBag, slug: "shopify", title: "Shopify Development", description: "Fast, conversion-focused Shopify stores with custom themes, apps, migrations, and Shopify Plus support.", tag: "Popular" },
  { icon: Zap, slug: "saas", title: "SaaS Platforms", description: "Subscription-based software platforms designed to support long-term growth and business operations.", tag: "Hot" },
  { icon: Palette, slug: "ui-ux", title: "UI/UX Design", description: "User-focused digital experiences that improve engagement, usability, and conversions.", tag: "" },
  { icon: Search, slug: "seo", title: "SEO Services", description: "Technical and on-page optimization strategies that improve visibility and search rankings.", tag: "" },
  { icon: Settings, slug: "maintenance-support", title: "Website Maintenance & Support", description: "Keep your website secure, fast, and up-to-date with proactive monitoring and expert support.", tag: "" },
  { icon: Smartphone, slug: "mobile-app-development", title: "Mobile App Development", description: "High-performance iOS and Android applications built for engagement and scale.", tag: "New" },
  { icon: Terminal, slug: "custom-software-development", title: "Custom Software Development", description: "Tailor-made software solutions that automate workflows and solve complex business problems.", tag: "" },
];

type Technology = {
  name: string;
  Icon: IconType;
  color?: string;
};

type TechnologyCategory = {
  id: string;
  label: string;
  items: Technology[];
};

const techCategories: TechnologyCategory[] = [
  {
    id: "frontend", label: "Frontend",
    items: [
      { name: "React.js", Icon: SiReact, color: "#149ECA" },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#C9A700" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", Icon: SiFramer, color: "#0055FF" },
    ],
  },
  {
    id: "backend", label: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
      { name: "NestJS", Icon: SiNestjs, color: "#E0234E" },
      { name: "Java", Icon: FaJava, color: "#E76F00" },
      { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
    ],
  },
  {
    id: "database", label: "Database",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    id: "cloud", label: "Cloud & DevOps",
    items: [
      { name: "AWS", Icon: FaAws, color: "#FF9900" },
      { name: "Vercel", Icon: SiVercel },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "GitHub", Icon: SiGithub },
    ],
  },
];



const faqData = [
  { question: "How much does a website cost?", answer: "Project pricing depends on requirements, features, and complexity. We provide transparent quotes after understanding your needs." },
  { question: "How long does development take?", answer: "Most projects are completed within 2–8 weeks depending on scope and complexity." },
  { question: "Do you provide support after launch?", answer: "Yes. We provide maintenance, updates, and technical support post-launch." },
  { question: "Can you redesign an existing website?", answer: "Absolutely. We modernize websites, improve performance, and enhance user experience." },
  { question: "What technologies do you use?", answer: "We specialize in React, Next.js, Node.js, TypeScript, and scalable cloud deployments for top-tier performance." },
  { question: "Will I own the source code?", answer: "Yes. Once fully paid, you retain 100% ownership of all source code and intellectual property." },
];

const allTechnologies = techCategories.flatMap((category) => category.items);

function TechnologyBadge({ technology }: { technology: Technology }) {
  const { name, Icon, color } = technology;

  return (
    <div className="group flex h-11 shrink-0 items-center gap-2.5 rounded-xl border border-border/60 bg-card/80 px-4 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary/35 hover:bg-card">
      <Icon
        className="h-[1.125rem] w-[1.125rem] shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={color ? { color } : undefined}
        aria-hidden="true"
      />
      <span className="whitespace-nowrap">{name}</span>
    </div>
  );
}

/* ─── Marquee ─── */
function TechMarquee() {
  return (
    <section
      className="relative overflow-hidden border-y border-border/40 bg-card/10 py-8"
      aria-label="Technologies and tools we work with"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />
      <div className="flex w-max will-change-transform motion-safe:animate-[marquee_36s_linear_infinite] motion-reduce:transform-none hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex gap-4 pr-4"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {allTechnologies.map((technology) => (
              <TechnologyBadge key={`${copy}-${technology.name}`} technology={technology} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const deliverySteps = [
  { label: "Discover", detail: "Goals & scope", Icon: Search },
  { label: "Design", detail: "UX & architecture", Icon: Palette },
  { label: "Build", detail: "Code & quality", Icon: Code2 },
  { label: "Launch", detail: "Release & grow", Icon: Globe },
];

function DeliveryWorkspaceCard() {
  return (
    <div className="relative mx-auto w-full max-w-[32rem] lg:ml-auto">
      <div className="delivery-workspace-glow absolute -inset-6 rounded-[2.75rem] bg-gradient-to-br from-violet-500/25 via-blue-500/10 to-cyan-400/20 blur-3xl" />

      <div className="delivery-workspace-shell relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-[0_32px_90px_rgba(15,23,42,0.38)]">
        <div className="delivery-workspace-aurora pointer-events-none absolute -inset-[55%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0deg,rgba(124,58,237,0.52)_70deg,transparent_135deg,rgba(34,211,238,0.35)_230deg,transparent_305deg)] opacity-30" />
        <div className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-violet-500/15 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-28 -right-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-[80px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="relative rounded-[2rem] bg-gradient-to-br from-slate-900/95 via-slate-950/90 to-indigo-950/90 p-5 backdrop-blur-xl sm:p-6">
          <div className="delivery-workspace-scanline pointer-events-none absolute inset-x-8 top-0 h-px origin-center bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" aria-hidden="true" />
          <div className="flex flex-col items-start justify-between gap-3 min-[390px]:flex-row min-[390px]:gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="delivery-workspace-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300 shadow-[0_8px_22px_rgba(124,58,237,0.18)] ring-1 ring-inset ring-violet-300/15">
                <Layers className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="delivery-workspace-label text-[9px] font-bold uppercase tracking-[0.22em] text-violet-700">Delivery workspace</p>
                <h2 className="delivery-workspace-title mt-1 text-base font-bold leading-snug text-white sm:text-lg">Your product, always in view</h2>
              </div>
            </div>
            <div className="delivery-workspace-status flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1.5 text-[9px] font-bold text-emerald-300 ring-1 ring-inset ring-emerald-300/20">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" aria-hidden="true" />
              On track
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl bg-white/[0.055] shadow-[0_14px_36px_rgba(0,0,0,0.14)] ring-1 ring-inset ring-white/[0.07]">
            <div className="delivery-roadmap-header flex items-center justify-between gap-3 bg-white/[0.035] px-4 py-3">
              <div>
                <p className="delivery-roadmap-label text-[9px] font-bold uppercase tracking-[0.18em] text-violet-700">Product roadmap</p>
                <p className="delivery-roadmap-subtitle mt-0.5 text-xs font-semibold text-slate-300">A clear path from idea to launch</p>
              </div>
              <span className="delivery-build-phase flex shrink-0 items-center gap-1.5 rounded-full bg-violet-400/10 px-2.5 py-1 text-[9px] font-bold text-violet-200 ring-1 ring-inset ring-violet-300/15">
                <Code2 className="h-3 w-3" aria-hidden="true" />
                Build phase
              </span>
            </div>

            <div className="relative">
              <div className="absolute left-[12.5%] right-[12.5%] top-[2rem] hidden h-px bg-white/10 min-[440px]:block" aria-hidden="true">
                <span className="delivery-roadmap-progress block h-full w-full origin-left bg-gradient-to-r from-emerald-400 via-violet-400 to-cyan-300" />
              </div>
              <ol className="relative grid grid-cols-2 gap-x-3 gap-y-5 px-4 py-4 min-[440px]:grid-cols-4 min-[440px]:gap-2">
                {deliverySteps.map((step, index) => {
                  const Icon = step.Icon;
                  const animationDelay = `${0.2 + index * 1.4}s`;

                  return (
                    <li
                      key={step.label}
                      className="delivery-roadmap-step relative min-w-0"
                      style={{ animationDelay }}
                    >
                      <div className="flex items-center justify-between min-[440px]:justify-start">
                        <span
                          className="delivery-roadmap-icon relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 shadow-sm"
                          style={{ animationDelay }}
                        >
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span className="text-[9px] font-bold tabular-nums text-slate-500 min-[440px]:hidden">0{index + 1}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <p className="text-xs font-bold text-white">{step.label}</p>
                        <CheckCircle
                          className="delivery-roadmap-check h-3 w-3 shrink-0 text-emerald-300"
                          style={{ animationDelay }}
                          aria-label={`${step.label} complete`}
                        />
                      </div>
                      <p className="mt-0.5 text-[9px] font-medium leading-4 text-slate-400 sm:text-[10px]">{step.detail}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          <div className="delivery-quality-panel mt-3 rounded-xl bg-black/20 px-4 py-3.5 shadow-[0_14px_30px_rgba(0,0,0,0.12)] ring-1 ring-inset ring-white/[0.06]">
            <div className="flex flex-col gap-1 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
              <span className="delivery-quality-title text-[10px] font-semibold text-slate-200">Quality built into every release</span>
              <span className="delivery-quality-meta text-[9px] font-medium text-slate-400">Performance · SEO · Security</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="delivery-quality-progress relative h-full w-full origin-left overflow-hidden rounded-full bg-gradient-to-r from-teal-400 via-violet-400 to-fuchsia-400">
                <span className="delivery-quality-shine absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-2">
            {["Weekly demos", "Clean handoff", "Launch support"].map((item, index) => (
              <div
                key={item}
                className="delivery-assurance-item flex min-h-7 items-center gap-1.5 rounded-full bg-white/[0.055] px-2.5 text-[9px] font-semibold text-slate-300 shadow-[0_6px_18px_rgba(0,0,0,0.1)] ring-1 ring-inset ring-white/[0.06]"
                style={{ animationDelay: `${0.95 + index * 0.1}s` }}
              >
                <CheckCircle className="h-3 w-3 shrink-0 text-cyan-300" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden py-10 sm:py-14 lg:min-h-[calc(100svh-5rem)] lg:py-14">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,hsl(var(--primary)/0.15),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>
      <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px] animate-orb-drift" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-secondary/10 blur-[120px] animate-orb-drift delay-700" />

      <Container className="relative z-10 grid w-full items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)] lg:gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(27rem,0.92fr)] xl:gap-16">
        <div className="text-center lg:text-left">
          <div className="relative mb-7 inline-flex animate-fade-in cursor-default group">
            <div className="absolute -inset-px rounded-full bg-gradient-to-r from-primary via-blue-400 to-secondary opacity-30 blur-md transition-all duration-1000 group-hover:-inset-1 group-hover:opacity-60" />
            <div className="relative inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur-xl sm:gap-2 sm:px-5 sm:text-xs sm:tracking-widest">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Web &amp; Custom Software Development
            </div>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-[1.04] tracking-tighter sm:text-6xl lg:text-[3.5rem] xl:text-[4.65rem]">
            <span className="text-foreground">Digital Products That Help</span>{" "}
            <span className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent animate-gradient">
              Your Business Grow
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0 lg:max-w-xl">
            From high-converting websites to custom software, we help startups and growing businesses attract customers, automate operations, and scale with confidence.
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center lg:justify-start">
            <GradientButton href="/contact#contact-form" className="w-full max-w-xs px-7 py-3.5 text-sm font-semibold sm:w-auto">
              Start Your Project <ArrowRight className="ml-2 inline h-4 w-4" />
            </GradientButton>
            <Link href="/portfolio" className="w-full max-w-xs sm:w-auto">
              <span className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border/60 bg-card/40 px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-card/80 sm:w-auto">
                View Our Work <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
            {["Scalable Architecture", "Security & Performance", "Long-Term Support"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/40 px-3 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur-sm">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <DeliveryWorkspaceCard />
      </Container>
    </section>
  );
}



/* ─── Services ─── */
function ServicesSection() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <Container>
        <AnimateOnScroll>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">What We Do</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground max-w-xl">
                Services Built for Modern Businesses
              </h2>
            </div>
            <Link href="/services">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer whitespace-nowrap">
                All Services <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <AnimatedItem key={service.title}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label={`Learn more about ${service.title}`}
                  >
                  <div className="premium-card p-7 group cursor-pointer overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {service.tag && (
                      <span className="absolute top-5 right-5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/20">
                        {service.tag}
                      </span>
                    )}

                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-heading font-bold text-foreground mb-2.5">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>

                    <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-primary transition-all duration-300 group-hover:gap-3">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  </Link>
                </AnimatedItem>
              );
            })}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Why Us ─── */
const whyItems = [
  { icon: Target, title: "Business-Focused", description: "Every decision is tied to your goals and measurable outcomes." },
  { icon: Shield, title: "Transparent Process", description: "Clear timelines, honest updates, full project visibility." },
  { icon: Cpu, title: "Modern Stack", description: "Built with proven, industry-standard frameworks and tools." },
  { icon: Zap, title: "Performance First", description: "Fast-loading, SEO-ready, Core Web Vitals optimized." },
  { icon: Layers, title: "Scalable Architecture", description: "Engineered to grow with your business for years." },
  { icon: CheckCircle, title: "Long-Term Support", description: "We stay after launch with maintenance and improvements." },
];

function WhyChooseSection() {
  return (
    <section className="py-20 md:py-32 relative bg-card/5 border-y border-border/30">
      <Container>
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Why We Raise Tech</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground">
              The Partner That Delivers
            </h2>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedItem key={i}>
                  <div className="flex gap-4 p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm h-full group hover:border-primary/30 transition-colors">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-heading font-bold text-foreground mb-1.5">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </AnimatedItem>
              );
            })}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Process ─── */
const processSteps = [
  { num: "01", title: "Discovery", desc: "Deep-dive into your goals, constraints, and requirements." },
  { num: "02", title: "Planning", desc: "Architecture, roadmap, and feature spec you sign off on." },
  { num: "03", title: "Design", desc: "Modern UI/UX wireframes and design system approval." },
  { num: "04", title: "Development", desc: "Iterative builds with weekly progress demos." },
  { num: "05", title: "Testing", desc: "Rigorous QA across all browsers and devices." },
  { num: "06", title: "Launch", desc: "Zero-downtime deployment with monitoring setup." },
  { num: "07", title: "Support", desc: "Ongoing maintenance, updates, and growth support." },
];

function ProcessSection() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">How We Work</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground">
              Our Development Process
            </h2>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <AnimatedItem key={step.num}>
                <div className="premium-card p-6 h-full group-hover:border-primary/40 group-hover:shadow-[0_16px_40px_hsl(var(--primary)/0.08)]">
                  <div className="text-xs font-bold text-primary mb-4 tracking-widest">
                    {step.num}
                  </div>
                  <h3 className="text-base font-heading font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-border" />
                    </div>
                  )}
                </div>
              </AnimatedItem>
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Tech Stack ─── */
function TechStackSection() {
  const [activeTech, setActiveTech] = useState(techCategories[0].id);
  const activeCategory = techCategories.find((category) => category.id === activeTech) ?? techCategories[0];

  return (
    <section className="py-20 md:py-32 bg-card/5 border-y border-border/30">
      <Container>
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Our Stack</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground">
              Industry-Standard Technologies
            </h2>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="w-full">
            <div role="tablist" aria-label="Technology categories" className="flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-10 p-0">
              {techCategories.map((cat) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTech === cat.id}
                  key={cat.id}
                  onClick={() => setActiveTech(cat.id)}
                  className={`min-h-11 rounded-full border px-5 py-2 text-sm font-medium transition-all ${activeTech === cat.id ? "bg-primary text-white border-primary" : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/40"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div role="tabpanel" className="flex flex-wrap justify-center gap-3">
              {activeCategory.items.map((technology) => {
                const { name, Icon, color } = technology;
                return (
                  <div
                    key={name}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md hover:border-primary/40 hover:bg-primary/5 transition-all group cursor-default"
                  >
                    <Icon
                      className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={color ? { color } : undefined}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-foreground">{name}</span>
                  </div>
                );
              })}
                </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── FAQ ─── */
function LatestInsightsSection() {
  const featuredPosts = [
    {
      slug: "top-web-development-trends-2026",
      title: "Top Web Development Trends in 2026",
      excerpt: "AI-first experiences, edge computing, and performance-first architectures from a leading IT company.",
      category: "Web Development",
      readTime: "12 min",
    },
    {
      slug: "scalable-saas-development-guide",
      title: "Building Scalable SaaS Applications",
      excerpt: "Proven multi-tenancy patterns, tech stacks, and architecture decisions used by elite engineering teams.",
      category: "SaaS",
      readTime: "15 min",
    },
    {
      slug: "technical-seo-guide-for-it-companies",
      title: "Technical SEO for Modern Web Apps",
      excerpt: "Core Web Vitals, structured data, and crawlability strategies that actually move the needle.",
      category: "SEO",
      readTime: "14 min",
    },
  ];

  return (
    <section className="py-20 border-t border-border/30">
      <Container>
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="uppercase tracking-[3px] text-xs font-semibold text-primary mb-2">From the team</div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter">Latest Insights</h2>
          </div>
          <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            View all articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredPosts.map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`} className="group block">
              <div className="h-full rounded-2xl border border-border/50 bg-card/60 overflow-hidden transition hover:border-primary/30 hover:bg-card">
                <div className="relative h-36">
                  <img src={`/blog/${post.slug === 'top-web-development-trends-2026' ? 'web-development-trends-2026' : post.slug === 'scalable-saas-development-guide' ? 'scalable-saas-development' : 'technical-seo'}.jpg`} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" loading="lazy" decoding="async" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-medium bg-black/70 text-white rounded">{post.category}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="text-xs text-primary font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">Read <ArrowRight className="h-3 w-3" /></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 md:hidden text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary">Browse the full blog archive →</Link>
        </div>
      </Container>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-20 md:py-32">
      <Container>
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">FAQ</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground">
              Common Questions
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item, i) => (
            <AnimateOnScroll key={i}>
              <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === i ? "border-primary/40 bg-primary/[0.03]" : "premium-card hover:bg-card/90"
              }`}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-left cursor-pointer"
                >
                  <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    openIndex === i ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm md:text-base font-heading font-semibold text-foreground">
                    {item.question}
                  </span>
                  {openIndex === i ? <Minus className="w-4 h-4 text-primary shrink-0" /> : <Plus className="w-4 h-4 text-muted-foreground shrink-0" />}
                </button>
                <div className={`grid transition-all duration-300 ${openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-5 md:pb-6 pl-16 text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-8">
            <Sparkles className="w-3.5 h-3.5" /> Let's Work Together
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-foreground mb-6 max-w-3xl mx-auto leading-[1.1]">
            Ready to Build Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Next Digital Product?
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Tell us about your project. We'll respond within 24 hours — no sales scripts, no runaround.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GradientButton href="/contact#contact-form" className="px-10 py-4 text-base font-semibold">
              Start Your Project <ArrowRight className="w-5 h-5 ml-2 inline" />
            </GradientButton>
            <a
              href="mailto:contact@weraisetech.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
export default function HomePage() {
  useSEO({
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    path: PAGE_SEO.home.path,
    keywords: [...PAGE_SEO.home.keywords],
    brandTitle: false,
    jsonLd: [
      faqJsonLd(
        faqData.map((f) => ({ question: f.question, answer: f.answer }))
      ),
    ],
  });

  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <TechMarquee />
      <ServicesSection />
      <WhyChooseSection />
      <ProcessSection />
      <TechStackSection />
      <LatestInsightsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
