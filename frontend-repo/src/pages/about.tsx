import { Link } from "wouter";
import { CheckCircle, ChevronRight, Shield, Zap, Target, Cpu, ArrowRight, Sparkles, Globe } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useSEO } from "@/hooks/useDocumentTitle";
import { PAGE_SEO, breadcrumbJsonLd } from "@/lib/seo";

const coreValues = [
  "Performance and scalability in every solution.",
  "Transparency in communication and timelines.",
  "Modern technology and clean engineering practices.",
  "Reliability and long-term post-launch support.",
];

const valueCards = [
  {
    icon: Shield,
    title: "Quality",
    description: "Every solution is built with clean code, best practices, and a focus on long-term maintainability.",
    color: "from-blue-500/15 to-primary/15",
    iconColor: "text-blue-400",
  },
  {
    icon: Target,
    title: "Transparency",
    description: "Clear timelines, regular updates, and complete project visibility throughout development.",
    color: "from-green-500/15 to-emerald-500/15",
    iconColor: "text-green-400",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We use modern frameworks and industry-standard tools to build solutions for performance and growth.",
    color: "from-orange-500/15 to-amber-500/15",
    iconColor: "text-orange-400",
  },
  {
    icon: CheckCircle,
    title: "Reliability",
    description: "We deliver on time, provide ongoing support, and ensure your digital products run smoothly.",
    color: "from-purple-500/15 to-violet-500/15",
    iconColor: "text-purple-400",
  },
];

const approachSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "We start by deeply understanding your business goals, target audience, and technical requirements to build a solid foundation.",
  },
  {
    step: "02",
    title: "Engineering & Development",
    description: "Using modern technologies and clean code practices, we build scalable, secure, and high-performing digital solutions.",
  },
  {
    step: "03",
    title: "Launch & Scale",
    description: "We ensure a smooth deployment, provide comprehensive training, and offer ongoing support to help your product grow.",
  },
];

