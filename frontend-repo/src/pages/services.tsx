import { Link } from "wouter";
import { useEffect } from "react";
import {
  Code2, ShoppingCart, Layers, Palette, Search, ShoppingBag, Gauge,
  ChevronRight, CheckCircle, ArrowRight, ArrowUpRight, Sparkles, Zap,
  Settings, Smartphone, Terminal
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useSEO } from "@/hooks/useDocumentTitle";
import { PAGE_SEO, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { SERVICES } from "@/data/services";

const servicesList = [
  {
    icon: Code2,
    title: "Web Development",
    tag: "Popular",
    color: "from-blue-500/20 to-primary/20",
    iconColor: "text-blue-400",
    whatItIs: "Custom websites engineered for performance, responsiveness, SEO, and business growth.",
    benefits: "Establishes a strong digital presence, improves user engagement, and drives conversions.",
    technologiesUsed: "React, Next.js, TypeScript, Tailwind CSS",
    whoNeedsIt: "Businesses looking for a professional, high-performance website.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    tag: "High ROI",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    whatItIs: "Scalable online stores designed to improve customer experience and increase conversions.",
    benefits: "Increases sales, provides a smooth shopping experience, and scales with your business.",
    technologiesUsed: "Next.js, Node.js, Stripe, PostgreSQL",
    whoNeedsIt: "Retailers and brands wanting to sell products online efficiently.",
  },
  {
    icon: Layers,
    title: "Full-Stack Development",
    tag: "",
    color: "from-purple-500/20 to-violet-500/20",
    iconColor: "text-purple-400",
    whatItIs: "Modern frontend and backend systems built for scalability, maintainability, and security.",
    benefits: "Provides a complete, robust solution with seamless frontend and backend integration.",
    technologiesUsed: "React, Node.js, NestJS, PostgreSQL, TypeScript",
    whoNeedsIt: "Companies needing complex, custom web applications.",
  },
  {
    icon: Gauge,
    title: "SaaS Development",
    tag: "Hot",
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-400",
    whatItIs: "Subscription-based software platforms designed to support long-term growth and business operations.",
    benefits: "Creates reliable recurring revenue streams with scalable infrastructure.",
    technologiesUsed: "Next.js, NestJS, PostgreSQL, Stripe",
    whoNeedsIt: "Startups and enterprises building subscription-based software.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    tag: "",
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
    whatItIs: "User-focused digital experiences that improve engagement, usability, and conversions.",
    benefits: "Enhances user satisfaction, reduces bounce rates, and strengthens brand identity.",
    technologiesUsed: "Figma, Framer Motion, Tailwind CSS",
    whoNeedsIt: "Any product that needs a modern, user-friendly interface.",
  },
  {
    icon: Search,
    title: "SEO Services",
    tag: "",
    color: "from-cyan-500/20 to-sky-500/20",
    iconColor: "text-cyan-400",
    whatItIs: "Technical and on-page optimization strategies that improve visibility and search rankings.",
    benefits: "Improves search engine rankings, increases organic traffic, and lowers acquisition costs.",
    technologiesUsed: "Google Search Console, Lighthouse, Next.js SEO",
    whoNeedsIt: "Businesses wanting better visibility on search engines.",
  },
  {
    icon: ShoppingBag,
    title: "Shopify Development",
    tag: "",
    color: "from-teal-500/20 to-green-500/20",
    iconColor: "text-teal-400",
    whatItIs: "Custom Shopify stores, theme customization, integrations, and performance optimization.",
    benefits: "Provides a tailored shopping experience on a robust e-commerce platform.",
    technologiesUsed: "Shopify Liquid, React, Node.js",
    whoNeedsIt: "Merchants looking for customized Shopify stores.",
  },
  {
    icon: CheckCircle,
    title: "E-Commerce Optimization",
    tag: "",
    color: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-400",
    whatItIs: "Performance improvements, Core Web Vitals optimization, conversion enhancements, and speed optimization.",
    benefits: "Faster load times, better search rankings, and higher conversion rates.",
    technologiesUsed: "Lighthouse, Next.js, Vercel, Analytics",
    whoNeedsIt: "E-commerce businesses looking to improve performance and sales.",
  },
  {
    icon: Settings,
    title: "Website Maintenance & Support",
    tag: "",
    color: "from-slate-500/20 to-zinc-500/20",
    iconColor: "text-slate-400",
    whatItIs: "Ongoing security monitoring, updates, backups, and performance care so your site stays reliable.",
    benefits: "Reduced downtime, stronger security, and consistent performance without in-house overhead.",
    technologiesUsed: "Uptime monitoring, Cloudflare, ManageWP, AWS Backup, Sentry",
    whoNeedsIt: "Businesses that want peace of mind knowing their website is actively maintained.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    tag: "New",
    color: "from-violet-500/20 to-fuchsia-500/20",
    iconColor: "text-violet-400",
    whatItIs: "Native and cross-platform iOS and Android apps designed for speed, usability, and long-term growth.",
    benefits: "Reach users on their primary devices, increase engagement, and build lasting brand loyalty.",
    technologiesUsed: "React Native, Flutter, Swift, Kotlin, Firebase",
    whoNeedsIt: "Startups and enterprises launching mobile-first products or customer apps.",
  },
  {
    icon: Terminal,
    title: "Custom Software Development",
    tag: "",
    color: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-400",
    whatItIs: "Bespoke software built around your workflows — automation, integrations, and enterprise tools.",
    benefits: "Perfect fit for unique processes, higher efficiency, and full ownership of the source code.",
    technologiesUsed: "Node.js, Python, Java, PostgreSQL, Docker, AWS, Kubernetes",
    whoNeedsIt: "Organizations with unique operations that off-the-shelf tools cannot fully support.",
  },
];

export default function ServicesPage() {
  useSEO({
    title: PAGE_SEO.services.title,
    description: PAGE_SEO.services.description,
    path: PAGE_SEO.services.path,
    brandTitle: false,
    keywords: [
      "software development services",
      "web development services",
      "mobile app development",
      "SaaS development",
      "custom software",
      "website maintenance",
    ],
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
      itemListJsonLd(
        "We Raise Tech Software Development Services",
        SERVICES.map((s) => ({
          name: s.title,
          path: `/services/${s.slug}`,
          description: s.description,
        }))
      ),
    ],
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pt-28">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,hsl(var(--primary)/0.12),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px] -z-10 animate-orb-drift" />
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-secondary/10 blur-[100px] -z-10 animate-orb-drift delay-500" />

        {/* ── Decorative Floating Elements ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {/* Top Right Design Card */}
          <div className="absolute top-[20%] right-[8%] animate-float-slow hidden lg:block">
            <div className="premium-card p-4 rounded-xl rotate-[12deg] opacity-80 flex gap-3 items-center w-48">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <div className="h-2 w-16 bg-foreground/20 rounded-full mb-1.5" />
                <div className="h-2 w-10 bg-muted-foreground/20 rounded-full" />
              </div>
            </div>
          </div>

          {/* Bottom Right Floating API Badge */}
          <div className="absolute bottom-[25%] right-[15%] animate-float delay-1000 hidden lg:block">
            <div className="premium-card px-4 py-3 rounded-2xl rotate-[-8deg] opacity-90 border-blue-500/20 bg-blue-500/5 shadow-[0_8px_30px_rgba(59,130,246,0.15)] flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
               <span className="text-xs font-mono font-bold text-blue-500 tracking-wider">REST_API</span>
            </div>
          </div>

          {/* Center Right Subtle Circle */}
          <div className="absolute top-[45%] right-[2%] animate-spin-slow hidden 2xl:block opacity-30">
            <div className="w-24 h-24 rounded-full border border-dashed border-primary/40" />
          </div>
        </div>

        <Container>
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/30 text-xs text-muted-foreground mb-10 backdrop-blur-sm">
            <Link id="services-breadcrumb-home" href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Services</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              What We Offer
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tighter leading-[1.05] mb-6 text-foreground">
              Services Built{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent animate-gradient">
                Around Your Goals
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Everything you need to build, launch, and scale your digital product — from idea to production.
            </p>
          </div>

          {/* Quick nav pills */}
          <div className="flex flex-wrap gap-2 mt-10">
            {servicesList.map((s) => (
              <a
                key={s.title}
                href={`#${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-4 py-1.5 rounded-full border border-border/40 bg-card/30 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all backdrop-blur-sm"
              >
                {s.title}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Services Grid ── */}
      <section className="pb-20 md:pb-32">
        <Container>
          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesList.map((service, i) => {
                const Icon = service.icon;
                return (
                  <AnimatedItem key={service.title}>
                    <div
                      id={service.title.toLowerCase().replace(/\s+/g, "-")}
                      data-testid={`section-service-${i}`}
                      className="premium-card group scroll-mt-28"
                    >
                      {/* Gradient corner accent */}
                      <div className={`absolute top-0 right-0 w-48 h-48 rounded-bl-full bg-gradient-to-bl ${service.color} opacity-30 group-hover:opacity-60 transition-opacity duration-500 blur-2xl pointer-events-none`} />

                      <div className="relative p-7 md:p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className={`w-12 h-12 rounded-xl bg-card/80 border border-border/60 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-6 h-6 ${service.iconColor}`} />
                          </div>
                          {service.tag && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                              {service.tag}
                            </span>
                          )}
                        </div>

                        <h2 className="text-xl font-heading font-bold text-foreground mb-4">{service.title}</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            { label: "Overview", value: service.whatItIs },
                            { label: "Benefits", value: service.benefits },
                            { label: "Technologies", value: service.technologiesUsed },
                            { label: "Ideal For", value: service.whoNeedsIt },
                          ].map((item) => (
                            <div key={item.label}>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">{item.label}</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">{item.value}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 pt-5 border-t border-border/30 flex items-center justify-between">
                          <Link href="/contact#contact-form">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-3 transition-all cursor-pointer">
                              Get started <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </Link>
                          <span className="text-[10px] text-muted-foreground/40 font-mono">
                            {String(i + 1).padStart(2, "0")} / {String(servicesList.length).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AnimatedItem>
                );
              })}
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── Technology Stack ── */}
      <section className="py-20 bg-card/5 border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Modern Infrastructure</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground">
                Our Technology Stack
              </h2>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  area: "Frontend",
                  color: "from-blue-500/10 to-cyan-500/10",
                  textColor: "text-blue-500",
                  techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"]
                },
                {
                  area: "Backend",
                  color: "from-green-500/10 to-emerald-500/10",
                  textColor: "text-green-500",
                  techs: ["Node.js", "Express", "Python", "FastAPI", "Go", "GraphQL"]
                },
                {
                  area: "Database",
                  color: "from-orange-500/10 to-amber-500/10",
                  textColor: "text-orange-500",
                  techs: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma", "ElasticSearch"]
                },
                {
                  area: "DevOps & Cloud",
                  color: "from-purple-500/10 to-pink-500/10",
                  textColor: "text-purple-500",
                  techs: ["AWS", "Vercel", "Docker", "Kubernetes", "GitHub Actions", "Terraform"]
                }
              ].map((stack, i) => (
                <div key={stack.area} className="premium-card p-6 h-full flex flex-col group">
                  <div className={`w-full h-1 bg-gradient-to-r ${stack.color.replace('/10', '')} opacity-40 group-hover:opacity-100 transition-opacity absolute top-0 left-0`} />
                  <h3 className={`text-xl font-heading font-extrabold mb-6 ${stack.textColor}`}>{stack.area}</h3>
                  <ul className="space-y-3 flex-1">
                    {stack.techs.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${stack.color.replace('/10', '')}`} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-24 relative overflow-hidden border-t border-border/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
        <Container className="relative z-10 text-center">
          <AnimateOnScroll>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Zap className="w-3.5 h-3.5" /> Ready to Start?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground mb-5">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Great Together</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-lg mx-auto">
              Tell us about your requirements and we'll get back to you within 24 hours with a clear plan.
            </p>
            <GradientButton id="services-cta-start-project" href="/contact#contact-form" className="px-10 py-4 text-base font-semibold">
              Start Your Project <ArrowRight className="w-4 h-4 ml-2 inline" />
            </GradientButton>
          </AnimateOnScroll>
        </Container>
      </section>
    </div>
  );
}
