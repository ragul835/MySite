import { useRef, useEffect } from "react";
import { useInView, useSpring, useTransform, motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle, ChevronRight, Shield, Zap, Target, Cpu } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const values = [
  "Build Lean — ship the simplest thing that works, then improve.",
  "Avoid Premature Complexity — no abstractions without a clear use case.",
  "Prioritize Delivery Speed — a working product beats a perfect one in planning.",
  "Scale Gradually — design for current needs with a clear path forward.",
];

const philosophyCards = [
  {
    icon: Shield,
    title: "Focus on Maintainability",
    description: "Code is read far more often than it's written. We optimize for clarity, consistency, and long-term team velocity.",
  },
  {
    icon: Target,
    title: "Separate Concerns Properly",
    description: "Clean boundaries between layers — UI, business logic, and data — make systems easier to test, extend, and hand off.",
  },
  {
    icon: Cpu,
    title: "Modular Monolith First",
    description: "We start with well-structured monoliths before reaching for microservices. The architecture earns its complexity.",
  },
  {
    icon: Zap,
    title: "Budget-Friendly Without Compromise",
    description: "Professional engineering doesn't require enterprise budgets. We help startups move fast without accruing crippling technical debt.",
  },
];



export default function AboutPage() {
  useDocumentTitle(
    "About Us | NexCore",
    "An elite, focused engineering team that punches above its weight class. Learn about our mission, values, and engineering philosophy."
  );

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
        
        {/* Premium Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[-20%] right-[10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)" }}
          />
        </div>

        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium mb-8">
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span>About Us</span>
            </div>
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter leading-[1.05] mb-8 text-foreground">
                About <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-secondary relative">
                  Us
                  <span className="absolute -inset-x-4 -inset-y-2 bg-primary/20 blur-3xl opacity-0 animate-[pulse_4s_ease-in-out_infinite] mix-blend-screen -z-10" />
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed border-l-4 border-primary/30 pl-6 max-w-2xl">
                An elite, focused engineering team that punches well above its weight class.
              </p>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll>
              <div>
                <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
                  Our Mission
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-6">
                  Lean engineering for businesses that move fast
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                  We believe great software is the result of clear thinking, disciplined execution, and an obsessive focus on what actually matters. We're not here to build monuments — we're here to ship products that work, products that scale, and products that your customers love.
                </p>
                <ul className="space-y-4">
                  {values.map((value) => (
                    <li key={value} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              {/* Premium Floating Architecture Visual */}
              <div className="relative h-96 lg:h-[500px] w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 rounded-full blur-3xl opacity-50" />
                
                {/* Main Central Card */}
                <div 
                  className="relative z-20 w-64 h-80 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-2xl p-6 flex flex-col justify-between overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-10 -mt-10" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                      </div>
                      <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
                        <Cpu className="w-3.5 h-3.5 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-3/4 bg-primary/20 rounded-full" />
                      <div className="h-2 w-full bg-border/50 rounded-full" />
                      <div className="h-2 w-5/6 bg-border/50 rounded-full" />
                      <div className="h-2 w-4/6 bg-border/50 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="mt-auto space-y-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-primary">System Core</span>
                      </div>
                      <div className="h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Left Card */}
                <div 
                  className="absolute left-0 lg:left-4 z-10 w-48 h-56 rounded-2xl bg-card/60 backdrop-blur-md border border-border/40 shadow-xl p-5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="h-2 w-16 bg-border/60 rounded-full" />
                  </div>
                  <div className="space-y-2 mt-8">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full ${i % 2 === 0 ? 'bg-secondary/40 w-full' : 'bg-border/40 w-4/5'}`} />
                    ))}
                  </div>
                </div>

                {/* Floating Right Card */}
                <div 
                  className="absolute right-0 lg:right-4 z-30 w-52 h-48 rounded-2xl bg-card/60 backdrop-blur-md border border-border/40 shadow-xl p-5"
                >
                  <div className="w-full h-24 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/10 mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, hsl(217 91% 60% / 0.4) 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
                    <Target className="w-8 h-8 text-primary relative z-10" />
                  </div>
                  <div className="h-2 w-24 bg-border/60 rounded-full mx-auto" />
                </div>
                
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Engineering Philosophy */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />
        <Container>
          <AnimateOnScroll>
            <SectionHeader
              title="Engineering Philosophy"
              subtitle="The principles that guide every line of code we write."
            />
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {philosophyCards.map((card) => {
                const Icon = card.icon;
                return (
                  <AnimatedItem key={card.title}>
                    <div
                      data-testid={`card-philosophy-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </AnimatedItem>
                );
              })}
            </div>
          </AnimateOnScroll>
        </Container>
      </section>



      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden border-t border-border/20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-background pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-foreground tracking-tight">
                Ready to build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">extraordinary?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Let's discuss how our engineering team can help bring your vision to life. No strings attached, just an honest conversation about your product.
              </p>
              <GradientButton href="/contact#contact-form" className="px-12 py-5 text-lg font-semibold shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all">
                Work With Us
              </GradientButton>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </main>
  );
}
