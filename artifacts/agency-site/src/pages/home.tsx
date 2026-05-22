import { Link } from "wouter";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  Code2, ShoppingCart, Layers, Palette, Search, ShoppingBag,
  ArrowRight, CheckCircle
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiSpringboot, SiPython, SiFastapi, SiNestjs,
  SiPostgresql, SiMysql, SiMongodb,
  SiVercel, SiGit, SiGithub, SiFigma,
} from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";

const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end web applications built with modern frameworks and battle-tested architectures.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    description: "High-converting online stores with seamless payment flows and mobile-first design.",
  },
  {
    icon: Layers,
    title: "SaaS Development",
    description: "Multi-tenant platforms and subscription systems built to scale from day one.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Interfaces that are as beautiful as they are intuitive — designed to convert.",
  },
  {
    icon: Search,
    title: "SEO Services",
    description: "Technical and on-page SEO that drives qualified traffic and measurable growth.",
  },
  {
    icon: ShoppingBag,
    title: "Shopify Development",
    description: "Custom Shopify themes and apps that turn browsers into buyers.",
  },
];

const techCategories = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "React", Icon: SiReact },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "Framer Motion", Icon: SiFramer },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "NestJS", Icon: SiNestjs },
      { name: "Spring Boot", Icon: SiSpringboot },
      { name: "Python", Icon: SiPython },
      { name: "FastAPI", Icon: SiFastapi },
    ],
  },
  {
    id: "database",
    label: "Database",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MySQL", Icon: SiMysql },
      { name: "MongoDB", Icon: SiMongodb },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    items: [
      { name: "Vercel", Icon: SiVercel },
      { name: "Git", Icon: SiGit },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Figma", Icon: SiFigma },
    ],
  },
];

