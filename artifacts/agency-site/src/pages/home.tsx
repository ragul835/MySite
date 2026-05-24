import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import {
  Code2, ShoppingCart, Layers, Palette, Search, ShoppingBag,
  ArrowRight, CheckCircle, Shield, Cpu, Zap, Plus, Minus
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiSpringboot, SiPython, SiFastapi, SiNestjs,
  SiPostgresql, SiMysql, SiMongodb,
  SiVercel, SiGit, SiGithub, SiFigma, SiGooglecloud, SiDocker,
  SiHtml5, SiJavascript
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
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
      { name: "HTML5", Icon: SiHtml5 },
      { name: "JavaScript", Icon: SiJavascript },
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
      { name: "AWS", Icon: FaAws },
      { name: "GCP", Icon: SiGooglecloud },
      { name: "Vercel", Icon: SiVercel },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Figma", Icon: SiFigma },
      { name: "Docker", Icon: SiDocker },
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
    <section className="relative overflow-hidden pt-28 lg:pt-36 pb-16 lg:pb-24 flex flex-col items-center text-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        {/* Massive glow */}
        <motion.div
          className="absolute top-[10%] w-[800px] h-[800px] rounded-full opacity-[0.15] blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 60%)" }}
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 w-[1000px] h-[400px] rounded-[100%] opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse at bottom, hsl(270 81% 60%) 0%, transparent 70%)" }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,hsl(var(--foreground)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.2)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_80%,transparent_100%)]" />

        {/* Floating Icons */}
        <motion.div
          className="absolute top-[15%] left-[5%] md:left-[15%] text-primary/20 blur-[2px]"
          animate={{ y: [0, -30, 0], rotate: [0, 15, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <SiReact className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] right-[5%] md:right-[15%] text-blue-500/20 blur-[2px]"
          animate={{ y: [0, 40, 0], rotate: [0, -20, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <SiNextdotjs className="w-20 h-20 md:w-32 md:h-32" />
        </motion.div>
        <motion.div
          className="absolute top-[35%] right-[10%] md:right-[20%] text-indigo-500/20 blur-[1px]"
          animate={{ y: [0, -25, 0], rotate: [0, 25, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <SiTypescript className="w-12 h-12 md:w-20 md:h-20" />
        </motion.div>
        <motion.div
          className="absolute bottom-[25%] left-[10%] md:left-[25%] text-purple-500/20 blur-[1px]"
          animate={{ y: [0, 25, 0], rotate: [0, -15, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <SiTailwindcss className="w-14 h-14 md:w-20 md:h-20" />
        </motion.div>
        <motion.div
          className="absolute top-[10%] right-[35%] text-red-500/15 blur-[2px]"
          animate={{ y: [0, 30, 0], rotate: [0, -15, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <FaJava className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>
        <motion.div
          className="absolute bottom-[10%] right-[40%] text-green-500/15 blur-[2px]"
          animate={{ y: [0, -40, 0], rotate: [0, 20, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        >
          <SiSpringboot className="w-20 h-20 md:w-28 md:h-28" />
        </motion.div>
        <motion.div
          className="absolute top-[40%] left-[30%] text-blue-400/15 blur-[3px]"
          animate={{ y: [0, 20, 0], rotate: [0, 10, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <SiPostgresql className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>
        
        {/* Additional Hero Icons */}
        <motion.div
          className="absolute top-[25%] left-[45%] text-green-600/15 blur-[2px]"
          animate={{ y: [0, -25, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <SiNodedotjs className="w-14 h-14 md:w-20 md:h-20" />
        </motion.div>
        <motion.div
          className="absolute bottom-[35%] right-[25%] text-blue-500/15 blur-[1px]"
          animate={{ y: [0, 30, 0], rotate: [0, -15, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <SiPython className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>
        <motion.div
          className="absolute top-[5%] left-[25%] text-blue-600/15 blur-[2px]"
          animate={{ y: [0, 20, 0], rotate: [0, 20, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <SiMysql className="w-12 h-12 md:w-20 md:h-20" />
        </motion.div>
        <motion.div
          className="absolute bottom-[5%] left-[40%] text-pink-500/15 blur-[3px]"
          animate={{ y: [0, -30, 0], rotate: [0, -10, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <SiFigma className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>
      </div>

      <Container className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-sm shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
          Elite Engineering
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tighter leading-[1.05] mb-8 text-foreground text-center"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <span className="relative">
            We Build <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/90 to-secondary relative">
              SaaS <br className="hidden md:block" />& Web Apps
              <span className="absolute -inset-x-4 -inset-y-2 bg-primary/20 blur-3xl opacity-0 animate-[pulse_4s_ease-in-out_infinite] mix-blend-screen -z-10" />
            </span>
          </span>
          <span className="relative block mt-2 text-foreground/90">
             That Scale Without
          </span>
          <span className="relative bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent block mt-1">
            the Overhead
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          NexCore is a small, senior dev team trusted by 50+ startups and companies globally as an end-to-end Engineering Partner. We build bulletproof digital products with zero technical debt.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GradientButton href="/contact#contact-form" className="px-10 py-4 text-base font-semibold shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all">
            Get a Free Project Estimate <ArrowRight className="w-5 h-5 ml-2 inline-block" />
          </GradientButton>
          
          <Link href="/solutions">
            <button className="group flex items-center gap-2 px-8 py-4 text-base font-semibold border border-border/80 bg-background/50 backdrop-blur-md rounded-lg text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all">
              See Our Work 
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>

        {/* New Stat Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-border/40 text-sm font-medium w-full max-w-3xl"
        >
          <motion.div whileHover={{ scale: 1.1, y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="flex flex-col items-center gap-1.5 cursor-default">
             <span className="text-3xl font-bold text-slate-900">14ms</span>
             <span className="text-slate-500 uppercase text-[10px] tracking-widest font-semibold">Average Latency</span>
          </motion.div>
          <div className="w-px h-12 bg-border/50 hidden md:block" />
          <motion.div whileHover={{ scale: 1.1, y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="flex flex-col items-center gap-1.5 cursor-default">
             <span className="text-3xl font-bold text-slate-900">99.99%</span>
             <span className="text-slate-500 uppercase text-[10px] tracking-widest font-semibold">Active Uptime</span>
          </motion.div>
          <div className="w-px h-12 bg-border/50 hidden md:block" />
          <motion.div whileHover={{ scale: 1.1, y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="flex flex-col items-center gap-1.5 cursor-default">
             <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text">100/100</span>
             <span className="text-slate-500 uppercase text-[10px] tracking-widest font-semibold">Perfect Lighthouse</span>
          </motion.div>
        </motion.div>
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
                    whileHover="hover"
                    variants={{
                      hover: { y: -4, boxShadow: "0 0 0 1px hsl(var(--primary) / 0.4), 0 20px 40px hsl(var(--primary) / 0.1)" }
                    }}
                    transition={{ duration: 0.2 }}
                    data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group p-8 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-2xl relative overflow-hidden cursor-default h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                      variants={{
                        hover: { rotate: [0, -10, 10, -10, 0], scale: 1.1, transition: { duration: 0.5 } }
                      }}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
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
                      <motion.div
                        key={tech.name}
                        whileHover={{ scale: 1.05, y: -4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        data-testid={`badge-tech-${tech.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center gap-3 px-6 py-3.5 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_8px_30px_-4px_hsl(var(--primary)/0.3)] transition-colors group cursor-default relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <TechIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
                        <span className="text-sm font-medium text-foreground relative z-10">{tech.name}</span>
                      </motion.div>
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
                    <motion.div
                      className="absolute inset-0"
                      style={{ backgroundImage: project.pattern, backgroundSize: "200% 200%" }}
                      animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10" />
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

      {/* Floating Icons */}
      <motion.div
        className="absolute top-20 left-[10%] text-primary/30 blur-[1px]"
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Code2 className="w-16 h-16" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-[15%] text-secondary/30 blur-[1px]"
        animate={{ y: [0, 30, 0], rotate: [0, -15, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Zap className="w-20 h-20" />
      </motion.div>
      <motion.div
        className="absolute top-40 right-[25%] text-primary/20 blur-[2px]"
        animate={{ y: [0, -25, 0], rotate: [0, 20, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Cpu className="w-12 h-12" />
      </motion.div>

      <motion.div
        className="absolute top-32 left-[25%] text-orange-500/20 blur-[1px]"
        animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <FaAws className="w-16 h-16" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-[15%] text-blue-400/20 blur-[2px]"
        animate={{ y: [0, 25, 0], rotate: [0, -20, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <SiGooglecloud className="w-20 h-20" />
      </motion.div>
      <motion.div
        className="absolute top-20 right-[15%] text-blue-600/20 blur-[1px]"
        animate={{ y: [0, -30, 0], rotate: [0, 15, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <SiDocker className="w-16 h-16" />
      </motion.div>

      {/* Additional CTA Icons */}
      <motion.div
        className="absolute bottom-10 right-[35%] text-red-600/20 blur-[2px]"
        animate={{ y: [0, 25, 0], rotate: [0, -20, 10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <SiNestjs className="w-14 h-14" />
      </motion.div>
      <motion.div
        className="absolute top-10 left-[40%] text-teal-500/20 blur-[2px]"
        animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      >
        <SiFastapi className="w-16 h-16" />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-[5%] text-slate-500/20 blur-[1px]"
        animate={{ y: [0, 30, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <SiGithub className="w-20 h-20" />
      </motion.div>
      <motion.div
        className="absolute top-32 right-[5%] text-white/20 blur-[2px]"
        animate={{ y: [0, -25, 0], rotate: [0, -15, 20, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
      >
        <SiVercel className="w-16 h-16" />
      </motion.div>

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
          <GradientButton href="/contact#contact-form" className="px-12 py-4 text-base">
            Get In Touch
          </GradientButton>
          <p className="mt-6 text-sm text-muted-foreground">
            Or email us directly at{" "}
            <a href="mailto:ragulsiva@zohomail.in" className="text-primary hover:underline">
              ragulsiva@zohomail.in
            </a>
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── FAQ Section ─── */

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "General",
    question: "What does NexCore do?",
    answer:
      "NexCore is a senior engineering team that acts as your end-to-end technology partner. We design, build, and scale web applications, SaaS platforms, e-commerce stores, and custom software solutions — from concept to production and beyond.",
  },
  {
    category: "General",
    question: "Who is NexCore a good fit for?",
    answer:
      "We work best with startups, growing businesses, and enterprise teams that need high-quality engineering execution without the overhead of building an in-house team. If you have a product vision and need a reliable team to bring it to life, we're the right choice.",
  },
  {
    category: "General",
    question: "Where is your team located?",
    answer:
      "Our core team is based in India, and we work with clients globally. We overlap with US, European, and APAC time zones and adapt our communication schedule to your needs.",
  },
  {
    category: "Process",
    question: "What does your development process look like?",
    answer:
      "We follow an agile, sprint-based workflow. Every project begins with a discovery phase where we define scope, architecture, and milestones. From there, we work in 1–2 week sprints with regular demos, code reviews, and transparent progress updates. You'll always know where things stand.",
  },
  {
    category: "Process",
    question: "How long does a typical project take?",
    answer:
      "It depends on scope and complexity. A marketing website or landing page typically takes 2–4 weeks. A full SaaS MVP takes 8–14 weeks. Complex enterprise platforms can be 3–6+ months. We'll give you an honest timeline estimate during our initial consultation.",
  },
  {
    category: "Process",
    question: "Do you provide project management?",
    answer:
      "Yes. Every project gets a dedicated point of contact who handles communication, sprint planning, and progress reporting. We use modern project management tools so you have full visibility into tasks, timelines, and deliverables.",
  },
  {
    category: "Technical",
    question: "What technologies do you work with?",
    answer:
      "We use a modern, battle-tested stack: React, Next.js, and TypeScript on the frontend; Node.js, NestJS, Spring Boot, Python, and FastAPI on the backend; PostgreSQL, MySQL, and MongoDB for databases; and AWS, GCP, and Vercel for cloud deployment. We pick the right tool for each project — no cargo culting.",
  },
  {
    category: "Technical",
    question: "Can you work with our existing codebase?",
    answer:
      "Absolutely. We regularly take over, refactor, and extend existing projects. We'll start with a thorough code audit to understand the current state, identify technical debt, and create a roadmap for improvement — all before writing a single line of code.",
  },
  {
    category: "Technical",
    question: "Do you handle deployment and DevOps?",
    answer:
      "Yes. We set up CI/CD pipelines, containerized deployments with Docker, infrastructure as code, monitoring, and alerting. We ensure your application runs reliably at scale with 99.99% uptime targets.",
  },
  {
    category: "Pricing",
    question: "How much does a project cost?",
    answer:
      "Pricing varies based on scope, complexity, and timeline. We offer both fixed-price projects for well-defined scopes and time-and-materials engagements for evolving products. Reach out for a free, no-obligation project estimate — we'll give you a transparent breakdown.",
  },
  {
    category: "Pricing",
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes. After launch, we offer flexible maintenance and support plans that include bug fixes, performance monitoring, security patches, feature updates, and on-call support. We're partners, not just contractors.",
  },
  {
    category: "Pricing",
    question: "Is there a minimum project size?",
    answer:
      "We generally work on projects starting from $5,000. This ensures we can deliver meaningful value and maintain our quality standards. For smaller tasks, we can discuss hourly consulting arrangements.",
  },
];

const faqCategories = ["All", ...Array.from(new Set(faqData.map((f) => f.category)))];

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <AnimatedItem>
      <motion.div
        className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
          isOpen
            ? "border-primary/40 bg-primary/[0.03] shadow-[0_0_30px_hsl(var(--primary)/0.08)]"
            : "border-border/50 bg-card/30 hover:border-border/80 hover:bg-card/50"
        }`}
        layout
      >
        <button
          onClick={onToggle}
          data-testid={`faq-toggle-${index}`}
          className="w-full flex items-start gap-4 p-6 md:p-7 text-left cursor-pointer"
        >
          <span
            className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              isOpen
                ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                : "bg-muted/80 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-base md:text-lg font-heading font-semibold transition-colors ${
                isOpen ? "text-foreground" : "text-foreground/90"
              }`}
            >
              {item.question}
            </h3>
          </div>

          <span
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? "bg-primary/15 text-primary rotate-0"
                : "bg-muted/60 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            }`}
          >
            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="px-6 md:px-7 pb-6 md:pb-7 pl-[4.25rem] md:pl-[4.75rem]">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatedItem>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? faqData
      : faqData.filter((f) => f.category === activeCategory);

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />
      <Container>
        <AnimateOnScroll>
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about working with NexCore."
          />
        </AnimateOnScroll>

        <div className="max-w-4xl mx-auto">
          {/* Category filter pills */}
          <AnimateOnScroll>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(null);
                  }}
                  data-testid={`faq-filter-${cat.toLowerCase()}`}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                      : "border border-border/50 bg-card/30 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span className="ml-1.5 opacity-60">
                      ({faqData.filter((f) => f.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </AnimateOnScroll>

          {/* FAQ items */}
          <AnimateOnScroll stagger>
            <motion.div className="space-y-4" layout>
              {filtered.map((item, i) => {
                const originalIndex = faqData.indexOf(item);
                return (
                  <FAQAccordionItem
                    key={item.question}
                    item={item}
                    index={originalIndex}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                );
              })}
            </motion.div>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <HeroSection />
      <ServicesSection />
      <TechStackSection />
      <SolutionsSection />
      <FAQSection />
      <ContactCTASection />
    </motion.main>
  );
}