export default function AboutPage() {
  useSEO({
    title: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
    path: PAGE_SEO.about.path,
    brandTitle: false,
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  });

  return (
    <div className="w-full flex flex-col">
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-20 lg:min-h-[calc(100svh-5rem)] lg:pt-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_20%_10%,hsl(var(--primary)/0.13),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_90%_65%,hsl(var(--secondary)/0.1),transparent_70%)]" />
          <div
            className="absolute inset-0 opacity-[0.03] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
            style={{
              backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>
        <div className="absolute -right-32 top-4 -z-10 h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-[130px] animate-orb-drift" />
        <div className="absolute -left-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[110px]" />

        <Container>
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/65 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur-md sm:mb-12">
            <Link id="about-breadcrumb-home" href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">About Us</span>
          </div>

          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 xl:gap-24">
            <AnimateOnScroll>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-[0_8px_30px_hsl(var(--primary)/0.08)]">
                <Sparkles className="w-3.5 h-3.5" /> Our Story
              </div>
              <h1 className="mb-6 max-w-2xl font-heading text-4xl font-extrabold leading-[1.02] tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-[4.2rem]">
                Building the{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent animate-gradient">
                  Digital Future
                </span>
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Your technology partner for building reliable, scalable digital solutions — from startups to growing enterprises.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {coreValues.map((v) => (
                  <li key={v} className="flex items-start gap-2.5 rounded-xl bg-card/45 px-3 py-2.5 shadow-[inset_0_0_0_1px_hsl(var(--border)/0.35)] backdrop-blur-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-xs leading-5 text-muted-foreground sm:text-sm">{v}</span>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>

            {/* Product delivery dashboard */}
            <AnimateOnScroll delay={0.2}>
              <div className="relative mx-auto w-full max-w-[38rem] pb-2 sm:px-8 sm:py-7 lg:px-0">
                <div className="absolute inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-blue-400/20 to-secondary/30 blur-3xl" />

                <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-[0_35px_90px_rgba(30,41,59,0.3)] sm:p-7">
                  <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-violet-500/25 blur-[80px]" />
                  <div className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-cyan-400/15 blur-[80px]" />
                  <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-950/40">
                          <Cpu className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">Product studio</p>
                          <p className="mt-0.5 text-sm font-bold text-white sm:text-base">Delivery control center</p>
                        </div>
                      </div>
                      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1.5 text-[9px] font-bold text-emerald-300 ring-1 ring-inset ring-emerald-300/20">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Live
                      </span>
                    </div>

                    <div className="mt-7 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-inset ring-white/10 sm:p-5">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Current sprint</p>
                          <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">From brief to scalable build</h2>
                        </div>
                        <span className="rounded-lg bg-violet-400/10 px-2 py-1 text-[10px] font-bold text-violet-200">03 / 04</span>
                      </div>

                      <div className="mt-6 grid grid-cols-4 gap-2" aria-label="Project delivery phases">
                        {["Discover", "Design", "Build", "Launch"].map((phase, index) => (
                          <div key={phase} className="min-w-0">
                            <div className={`h-1.5 rounded-full ${index < 3 ? "bg-gradient-to-r from-violet-400 to-cyan-400" : "bg-white/10"}`} />
                            <p className={`mt-2 truncate text-[9px] font-semibold sm:text-[10px] ${index < 3 ? "text-white" : "text-slate-500"}`}>{phase}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-inset ring-white/10">
                        <Globe className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                        <p className="mt-3 text-xl font-extrabold text-white sm:text-2xl">24/7</p>
                        <p className="mt-0.5 text-[10px] font-medium text-slate-400 sm:text-xs">Global collaboration</p>
                      </div>
                      <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-inset ring-white/10">
                        <Zap className="h-4 w-4 text-violet-300" aria-hidden="true" />
                        <p className="mt-3 text-xl font-extrabold text-white sm:text-2xl">2–8 wks</p>
                        <p className="mt-0.5 text-[10px] font-medium text-slate-400 sm:text-xs">Average delivery</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-0">
                  <div className="rounded-2xl bg-card/95 p-3.5 shadow-xl ring-1 ring-inset ring-border/50 backdrop-blur-xl sm:absolute sm:-bottom-1 sm:left-0 sm:w-44">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.7)] animate-pulse" />
                      <span className="text-xs font-bold text-foreground">Available now</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground sm:text-xs">Taking new projects</div>
                  </div>
                  <div className="rounded-2xl bg-card/95 p-3.5 shadow-xl ring-1 ring-inset ring-primary/15 backdrop-blur-xl sm:absolute sm:-right-1 sm:-top-1 sm:w-40">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Shield className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="text-xs font-bold text-foreground">Built for scale</div>
                    <div className="mt-0.5 text-[10px] text-muted-foreground">Secure by design</div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Mission ── */}
      <section className="py-16 md:py-24 border-y border-border/30 bg-card/5">
        <Container>
          <AnimateOnScroll>
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground mb-6">
                Helping Businesses Build Reliable Digital Products
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                We combine modern technology, clean engineering, and business-focused thinking to deliver digital products that perform, scale, and last for years to come.
              </p>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── Values ── */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimateOnScroll>
            <div className="text-center mb-14">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Core Values</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground">
                The Principles We Live By
              </h2>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {valueCards.map((card) => {
                const Icon = card.icon;
                return (
                  <AnimatedItem key={card.title}>
                    <div
                      id={`about-value-card-${card.title.toLowerCase()}`}
                      data-testid={`card-value-${card.title.toLowerCase()}`}
                      className="premium-card group h-full p-6"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                      <div className="relative z-10">
                        <div className="w-11 h-11 rounded-xl bg-card/80 border border-border/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          <Icon className={`w-5 h-5 ${card.iconColor}`} />
                        </div>
                        <h3 className="text-base font-heading font-bold text-foreground mb-2">{card.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
                      </div>
                    </div>
                  </AnimatedItem>
                );
              })}
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── Global Impact / Identity ── */}
      <section className="py-20 relative overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <AnimateOnScroll>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Global Reach
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
                  Building digital solutions for a <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">borderless world.</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                  We are a remote-first collective of engineers and designers, crafting scalable technology products for businesses worldwide. No matter where you are, we bring the same level of engineering excellence and transparency.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-4xl font-heading font-black text-foreground mb-1">100%</div>
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Remote Ready</div>
                  </div>
                  <div>
                    <div className="text-4xl font-heading font-black text-foreground mb-1">24/7</div>
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Infrastructure</div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right Graphic - Cascading Core Pillars */}
            <div className="relative mt-8 flex min-h-[340px] w-full flex-col items-center justify-center sm:min-h-[400px] lg:mt-0 lg:w-1/2">
              <AnimateOnScroll delay={0.2} className="w-full max-w-md relative">
                
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative space-y-4 w-full">
                  {/* Card 1 */}
                  <div className="bg-card border border-border/60 shadow-xl rounded-2xl p-5 flex items-start gap-4 transform transition-transform hover:-translate-y-2 hover:shadow-2xl z-30 relative ml-0 sm:ml-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Cpu className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">Engineering Excellence</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Crafting highly scalable, performant technology products using modern frameworks.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-card border border-border/60 shadow-xl rounded-2xl p-5 flex items-start gap-4 transform transition-transform hover:-translate-y-2 hover:shadow-2xl z-20 relative mr-0 sm:mr-8 -mt-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Globe className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">Borderless Delivery</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        A remote-first collective operating worldwide without geographical limitations.
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-card border border-border/60 shadow-xl rounded-2xl p-5 flex items-start gap-4 transform transition-transform hover:-translate-y-2 hover:shadow-2xl z-10 relative ml-0 sm:ml-4 -mt-2">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">Absolute Transparency</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Clear communication and visibility throughout the entire development lifecycle.
                      </p>
                    </div>
                  </div>
                </div>

              </AnimateOnScroll>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Vision ── */}
      <section className="py-16 md:py-20 bg-card/5 border-y border-border/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <AnimateOnScroll className="lg:col-span-1">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Our Vision</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-foreground">
                A Trusted Technology Partner for Modern Businesses
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.15} className="lg:col-span-2">
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                We help businesses access reliable software engineering without the overhead of large in-house teams. Scalable architectures, modern designs, and performance-first development.
              </p>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Approach ── */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimateOnScroll>
            <div className="text-center mb-14">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">How We Work</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground">Our Approach</h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approachSteps.map((item, i) => (
              <AnimateOnScroll key={item.step} delay={i * 0.1}>
                <div className="premium-card p-7 group h-full overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-9 h-9 rounded-lg border border-primary/20 bg-primary/5 flex items-center justify-center mb-5">
                      <span className="text-xs font-bold text-primary">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-heading font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 relative overflow-hidden border-t border-border/20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/8 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold mb-6 text-foreground tracking-tight">
                Ready to build your next{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">digital product?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                Let's discuss how we can help bring your vision to life.
              </p>
              <GradientButton id="about-cta-start-project" href="/contact#contact-form" className="px-12 py-4 text-base font-semibold">
                Start Your Project <ArrowRight className="w-4 h-4 ml-2 inline" />
              </GradientButton>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </div>
  );
}