const projects = [
  {
    title: "SaaS Analytics Dashboard",
    description: "Real-time analytics platform with customizable dashboards, live data feeds, and intelligent reporting.",
    tags: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    gradient: "from-blue-600/30 via-indigo-600/20 to-violet-600/10",
    pattern: "radial-gradient(circle at 30% 40%, hsl(217 91% 60% / 0.3) 0%, transparent 60%)",
    category: "SaaS",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-featured online store with Stripe integration, inventory management, and blazing-fast checkout.",
    tags: ["Next.js", "Stripe", "MongoDB", "Redis"],
    gradient: "from-emerald-600/30 via-teal-600/20 to-cyan-600/10",
    pattern: "radial-gradient(circle at 70% 60%, hsl(160 84% 39% / 0.3) 0%, transparent 60%)",
    category: "E-Commerce",
  },
  {
    title: "CRM Dashboard",
    description: "Enterprise customer relationship management system with pipeline tracking and team collaboration.",
    tags: ["React", "Spring Boot", "MySQL", "JWT"],
    gradient: "from-orange-600/30 via-amber-600/20 to-yellow-600/10",
    pattern: "radial-gradient(circle at 50% 30%, hsl(25 95% 53% / 0.3) 0%, transparent 60%)",
    category: "Dashboard",
  },
  {
    title: "Booking Platform",
    description: "Intelligent scheduling engine with availability management, reminders, and calendar sync.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Twilio"],
    gradient: "from-rose-600/30 via-pink-600/20 to-fuchsia-600/10",
    pattern: "radial-gradient(circle at 40% 70%, hsl(330 81% 60% / 0.3) 0%, transparent 60%)",
    category: "Web",
  },
  {
    title: "Agency Landing Page",
    description: "High-converting marketing website with immersive animations and performance-first architecture.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    gradient: "from-violet-600/30 via-purple-600/20 to-indigo-600/10",
    pattern: "radial-gradient(circle at 60% 40%, hsl(270 81% 60% / 0.3) 0%, transparent 60%)",
    category: "Web",
  },
];

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(221 83% 53%) 0%, transparent 70%)" }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(213 94% 68%) 0%, transparent 70%)" }}
          animate={{ x: [0, 15, 0], y: [0, -15, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(0 0% 98%) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Available for new projects
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground tracking-tight leading-[1.05] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We Build{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Scalable
            </span>{" "}
            Digital Products
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From SaaS platforms to e-commerce systems — modern web experiences for startups and growing businesses.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GradientButton href="/solutions" className="px-10 py-4 text-base">
              View Our Work
            </GradientButton>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                data-testid="button-contact-hero"
                className="px-10 py-4 text-base font-semibold border border-border/70 bg-card/30 backdrop-blur-sm rounded-lg text-foreground hover:border-primary/50 hover:text-primary transition-colors"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-20 flex items-center justify-center gap-12 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {["50+ Projects", "15+ Technologies", "98% Satisfaction"].map((stat) => (
              <div key={stat} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                {stat}
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />
      <Container>
        <AnimateOnScroll>
          <SectionHeader
            title="What We Do"
            subtitle="Full-service digital engineering — from strategy to shipping, we own the entire stack."
          />
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <AnimatedItem key={service.title}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 0 0 1px hsl(217 91% 60% / 0.4), 0 20px 40px hsl(217 91% 60% / 0.1)" }}
                    transition={{ duration: 0.2 }}
                    data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm cursor-default h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                </AnimatedItem>
              );
            })}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

function TechStackSection() {
  return (
    <section className="py-24">
      <Container>
        <AnimateOnScroll>
          <SectionHeader
            title="Technologies We Use"
            subtitle="We pick the right tool for the job — no cargo culting, no unnecessary complexity."
          />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList
              className="flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-12 p-0"
              data-testid="tabs-techstack"
            >
              {techCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  data-testid={`tab-tech-${cat.id}`}
                  className="px-6 py-2.5 rounded-full border border-border/50 bg-card/30 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary transition-all text-sm font-medium"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {techCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  {cat.items.map((tech) => {
                    const TechIcon = tech.Icon;
                    return (
                      <div
                        key={tech.name}
                        data-testid={`badge-tech-${tech.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center gap-3 px-6 py-3.5 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-primary/5 transition-all group"
                      >
                        <TechIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium text-foreground">{tech.name}</span>
                      </div>
                    );
                  })}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent pointer-events-none" />
      <Container>
        <AnimateOnScroll>
          <SectionHeader
            title="Our Solutions"
            subtitle="A track record of shipping complex products on time, every time."
          />
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <AnimatedItem key={project.title}>
                <motion.div
                  whileHover="hover"
                  data-testid={`card-project-${i}`}
                  className="group rounded-2xl border border-border/50 bg-card/50 overflow-hidden cursor-default"
                >
                  {/* Image placeholder */}
                  <div
                    className="relative h-52 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${project.gradient})` }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ backgroundImage: project.pattern }}
                    />
                    <div className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: "radial-gradient(circle, hsl(0 0% 98%) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0"
                      variants={{ hover: { opacity: 1 } }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="flex items-center gap-2 text-white font-semibold text-sm bg-background/30 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20">
                        View Project <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/40 backdrop-blur-sm border border-white/10 text-foreground">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-foreground mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="text-center mt-12">
          <Link href="/solutions">
            <motion.button
              whileHover={{ scale: 1.03 }}
              data-testid="button-view-all-solutions"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-border/60 bg-card/30 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
            >
              View All Solutions <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

function ContactCTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(0 0% 2%) 0%, hsl(221 83% 10%) 50%, hsl(217 91% 8%) 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.04]"
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
            Let's work together
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 tracking-tight">
            Ready to Build Something{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Great?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Tell us about your project. We'll respond within 24 hours with a clear plan and an honest assessment.
          </p>
          <GradientButton href="/contact" className="px-12 py-4 text-base">
            Get In Touch
          </GradientButton>
          <p className="mt-6 text-sm text-muted-foreground">
            Or email us directly at{" "}
            <a href="mailto:hello@nexcore.dev" className="text-primary hover:underline">
              hello@nexcore.dev
            </a>
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <TechStackSection />
      <SolutionsSection />
      <ContactCTASection />
    </main>
  );
}
