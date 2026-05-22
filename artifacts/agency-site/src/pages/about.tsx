import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle, ChevronRight, Shield, Zap, Target, Cpu } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";

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

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Technologies Mastered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 2, suffix: "x", label: "Faster Delivery" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="text-5xl font-heading font-bold text-foreground">
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          initial={{ innerHTML: "0" } as any}
          animate={isInView ? { innerHTML: String(target) } as any : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          onUpdate={(latest: any) => {
            if (ref.current) {
              const val = Math.round(Number(latest.innerHTML ?? 0));
              ref.current.textContent = String(val);
            }
          }}
        >
          0
        </motion.span>
      </motion.span>
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative py-24 overflow-hidden border-b border-border/30">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(217 91% 60% / 0.2) 0%, transparent 60%)" }}
        />
        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">About</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-6">
              About Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A small, focused engineering team that punches well above its weight class.
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-24">
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
              {/* Decorative geometric pattern */}
              <div className="relative h-80 lg:h-full min-h-72">
                <div className="absolute inset-0 rounded-3xl border border-border/50 bg-card/30 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: `
                        linear-gradient(hsl(220 13% 88%) 1px, transparent 1px),
                        linear-gradient(90deg, hsl(220 13% 88%) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background: "radial-gradient(ellipse at 50% 50%, hsl(217 91% 60% / 0.15) 0%, transparent 70%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-6 p-8">
                      {[...Array(9)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-12 h-12 rounded-xl border border-border/60 bg-card/50 flex items-center justify-center"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                        >
                          <div className="w-3 h-3 rounded-full bg-primary/60" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Engineering Philosophy */}
      <section className="py-24 relative">
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

      {/* Stats Section */}
      <section className="py-24">
        <Container>
          <AnimateOnScroll>
            <SectionHeader title="By the Numbers" subtitle="Results speak louder than promises." />
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <AnimatedItem key={stat.label}>
                  <div
                    data-testid={`card-stat-${i}`}
                    className="p-8 rounded-2xl border border-border/50 bg-card/50 text-center"
                  >
                    <CountUp target={stat.value} suffix={stat.suffix} />
                    <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
                  </div>
                </AnimatedItem>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll className="text-center mt-16">
            <GradientButton href="/contact" className="px-10 py-4">
              Work With Us
            </GradientButton>
          </AnimateOnScroll>
        </Container>
      </section>
    </main>
  );
}
