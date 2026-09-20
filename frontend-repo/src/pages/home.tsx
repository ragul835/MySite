import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import {
  Code2, ShoppingCart, Layers, Palette, Search, ShoppingBag,
  ArrowRight, CheckCircle, Shield, Cpu, Zap, Plus, Minus,
  Smartphone, Target, TrendingUp, Globe, Users, Star,
  ArrowUpRight, Sparkles, MousePointer2, BarChart3, Settings, Terminal
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiSpringboot, SiPython, SiFastapi, SiNestjs,
  SiPostgresql, SiMysql, SiMongodb,
  SiVercel, SiGit, SiGithub, SiFigma, SiGooglecloud, SiDocker,
  SiJavascript, SiStripe
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useSEO } from "@/hooks/useDocumentTitle";
import {
  PAGE_SEO,
  organizationJsonLd,
  websiteJsonLd,
  professionalServiceJsonLd,
  faqJsonLd,
} from "@/lib/seo";

/* ─── Data ─── */
const services = [
  { icon: Code2, title: "Web Development", description: "Custom websites engineered for performance, responsiveness, SEO, and business growth.", tag: "Popular" },
  { icon: ShoppingCart, title: "E-Commerce", description: "Scalable online stores designed to improve customer experience and increase conversions.", tag: "" },
  { icon: Layers, title: "Full-Stack Apps", description: "Modern frontend and backend systems built for scalability, maintainability, and security.", tag: "" },
  { icon: Zap, title: "SaaS Platforms", description: "Subscription-based software platforms designed to support long-term growth and business operations.", tag: "Hot" },
  { icon: Palette, title: "UI/UX Design", description: "User-focused digital experiences that improve engagement, usability, and conversions.", tag: "" },
  { icon: Search, title: "SEO Services", description: "Technical and on-page optimization strategies that improve visibility and search rankings.", tag: "" },
  { icon: Settings, title: "Website Maintenance & Support", description: "Keep your website secure, fast, and up-to-date with proactive monitoring and expert support.", tag: "" },
  { icon: Smartphone, title: "Mobile App Development", description: "High-performance iOS and Android applications built for engagement and scale.", tag: "New" },
  { icon: Terminal, title: "Custom Software Development", description: "Tailor-made software solutions that automate workflows and solve complex business problems.", tag: "" },
];

