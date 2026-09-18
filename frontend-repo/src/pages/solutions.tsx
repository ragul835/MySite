import { Link } from "wouter";
import {
  ChevronRight, Search, Map, PenTool, Code2, CheckCircle,
  Rocket, HeartHandshake, ArrowRight, Sparkles, Zap, Globe,
  Users, ArrowUpRight
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useSEO } from "@/hooks/useDocumentTitle";
import { PAGE_SEO, breadcrumbJsonLd } from "@/lib/seo";

/* ─── Data ─── */
const steps = [
  {
    icon: Search, step: "01", title: "Discovery",
    description: "We audit your requirements, constraints, and goals. No assumptions — just deep listening and sharp questions.",
    color: "from-blue-500/20 to-primary/20", iconColor: "text-blue-400",
  },
  {
    icon: Map, step: "02", title: "Planning",
    description: "Creating a detailed roadmap and project architecture to ensure smooth execution from start to finish.",
    color: "from-violet-500/20 to-purple-500/20", iconColor: "text-violet-400",
  },
  {
    icon: PenTool, step: "03", title: "Design",
    description: "Architecture, wireframes, and a clear technical spec. You approve before a single line of production code is written.",
    color: "from-pink-500/20 to-rose-500/20", iconColor: "text-pink-400",
  },
  {
    icon: Code2, step: "04", title: "Development",
    description: "Iterative sprints with weekly demos. You see real progress, real software — not slide decks.",
    color: "from-orange-500/20 to-amber-500/20", iconColor: "text-orange-400",
  },
  {
    icon: CheckCircle, step: "05", title: "Testing",
    description: "Rigorous QA and automated testing to ensure everything works perfectly across all devices and scenarios.",
    color: "from-green-500/20 to-emerald-500/20", iconColor: "text-green-400",
  },
  {
    icon: Rocket, step: "06", title: "Deployment",
    description: "Zero-downtime launches, monitoring setup, and a smooth transition to the live environment.",
    color: "from-cyan-500/20 to-sky-500/20", iconColor: "text-cyan-400",
  },
  {
    icon: HeartHandshake, step: "07", title: "Support",
    description: "Providing ongoing maintenance, monitoring, and updates. We ship — and we stay to support your growth.",
    color: "from-teal-500/20 to-green-500/20", iconColor: "text-teal-400",
  },
];

const industries = [
  {
    icon: Zap, name: "SaaS & Startups",
    description: "Scalable platforms, subscription models, and modern architectures built to support rapid user growth.",
    color: "from-orange-500/10 to-amber-500/10", iconColor: "text-orange-400",
  },
  {
    icon: Globe, name: "E-Commerce & Retail",
    description: "High-performance online stores, custom shopping experiences, and conversion-focused platforms.",
    color: "from-green-500/10 to-emerald-500/10", iconColor: "text-green-400",
  },
  {
    icon: Users, name: "Professional Services",
    description: "Business websites, client portals, and custom software for agencies, consultants, and service organizations.",
    color: "from-blue-500/10 to-primary/10", iconColor: "text-blue-400",
  },
  {
    icon: HeartHandshake, name: "Education & Training",
    description: "Learning platforms, course management systems, and interactive digital experiences.",
    color: "from-purple-500/10 to-violet-500/10", iconColor: "text-purple-400",
  },
];

