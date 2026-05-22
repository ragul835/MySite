import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Search, PenTool, Code2, Rocket } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";

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
              <span className="text-foreground">Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-6">
              Our Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Products we've built and shipped — with real outcomes, real technology, and real constraints.
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Project Showcase */}
      <section className="py-24">
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
                    className="h-56 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${project.gradient})` }}
                  >
                    <div className="absolute inset-0" style={{ backgroundImage: project.pattern }} />
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage: "radial-gradient(circle, hsl(0 0% 98%) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/40 backdrop-blur-sm border border-white/10 text-foreground">
                        {project.category}
                      </span>
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

      {/* Process Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />
        <Container>
          <AnimateOnScroll>
            <SectionHeader
              title="How We Work"
              subtitle="A clear, predictable process with no black boxes and no surprises."
            />
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="relative">
              {/* Connecting line — desktop only */}
              <div className="hidden lg:block absolute top-16 left-[calc(12.5%+0px)] right-[calc(12.5%+0px)] h-px bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      data-testid={`step-process-${i}`}
                      className="text-center relative"
                    >
                      <div className="relative inline-block mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/40 flex items-center justify-center mx-auto">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </main>
  );
}
