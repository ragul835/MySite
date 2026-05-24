import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Search, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";

const categories = ["All", "SaaS", "E-Commerce", "Dashboard", "Web"];

const projects = [
  {
    title: "SaaS Analytics Dashboard",
    description: "A comprehensive real-time analytics platform built for a B2B SaaS company. Features customizable dashboard widgets, live WebSocket data feeds, team workspaces, and an intelligent alerting engine that reduced incident response time by 60%.",
    tags: ["React", "Node.js", "PostgreSQL", "WebSockets", "Redis"],
    gradient: "from-blue-600/30 via-indigo-600/20 to-violet-600/10",
    pattern: "radial-gradient(circle at 30% 40%, hsl(217 91% 60% / 0.3) 0%, transparent 60%)",
    category: "SaaS",
  },
  {
    title: "E-Commerce Platform",
    description: "A full-featured multi-vendor marketplace with Stripe payment processing, real-time inventory management, and a blazing-fast checkout flow that improved conversion by 34%. Built to handle thousands of concurrent users.",
    tags: ["Next.js", "Stripe", "MongoDB", "Redis", "AWS S3"],
    gradient: "from-emerald-600/30 via-teal-600/20 to-cyan-600/10",
    pattern: "radial-gradient(circle at 70% 60%, hsl(160 84% 39% / 0.3) 0%, transparent 60%)",
    category: "E-Commerce",
  },
  {
    title: "Enterprise CRM Dashboard",
    description: "A powerful customer relationship management system for a 200-person sales team. Includes pipeline tracking, automated follow-up sequences, territory management, and deep CRM analytics that increased deal close rates by 28%.",
    tags: ["React", "Spring Boot", "MySQL", "JWT", "Chart.js"],
    gradient: "from-orange-600/30 via-amber-600/20 to-yellow-600/10",
    pattern: "radial-gradient(circle at 50% 30%, hsl(25 95% 53% / 0.3) 0%, transparent 60%)",
    category: "Dashboard",
  },
  {
    title: "Service Booking Platform",
    description: "An intelligent scheduling engine for a national service business. Features dynamic availability management, automated SMS/email reminders via Twilio, Google Calendar sync, and a customer self-service portal.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Twilio", "Google API"],
    gradient: "from-rose-600/30 via-pink-600/20 to-fuchsia-600/10",
    pattern: "radial-gradient(circle at 40% 70%, hsl(330 81% 60% / 0.3) 0%, transparent 60%)",
    category: "Web",
  },
  {
    title: "Agency Marketing Website",
    description: "A high-converting marketing website for a creative agency. Immersive scroll animations, 3D hero section, case study showcases, and a contact flow that improved lead capture by 45%. Scores 98/100 on Lighthouse.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite", "Vercel"],
    gradient: "from-violet-600/30 via-purple-600/20 to-indigo-600/10",
    pattern: "radial-gradient(circle at 60% 40%, hsl(270 81% 60% / 0.3) 0%, transparent 60%)",
    category: "Web",
  },
];

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description: "We audit your requirements, constraints, and goals. No assumptions — just deep listening and sharp questions.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Design",
    description: "Architecture, wireframes, and a clear technical spec. You approve before a single line of production code is written.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Development",
    description: "Iterative sprints with weekly demos. You see real progress, real software — not slide decks.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Deployment",
    description: "Zero-downtime launches, monitoring setup, and a 30-day post-launch support window. We ship — and we stay.",
  },
];

export default function SolutionsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
          <motion.div
            className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, hsl(270 81% 60%) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
                  Solutions
                  <span className="absolute -inset-x-4 -inset-y-2 bg-secondary/20 blur-3xl opacity-0 animate-[pulse_4s_ease-in-out_infinite] mix-blend-screen -z-10" />
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed border-l-4 border-secondary/30 pl-6 max-w-2xl">
                Products we've built and shipped — with real outcomes, real technology, and real constraints.
              </p>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Project Showcase */}
      <section className="py-16">
        <Container>
          <AnimateOnScroll>
            <SectionHeader title="Case Studies" subtitle="Every project has a story. Here's ours." />
          </AnimateOnScroll>

          {/* Filter Tabs */}
          <AnimateOnScroll>
            <div className="flex flex-wrap justify-center gap-3 mb-12" data-testid="filter-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-testid={`filter-tab-${cat.toLowerCase()}`}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium border transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-white border-primary"
                      : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Project Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filtered.map((project, i) => (
                <div
                  key={project.title}
                  data-testid={`card-project-detail-${i}`}
                  className="group rounded-2xl border border-border/50 bg-card/50 overflow-hidden"
                >
                  <div
                    className="h-64 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500"
                    style={{ background: `linear-gradient(135deg, ${project.gradient})` }}
                  >
                    <div className="absolute inset-0" style={{ backgroundImage: project.pattern }} />
                    <div
                      className="absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage: "radial-gradient(circle, hsl(0 0% 98%) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    
                    {/* Abstract Floating UI Wireframe */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 opacity-80 transition-opacity duration-500 group-hover:opacity-100">
                      <motion.div 
                        className="w-full h-full max-w-[80%] max-h-[80%] rounded-xl border border-white/20 bg-background/20 backdrop-blur-md shadow-2xl p-4 flex flex-col gap-3 relative overflow-hidden"
                        whileHover={{ y: -5, rotateX: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                         <div className="flex items-center gap-2 mb-2">
                           <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                           <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                           <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                         </div>
                         <div className="flex gap-3 h-full">
                           <div className="w-1/3 rounded-lg bg-white/10 h-full border border-white/5" />
                           <div className="w-2/3 flex flex-col gap-3 h-full">
                             <div className="w-full h-1/3 rounded-lg bg-white/10 border border-white/5" />
                             <div className="w-full h-2/3 rounded-lg bg-white/10 border border-white/5" />
                           </div>
                         </div>
                         <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                      </motion.div>
                    </div>

                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-background/60 backdrop-blur-md border border-white/20 shadow-sm text-foreground">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 z-10 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold shadow-lg">
                        View Case Study
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
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
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
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
                      
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="relative w-28 h-28 md:w-32 md:h-32 rounded-[2rem] bg-card/60 backdrop-blur-xl border border-border/50 shadow-2xl flex items-center justify-center overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Icon className="w-12 h-12 text-primary relative z-10" />
                        
                        {/* Glowing orb behind icon */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 bg-primary/20 blur-xl rounded-full" />
                        </div>
                      </motion.div>
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
                </motion.div>
              );
            })}
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
        <motion.div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
                href="mailto:ragulsiva@zohomail.in"
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