export default function SolutionsPage() {
  useSEO({
    title: PAGE_SEO.solutions.title,
    description: PAGE_SEO.solutions.description,
    path: PAGE_SEO.solutions.path,
    brandTitle: false,
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
      ]),
    ],
  });

  return (
    <div className="w-full flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pt-28">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_70%_0%,hsl(var(--secondary)/0.12),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        {/* Floating animated orbs */}
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[100px] -z-10 animate-orb-drift" />
        <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px] -z-10 animate-orb-drift delay-700" />

        {/* ── Decorative Floating Elements ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {/* Top Left Architecture Node */}
          <div className="absolute top-[25%] left-[8%] animate-float delay-300 hidden xl:block">
            <div className="premium-card p-4 rounded-2xl rotate-[-5deg] opacity-75">
              <div className="flex flex-col gap-2">
                <div className="w-16 h-8 rounded border border-primary/20 bg-primary/5 flex items-center justify-center">
                  <div className="w-4 h-1 bg-primary/40 rounded-full" />
                </div>
                <div className="w-px h-6 bg-border mx-auto" />
                <div className="flex gap-2">
                  <div className="w-12 h-6 rounded border border-border/60 bg-card" />
                  <div className="w-12 h-6 rounded border border-border/60 bg-card" />
                </div>
              </div>
            </div>
          </div>

          {/* Top Right Floating Graph */}
          <div className="absolute top-[18%] right-[10%] animate-float-slow hidden lg:block">
            <div className="premium-card p-4 rounded-xl rotate-[10deg] opacity-80 flex flex-col gap-2 items-end w-32">
              <div className="w-full flex items-end justify-between gap-1 h-12 border-b border-border/50 pb-1">
                <div className="w-4 bg-blue-500/20 rounded-t h-[40%]" />
                <div className="w-4 bg-primary/20 rounded-t h-[60%]" />
                <div className="w-4 bg-blue-500/40 rounded-t h-[80%]" />
                <div className="w-4 bg-primary/60 rounded-t h-[100%]" />
              </div>
              <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Growth</div>
            </div>
          </div>
        </div>

        <Container>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/30 text-xs text-muted-foreground mb-10 backdrop-blur-sm animate-fade-in">
            <Link id="solutions-breadcrumb-home" href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Solutions</span>
          </div>

          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Our Capabilities
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tighter leading-[1.05] mb-6 text-foreground">
              Custom Solutions{" "}
              <span className="bg-gradient-to-r from-secondary via-primary to-blue-400 bg-clip-text text-transparent animate-gradient">
                Engineered to Scale
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Custom digital solutions engineered for scale and performance, tailored precisely to your business needs.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Process Section — Editorial Strip Design ── */}
      <section className="pb-20 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

        <Container>
          <AnimateOnScroll>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <span className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3 block">The Process</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground">
                  How We Build
                </h2>
              </div>
              <p className="text-muted-foreground text-sm md:text-base max-w-xs leading-relaxed md:text-right">
                Clear. Predictable. No black boxes, no surprises.
              </p>
            </div>
          </AnimateOnScroll>

          {/* ── Step Strips ── */}
          <div className="divide-y divide-border/40 border-y border-border/40">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <AnimateOnScroll key={step.step} delay={i * 0.06}>
                  <div
                    data-testid={`step-process-${i}`}
                    className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-6 py-7 md:py-8 transition-all duration-300 hover:bg-card/20 px-2 rounded-xl cursor-default overflow-hidden"
                  >
                    {/* Hover left accent */}
                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${step.color.replace('/20', '/80')} scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top rounded-full`} />

                    {/* Step number — large editorial */}
                    <div className="shrink-0 w-20 md:w-28 flex items-center justify-center">
                      <span className={`text-5xl md:text-6xl font-heading font-black leading-none tabular-nums transition-all duration-300 ${step.iconColor} opacity-20 group-hover:opacity-80`}>
                        {step.step}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px self-stretch bg-border/40 group-hover:bg-primary/30 transition-colors duration-300 shrink-0" />

                    {/* Icon */}
                    <div className={`shrink-0 w-11 h-11 rounded-xl bg-card/60 border border-border/50 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300 shadow-sm`}>
                      <Icon className={`w-5 h-5 ${step.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-heading font-extrabold text-foreground mb-1 tracking-tight group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Phase tag */}
                    <div className="shrink-0 hidden lg:block">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${step.iconColor} border-current bg-current/5 group-hover:bg-current/15`}>
                        <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                        Phase {i + 1}
                      </span>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          {/* Bottom CTA strip */}
          <AnimateOnScroll>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 premium-card">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">
                  Average project timeline: <span className="text-foreground font-semibold">2 – 8 weeks</span>
                </span>
              </div>
              <div className="text-xs text-muted-foreground/60 font-mono tracking-wider">
                {steps.length} phases · 100% transparent
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>


      {/* ── Industries ── */}
      <section className="py-16 md:py-24 border-y border-border/30 bg-card/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-orb-drift delay-500" />
        <Container>
          <AnimateOnScroll>
            <div className="text-center mb-14">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Who We Work With</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground">Industries We Serve</h2>
              <p className="text-muted-foreground text-base md:text-lg mt-4 max-w-xl mx-auto">
                We build digital solutions for businesses across diverse industries.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {industries.map((ind) => {
                const Icon = ind.icon;
                return (
                  <AnimatedItem key={ind.name}>
                    <div className="premium-card group p-7 h-full">
                      <div className={`absolute inset-0 bg-gradient-to-br ${ind.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                      <div className="relative z-10">
                        <div className="w-11 h-11 rounded-xl bg-card/80 border border-border/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          <Icon className={`w-5 h-5 ${ind.iconColor}`} />
                        </div>
                        <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{ind.name}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{ind.description}</p>
                      </div>
                    </div>
                  </AnimatedItem>
                );
              })}
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── Impact & Results ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="max-w-4xl mx-auto premium-card p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Measurable Impact</span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-foreground mb-6">
                    Solutions engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">rapid growth.</span>
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                    Our architectures are built to scale from day one. We focus on core metrics that matter to your business: performance, uptime, and user conversion.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Sub-second page load times",
                      "Automated CI/CD pipelines",
                      "Zero-downtime deployments",
                      "Enterprise-grade security"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-foreground font-medium">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle className="w-3 h-3 text-primary" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/40 border border-border/40 p-6 rounded-2xl text-center flex flex-col items-center justify-center backdrop-blur-sm">
                    <div className="text-3xl font-heading font-black text-foreground mb-1">50M+</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">API Requests</div>
                  </div>
                  <div className="bg-primary border border-primary-foreground/20 p-6 rounded-2xl text-center flex flex-col items-center justify-center shadow-xl shadow-primary/20">
                    <div className="text-3xl font-heading font-black text-primary-foreground mb-1">99.9%</div>
                    <div className="text-[10px] font-bold text-primary-foreground/80 uppercase tracking-widest">Uptime SLA</div>
                  </div>
                  <div className="bg-card/40 border border-border/40 p-6 rounded-2xl text-center flex flex-col items-center justify-center backdrop-blur-sm col-span-2">
                    <div className="text-4xl font-heading font-black text-foreground mb-1">&lt; 100ms</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global Latency</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none animate-glow-ring" />
        <Container className="relative z-10 text-center">
          <AnimateOnScroll>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Ready to Start?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground mb-5">
              Let's Build Your Next{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent animate-gradient">Success Story</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-lg mx-auto">
              Every great product starts with a conversation. Tell us about your project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GradientButton id="solutions-cta-start-project" href="/contact#contact-form" className="px-10 py-4 text-base font-semibold animate-glow-pulse">
                Start a Conversation <ArrowRight className="w-4 h-4 ml-2 inline" />
              </GradientButton>
              <a href="mailto:ragulsiva@zohomail.in" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                or email us directly →
              </a>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </div>
  );
}
