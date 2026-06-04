import { Link } from "wouter";
import { ChevronRight, Search, Map, PenTool, Code2, CheckCircle, Rocket, HeartHandshake, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";



const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description: "We audit your requirements, constraints, and goals. No assumptions — just deep listening and sharp questions.",
  },
  {
    icon: Map,
    step: "02",
    title: "Planning",
    description: "Creating a detailed roadmap and project architecture to ensure smooth execution from start to finish.",
  },
  {
    icon: PenTool,
    step: "03",
    title: "Design",
    description: "Architecture, wireframes, and a clear technical spec. You approve before a single line of production code is written.",
  },
  {
    icon: Code2,
    step: "04",
    title: "Development",
    description: "Iterative sprints with weekly demos. You see real progress, real software — not slide decks.",
  },
  {
    icon: CheckCircle,
    step: "05",
    title: "Testing",
    description: "Rigorous QA and automated testing to ensure everything works perfectly across all devices and scenarios.",
  },
  {
    icon: Rocket,
    step: "06",
    title: "Deployment",
    description: "Zero-downtime launches, monitoring setup, and a smooth transition to the live environment.",
  },
  {
    icon: HeartHandshake,
    step: "07",
    title: "Support",
    description: "Providing ongoing maintenance, monitoring, and updates. We ship — and we stay to support your growth.",
  },
];

export default function SolutionsPage() {
  useDocumentTitle(
    "Solutions & Capabilities | NexCore",
    "Custom digital solutions engineered for scale and performance. Discover our process: Discovery, Design, Development, and Deployment."
  );

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-background" />
        
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
            className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, hsl(270 81% 60%) 0%, transparent 70%)" }}
          />
        </div>

        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium mb-8">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Solutions</span>
            </div>
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter leading-[1.05] mb-8 text-foreground">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondary via-primary/80 to-primary relative">
                  Capabilities
                  <span className="absolute -inset-x-4 -inset-y-2 bg-secondary/20 blur-3xl opacity-0 animate-[pulse_4s_ease-in-out_infinite] mix-blend-screen -z-10" />
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed border-l-4 border-secondary/30 pl-6 max-w-2xl">
                Custom digital solutions engineered for scale and performance, tailored precisely to your business needs.
              </p>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>



      {/* Process Section - Premium Redesign */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="absolute -left-40 top-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-60" />
        <div className="absolute -right-40 bottom-40 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none opacity-60" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        
        <Container className="relative z-10">
          <AnimateOnScroll>
            <SectionHeader
              title="How We Work"
              subtitle="A clear, predictable process with no black boxes and no surprises."
            />
          </AnimateOnScroll>

          <div className="mt-20 max-w-5xl mx-auto">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 !== 0;
              return (
                <div
                  key={step.step}
                  data-testid={`step-process-${i}`}
                  className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 md:mb-32 last:mb-0"
                >
                  {/* Connecting Line (Desktop) */}
                  {i !== steps.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 top-[60%] w-px h-[100%] bg-gradient-to-b from-primary/30 to-transparent -translate-x-1/2" />
                  )}

                  {/* Icon & Number Side */}
                  <div className={`w-full md:w-1/2 flex justify-center relative order-1 ${isEven ? 'md:justify-start md:order-2' : 'md:justify-end'}`}>
                    <div className="relative">
                      {/* Massive background number */}
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[16rem] font-black text-primary/5 select-none pointer-events-none font-heading">
                        {step.step}
                      </span>
                      
                      <div
                        className="relative w-28 h-28 md:w-32 md:h-32 rounded-[2rem] bg-card/60 backdrop-blur-xl border border-border/50 shadow-2xl flex items-center justify-center overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Icon className="w-12 h-12 text-primary relative z-10" />
                        
                        {/* Glowing orb behind icon */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 bg-primary/20 blur-xl rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`w-full md:w-1/2 order-2 text-center ${isEven ? 'md:order-1 md:text-right' : 'md:text-left'}`}>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-wider mb-4 mx-auto ${isEven ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'}`}>
                      STEP {step.step}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className={`text-muted-foreground text-lg leading-relaxed max-w-md mx-auto ${isEven ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Industries Section */}
      <section className="py-24 relative bg-muted/30 border-y border-border/30">
        <Container>
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
                Domain Expertise
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 tracking-tight">
                Industries We Serve
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We apply core software engineering principles across diverse verticals, solving domain-specific challenges with universal technical excellence.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "SaaS & Startups",
                description: "Rapid iteration, multi-tenant architectures, and scalable billing systems built for exponential user growth.",
              },
              {
                name: "E-Commerce & Retail",
                description: "High-conversion, lightning-fast headless storefronts and custom inventory management platforms.",
              },
              {
                name: "FinTech & Financial",
                description: "Secure, high-throughput systems designed to handle financial data and transactions with zero margin for error.",
              },
              {
                name: "Healthcare & MedTech",
                description: "Data-dense applications that prioritize patient privacy, complex provider workflows, and strict compliance.",
              }
            ].map((industry) => (
              <AnimateOnScroll key={industry.name}>
                <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group h-full">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(0 0% 98%) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)" }}
        />

        <Container className="relative z-10 text-center">
          <AnimateOnScroll>
            <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              Ready to start?
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 tracking-tight">
              Let's Build Your Next{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Success Story
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Every great product starts with a conversation. Tell us about your project and we'll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GradientButton href="/contact#contact-form" className="px-12 py-4 text-base">
                Start a Conversation <ArrowRight className="w-5 h-5 ml-2 inline-block" />
              </GradientButton>
              <a
                href="mailto:contact@nexcore.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                or email us directly →
              </a>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </main>
  );
}