const techCategories = [
  {
    id: "frontend", label: "Frontend",
    items: [
      { name: "React.js", Icon: SiReact }, { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript }, { name: "JavaScript", Icon: SiJavascript },
      { name: "Tailwind CSS", Icon: SiTailwindcss }, { name: "Framer Motion", Icon: SiFramer },
    ],
  },
  {
    id: "backend", label: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs }, { name: "NestJS", Icon: SiNestjs },
      { name: "Java", Icon: FaJava }, { name: "Spring Boot", Icon: SiSpringboot },
      { name: "Python", Icon: SiPython }, { name: "FastAPI", Icon: SiFastapi },
    ],
  },
  {
    id: "database", label: "Database",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql }, { name: "MySQL", Icon: SiMysql },
      { name: "MongoDB", Icon: SiMongodb },
    ],
  },
  {
    id: "cloud", label: "Cloud & DevOps",
    items: [
      { name: "AWS", Icon: FaAws }, { name: "Vercel", Icon: SiVercel },
      { name: "Docker", Icon: SiDocker }, { name: "GitHub", Icon: SiGithub },
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

const allTechIcons = [
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiNestjs, SiPython,
  SiFastapi, SiPostgresql, SiMysql, SiMongodb, SiDocker, FaAws,
  SiGithub, SiVercel, SiTailwindcss, SiFramer, SiFigma, SiStripe,
];

/* ─── Marquee ─── */
function TechMarquee() {
  return (
    <div className="relative overflow-hidden py-10 border-y border-border/30 bg-card/5">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="flex gap-10 animate-[marquee_30s_linear_infinite] w-max">
        {[...allTechIcons, ...allTechIcons].map((Icon, i) => (
          <div key={i} className="w-10 h-10 flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity">
            <Icon className="w-8 h-8 text-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center overflow-hidden py-14 sm:py-16 lg:py-20">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.15),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10 animate-orb-drift" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] pointer-events-none -z-10 animate-orb-drift delay-700" />

      {/* ── Decorative Floating Elements ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Top Left Floating Code Block */}
        <div className="absolute top-[15%] left-[5%] md:left-[10%] animate-float-slow hidden md:block">
          <div className="premium-card p-4 rounded-xl rotate-[-6deg] opacity-70 scale-90">
            <div className="flex gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-400/50" />
              <div className="w-2 h-2 rounded-full bg-amber-400/50" />
              <div className="w-2 h-2 rounded-full bg-green-400/50" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-24 bg-primary/20 rounded-full" />
              <div className="h-2 w-16 bg-muted-foreground/20 rounded-full ml-4" />
              <div className="h-2 w-20 bg-secondary/20 rounded-full ml-4" />
            </div>
          </div>
        </div>

        {/* Top Right Floating Metric */}
        <div className="absolute top-[20%] right-[5%] md:right-[15%] animate-float delay-500 hidden md:block">
          <div className="premium-card p-4 rounded-2xl rotate-[8deg] opacity-80 scale-90 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">99.9%</div>
              <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Uptime</div>
            </div>
          </div>
        </div>

        {/* Bottom Left Floating Tech Icon */}
        <div className="absolute bottom-[25%] left-[10%] md:left-[20%] animate-float delay-1000 hidden md:block">
          <div className="w-14 h-14 rounded-2xl bg-card/60 backdrop-blur-md border border-border/50 shadow-lg rotate-[-12deg] flex items-center justify-center opacity-60">
             <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 0l-12 5.5v13l12 5.5 12-5.5v-13z"/>
             </svg>
          </div>
        </div>

        {/* Bottom Right Floating Badge */}
        <div className="absolute bottom-[20%] right-[10%] md:right-[22%] animate-float-slow delay-300 hidden md:block">
          <div className="premium-card px-4 py-2 rounded-full rotate-[4deg] opacity-70 scale-95 border-primary/20 bg-primary/5">
            <span className="text-xs font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Enterprise Grade
            </span>
          </div>
        </div>
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-8 relative inline-flex group cursor-default animate-fade-in">
          <div className="absolute transition-all duration-1000 opacity-30 -inset-px bg-gradient-to-r from-primary via-blue-400 to-secondary rounded-full blur-md group-hover:opacity-60 group-hover:-inset-1 group-hover:duration-200"></div>
          <div className="relative inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur-xl transition-all duration-200 sm:gap-2 sm:px-5 sm:text-sm sm:tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Custom Software Development
          </div>
        </div>

        {/* Headline */}
        <h1 className="mb-6 max-w-5xl text-4xl font-heading font-extrabold leading-[1.02] tracking-tighter sm:text-6xl md:text-7xl xl:text-8xl">
          <span className="text-foreground">We Build Custom</span>
          <br />
          <span className="relative">
            <span className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent animate-gradient">
              Software That Scales
            </span>
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
          From SaaS platforms and web applications to mobile apps and e-commerce systems,
          we engineer secure, scalable software that moves your business forward.
        </p>

        {/* CTAs */}
        <div className="mb-12 flex w-full flex-col items-center gap-4 sm:mb-16 sm:w-auto sm:flex-row">
          <GradientButton href="/contact#contact-form" className="w-full max-w-xs px-8 py-3.5 text-sm font-semibold sm:w-auto">
            Start Your Project <ArrowRight className="w-4 h-4 ml-2 inline" />
          </GradientButton>
          <Link href="/services" className="w-full max-w-xs sm:w-auto">
            <span className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border/60 bg-card/40 px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-card/80 sm:w-auto">
              View Our Work <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {["Scalable Architecture", "Security & Performance", "Product-Focused Delivery", "Long-Term Support"].map((item) => (
            <span key={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/30 text-xs font-medium text-muted-foreground backdrop-blur-sm animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
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
                  <div className="premium-card p-7 group cursor-default overflow-hidden h-full">
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

                    <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
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
                  <div className="text-5xl font-heading font-black text-primary/8 mb-4 select-none leading-none">
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
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-10 p-0">
              {techCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="px-5 py-2 rounded-full border border-border/50 bg-card/30 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary transition-all text-sm font-medium"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {techCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                <div className="flex flex-wrap justify-center gap-3">
                  {cat.items.map((tech) => {
                    const TechIcon = tech.Icon;
                    return (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md hover:border-primary/40 hover:bg-primary/5 transition-all group cursor-default"
                      >
                        <TechIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium text-foreground">{tech.name}</span>
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
      organizationJsonLd(),
      websiteJsonLd(),
      professionalServiceJsonLd(),
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
