import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import {
  Code2, ShoppingCart, Layers, Palette, Search, ShoppingBag,
  ArrowRight, CheckCircle, Shield, Cpu, Zap, Plus, Minus,
  Smartphone, Target, TrendingUp, Globe, Users, Star,
  ArrowUpRight, Sparkles, MousePointer2, BarChart3, Settings, Terminal
} from "lucide-react";
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

const techCategories = [
  {
    id: "frontend", label: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "backend", label: "Backend",
    items: ["Node.js", "NestJS", "Java", "Spring Boot", "Python", "FastAPI"],
  },
  {
    id: "database", label: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    id: "cloud", label: "Cloud & DevOps",
    items: ["AWS", "Vercel", "Docker", "GitHub"],
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

const allTechNames = techCategories.flatMap((category) => category.items);

/* ─── Marquee ─── */
function TechMarquee() {
  return (
    <div className="relative overflow-hidden py-10 border-y border-border/30 bg-card/5">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="flex gap-10 animate-[marquee_30s_linear_infinite] w-max" aria-hidden="true">
        {[...allTechNames, ...allTechNames].map((name, i) => (
          <div key={`${name}-${i}`} className="flex h-10 items-center justify-center rounded-lg border border-border/40 bg-card/40 px-4 text-xs font-bold text-muted-foreground opacity-70">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

const deliverySteps = [
  { label: "Discover", detail: "Goals & scope" },
  { label: "Design", detail: "UX & architecture" },
  { label: "Build", detail: "Code & quality" },
  { label: "Launch", detail: "Release & grow" },
];

function DeliveryWorkspaceCard() {
  return (
    <div className="relative mx-auto w-full max-w-[31rem] animate-slide-in-right lg:ml-auto">
      <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-violet-500/15 via-blue-400/10 to-cyan-400/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950 p-3 text-white shadow-[0_28px_80px_rgba(15,23,42,0.24)] sm:p-4">
        <div className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-violet-600/20 blur-[70px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-44 w-44 rounded-full bg-cyan-400/15 blur-[70px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative rounded-[1.25rem] border border-white/10 bg-slate-900/90 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-300">Delivery workspace</p>
              <h2 className="mt-1.5 text-lg font-bold text-white">Your product, always in view</h2>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[9px] font-bold text-cyan-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
              Live
            </div>
          </div>

          <div className="relative mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="absolute left-[12.5%] right-[12.5%] top-3 hidden h-px bg-white/10 sm:block" aria-hidden="true">
              <span className="delivery-rail block h-full bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300" />
            </div>
            {deliverySteps.map((step, index) => (
              <div
                key={step.label}
                className="delivery-stage relative rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5 sm:border-0 sm:bg-transparent sm:p-0"
                style={{ animationDelay: `${index * 1.15}s` }}
              >
                <span className="delivery-stage-dot relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-slate-900 text-[9px] font-extrabold text-slate-300">
                  <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <p className="mt-2 text-[11px] font-bold text-white">{step.label}</p>
                <p className="mt-0.5 text-[9px] leading-3.5 text-slate-400">{step.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-3.5">
            <div className="flex items-center justify-between gap-3 text-[10px]">
              <span className="font-semibold text-slate-200">Quality checks</span>
              <span className="text-right text-slate-400">Performance · SEO · Security</span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="delivery-progress h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-400 to-cyan-300" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {["Weekly demos", "Clean handoff", "Launch support"].map((item) => (
              <div key={item} className="flex min-h-12 items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.035] px-2.5 text-[9px] font-semibold text-slate-300">
                <CheckCircle className="h-3 w-3 shrink-0 text-cyan-300" />
                {item}
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
    <section className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden py-12 sm:py-16 lg:py-14">
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

      <Container className="relative z-10 grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(27rem,0.92fr)] lg:gap-10 xl:gap-16">
        <div className="text-center lg:text-left">
          <div className="relative mb-7 inline-flex animate-fade-in cursor-default group">
            <div className="absolute -inset-px rounded-full bg-gradient-to-r from-primary via-blue-400 to-secondary opacity-30 blur-md transition-all duration-1000 group-hover:-inset-1 group-hover:opacity-60" />
            <div className="relative inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur-xl sm:gap-2 sm:px-5 sm:text-xs sm:tracking-widest">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Web &amp; Custom Software Development
            </div>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-[1.02] tracking-tighter sm:text-6xl lg:text-[4rem] xl:text-[4.65rem]">
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
                  className={`px-5 py-2 rounded-full border transition-all text-sm font-medium ${activeTech === cat.id ? "bg-primary text-white border-primary" : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/40"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div role="tabpanel" className="flex flex-wrap justify-center gap-3">
              {activeCategory.items.map((tech) => {
                return (
                  <div
                    key={tech}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md hover:border-primary/40 hover:bg-primary/5 transition-all group cursor-default"
                  >
                    <span className="h-2 w-2 rounded-full bg-primary/70" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">{tech}</span>
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
