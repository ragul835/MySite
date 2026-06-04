import { Link } from "wouter";
import { useRef, useState, useEffect } from "react";
import {
  Code2, ShoppingCart, Layers, Palette, Search, ShoppingBag,
  ArrowRight, CheckCircle, Shield, Cpu, Zap, Plus, Minus, Smartphone
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiSpringboot, SiPython, SiFastapi, SiNestjs,
  SiPostgresql, SiMysql, SiMongodb,
  SiVercel, SiGit, SiGithub, SiFigma, SiGooglecloud, SiDocker,
  SiHtml5, SiJavascript, SiStripe
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "High-performance, secure, and scalable custom websites engineered to establish a commanding digital presence and drive measurable business growth.",
  },
  {
    icon: Layers,
    title: "Full Stack Development",
    description: "End-to-end architectures utilizing modern frameworks. We build robust frontends and resilient backend systems designed for complex, high-traffic environments.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    description: "Conversion-optimized online storefronts and custom marketplaces featuring frictionless checkout, secure payment gateways, and advanced inventory management.",
  },
  {
    icon: Zap,
    title: "SaaS Development",
    description: "Scalable, multi-tenant software architectures built from the ground up to support subscription models, complex data structures, and rapid user acquisition.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Intuitive, research-backed interface designs that prioritize frictionless user journeys, stunning aesthetics, and maximum conversion rates.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Data-driven technical SEO and performance optimizations designed to secure top-tier organic rankings and maximize your platform's search visibility.",
  },
  {
    icon: ShoppingBag,
    title: "Shopify Development",
    description: "Tailored Shopify Plus solutions and custom theme architectures that deliver premium shopping experiences and turn browsers into loyal customers.",
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


function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36 pb-16 lg:pb-24 flex flex-col items-center text-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        {/* Massive glow */}
        <div
          className="absolute top-[10%] w-[800px] h-[800px] rounded-full opacity-[0.15] blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 60%)" }}
        />
        <div
          className="absolute bottom-0 w-[1000px] h-[400px] rounded-[100%] opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse at bottom, hsl(270 81% 60%) 0%, transparent 70%)" }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,hsl(var(--foreground)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.2)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_80%,transparent_100%)]" />

        {/* Floating Icons */}
        <div
          className="absolute top-[15%] left-[5%] md:left-[15%] text-primary/20 blur-[2px]"
        >
          <SiReact className="w-16 h-16 md:w-24 md:h-24" />
        </div>
        <div
          className="absolute bottom-[20%] right-[5%] md:right-[15%] text-blue-500/20 blur-[2px]"
        >
          <SiNextdotjs className="w-20 h-20 md:w-32 md:h-32" />
        </div>
        <div
          className="absolute top-[35%] right-[10%] md:right-[20%] text-indigo-500/20 blur-[1px]"
        >
          <SiTypescript className="w-12 h-12 md:w-20 md:h-20" />
        </div>
        <div
          className="absolute bottom-[25%] left-[10%] md:left-[25%] text-purple-500/20 blur-[1px]"
        >
          <SiTailwindcss className="w-14 h-14 md:w-20 md:h-20" />
        </div>
        <div
          className="absolute top-[10%] right-[35%] text-red-500/15 blur-[2px]"
        >
          <FaJava className="w-16 h-16 md:w-24 md:h-24" />
        </div>
        <div
          className="absolute bottom-[10%] right-[40%] text-green-500/15 blur-[2px]"
        >
          <SiSpringboot className="w-20 h-20 md:w-28 md:h-28" />
        </div>
        <div
          className="absolute top-[40%] left-[30%] text-blue-400/15 blur-[3px]"
        >
          <SiPostgresql className="w-16 h-16 md:w-24 md:h-24" />
        </div>
        
        {/* Additional Hero Icons */}
        <div
          className="absolute top-[25%] left-[45%] text-green-600/15 blur-[2px]"
        >
          <SiNodedotjs className="w-14 h-14 md:w-20 md:h-20" />
        </div>
        <div
          className="absolute bottom-[35%] right-[25%] text-blue-500/15 blur-[1px]"
        >
          <SiPython className="w-16 h-16 md:w-24 md:h-24" />
        </div>
        <div
          className="absolute top-[5%] left-[25%] text-blue-600/15 blur-[2px]"
        >
          <SiMysql className="w-12 h-12 md:w-20 md:h-20" />
        </div>
        <div
          className="absolute bottom-[5%] left-[40%] text-pink-500/15 blur-[3px]"
        >
          <SiFigma className="w-16 h-16 md:w-24 md:h-24" />
        </div>
      </div>

      <Container className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Top Badge */}
        <div
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-sm shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
          Elite Engineering
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tighter leading-[1.05] mb-8 text-foreground text-center"
        >
          <span className="relative block">
            Architecting Scalable
          </span>
          <span className="relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block mt-2">
            Web & SaaS Ecosystems
            <span className="absolute -inset-x-4 -inset-y-2 bg-primary/20 blur-3xl opacity-0 animate-[pulse_4s_ease-in-out_infinite] mix-blend-screen -z-10" />
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12"
        >
          We transform complex business challenges into elegant, high-performance digital products. From multi-tenant SaaS architectures to blazing-fast modern web applications, our elite engineering team delivers production-ready software designed to accelerate your growth and outpace the competition.
        </p>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <GradientButton href="/contact#contact-form" className="px-10 py-4 text-base font-semibold shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all">
            Get Free Consultation <ArrowRight className="w-5 h-5 ml-2 inline-block" />
          </GradientButton>
          <Link href="/services">
            <span className="px-10 py-4 text-base font-semibold rounded-full border border-border/50 bg-card/40 hover:bg-card/80 transition-all cursor-pointer">
              View Services
            </span>
          </Link>
        </div>


      </Container>
    </section>
  );
}

function TrustedTechnologiesSection() {
  return (
    <section className="py-12 border-y border-border/40 bg-card/10">
      <Container>
        <AnimateOnScroll>
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
            Technologies We Work With
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 grayscale transition-all duration-500">
            <SiReact className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-[#61DAFB] transition-colors cursor-pointer" title="React" />
            <SiNextdotjs className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-black dark:hover:text-white transition-colors cursor-pointer" title="Next.js" />
            <SiNodedotjs className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-[#339933] transition-colors cursor-pointer" title="Node.js" />
            <SiNestjs className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-[#E0234E] transition-colors cursor-pointer" title="NestJS" />
            <FaJava className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-[#007396] transition-colors cursor-pointer" title="Java" />
            <SiSpringboot className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-[#6DB33F] transition-colors cursor-pointer" title="Spring Boot" />
            <SiPython className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-[#3776AB] transition-colors cursor-pointer" title="Python" />
            <SiFastapi className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-[#009688] transition-colors cursor-pointer" title="FastAPI" />
            <SiPostgresql className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-[#4169E1] transition-colors cursor-pointer" title="PostgreSQL" />
            <SiMysql className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-[#4479A1] transition-colors cursor-pointer" title="MySQL" />
            <SiMongodb className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-[#47A248] transition-colors cursor-pointer" title="MongoDB" />
            <SiGithub className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-black dark:hover:text-white transition-colors cursor-pointer" title="GitHub" />
            <SiDocker className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-[#2496ED] transition-colors cursor-pointer" title="Docker" />
            <FaAws className="w-8 h-8 md:w-10 md:h-10 hover:grayscale-0 hover:text-[#FF9900] transition-colors cursor-pointer" title="AWS" />
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

const whyChooseUs = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Production-ready solutions delivered efficiently.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Built for long-term growth.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Better visibility on Google.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Works perfectly on all devices.",
  },
  {
    icon: Shield,
    title: "Transparent Communication",
    description: "Regular updates during development.",
  },
  {
    icon: CheckCircle,
    title: "Long-Term Support",
    description: "Support after launch.",
  },
];

function WhyChooseSection() {
  return (
    <section className="py-24 relative">
      <Container>
        <AnimateOnScroll>
          <SectionHeader
            title="Why Choose NexCore"
            subtitle="We don't just write code. We build solutions that drive business growth."
          />
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <AnimatedItem key={i}>
                  <div className="p-8 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-2xl h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedItem>
              );
            })}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

const processSteps = [
  { step: "01", title: "Discovery", description: "Understanding your requirements and business goals." },
  { step: "02", title: "Planning", description: "Creating a detailed roadmap and project architecture." },
  { step: "03", title: "Design", description: "Crafting beautiful and intuitive user interfaces." },
  { step: "04", title: "Development", description: "Building the solution using modern technologies." },
  { step: "05", title: "Testing", description: "Ensuring everything works perfectly across devices." },
  { step: "06", title: "Deployment", description: "Launching your project to the live environment." },
  { step: "07", title: "Support", description: "Providing ongoing maintenance and updates." },
];

function DevelopmentProcessSection() {
  return (
    <section className="py-24 bg-card/5">
      <Container>
        <AnimateOnScroll>
          <SectionHeader
            title="Development Process"
            subtitle="A transparent, proven methodology for delivering successful projects."
          />
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((process, i) => (
              <AnimatedItem key={i}>
                <div className="p-6 rounded-2xl border border-border/40 bg-card/30 relative">
                  <div className="text-4xl font-extrabold text-primary/10 mb-4">{process.step}</div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    {process.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {process.description}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </AnimateOnScroll>
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
                  <div
                    data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group p-8 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-2xl relative overflow-hidden cursor-default h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div 
                      className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </AnimatedItem>
              );
            })}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

export function TechStackSection() {
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
                <div
                  className="flex flex-wrap justify-center gap-4"
                >
                  {cat.items.map((tech) => {
                    const TechIcon = tech.Icon;
                    return (
                      <div
                        key={tech.name}
                        data-testid={`badge-tech-${tech.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center gap-3 px-6 py-3.5 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_8px_30px_-4px_hsl(var(--primary)/0.3)] transition-colors group cursor-default relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <TechIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
                        <span className="text-sm font-medium text-foreground relative z-10">{tech.name}</span>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
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
      <div
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)" }}
      />

      {/* Floating Icons */}
      <div
        className="absolute top-20 left-[10%] text-primary/30 blur-[1px]"
      >
        <Code2 className="w-16 h-16" />
      </div>
      <div
        className="absolute bottom-20 right-[15%] text-secondary/30 blur-[1px]"
      >
        <Zap className="w-20 h-20" />
      </div>
      <div
        className="absolute top-40 right-[25%] text-primary/20 blur-[2px]"
      >
        <Cpu className="w-12 h-12" />
      </div>

      <div
        className="absolute top-32 left-[25%] text-orange-500/20 blur-[1px]"
      >
        <FaAws className="w-16 h-16" />
      </div>
      <div
        className="absolute bottom-32 left-[15%] text-blue-400/20 blur-[2px]"
      >
        <SiGooglecloud className="w-20 h-20" />
      </div>
      <div
        className="absolute top-20 right-[15%] text-blue-600/20 blur-[1px]"
      >
        <SiDocker className="w-16 h-16" />
      </div>

      {/* Additional CTA Icons */}
      <div
        className="absolute bottom-10 right-[35%] text-red-600/20 blur-[2px]"
      >
        <SiNestjs className="w-14 h-14" />
      </div>
      <div
        className="absolute top-10 left-[40%] text-teal-500/20 blur-[2px]"
      >
        <SiFastapi className="w-16 h-16" />
      </div>
      <div
        className="absolute bottom-40 left-[5%] text-slate-500/20 blur-[1px]"
      >
        <SiGithub className="w-20 h-20" />
      </div>
      <div
        className="absolute top-32 right-[5%] text-white/20 blur-[2px]"
      >
        <SiVercel className="w-16 h-16" />
      </div>

      <Container className="relative z-10 text-center">
        <AnimateOnScroll>
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
            Let's work together
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 tracking-tight">
            Ready To Build Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Next Project?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Let's discuss your requirements and create a solution tailored to your business.
          </p>
          <GradientButton href="/contact#contact-form" className="px-12 py-4 text-base">
            Get Free Consultation
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
    category: "Pricing",
    question: "How much does a custom project cost?",
    answer: "Project costs vary based on complexity, required features, and the technology stack involved. We don't believe in one-size-fits-all pricing; instead, we conduct a thorough discovery phase to provide you with a transparent, itemized proposal tailored precisely to your business objectives and budget constraints.",
  },
  {
    category: "Process",
    question: "How long does development typically take?",
    answer: "A standard corporate website can take 2–4 weeks, while complex SaaS platforms or custom e-commerce solutions typically range from 8–16 weeks. We use agile methodologies, providing you with weekly updates and continuous access to a staging environment so you can track progress in real time.",
  },
  {
    category: "Process",
    question: "Do you provide ongoing maintenance and support?",
    answer: "Absolutely. We view launch day as the beginning of our partnership. We offer customized Service Level Agreements (SLAs) that include 24/7 uptime monitoring, security patching, continuous performance optimization, and dedicated hours for iterative feature development.",
  },
  {
    category: "Services",
    question: "Can you redesign or scale an existing application?",
    answer: "Yes. Our engineering team specializes in auditing legacy codebases, refactoring outdated architectures into modern, scalable frameworks, and dramatically improving UI/UX. We ensure zero-downtime migrations while significantly boosting Core Web Vitals and conversion rates.",
  },
  {
    category: "Services",
    question: "Do you handle technical SEO and performance?",
    answer: "Performance is a first-class metric in our development process. We implement advanced technical SEO strategies, server-side rendering (SSR), optimized asset delivery, and structured data schemas to ensure your platform passes Core Web Vitals and ranks highly on search engines.",
  }
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
      <div
        className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
          isOpen
            ? "border-primary/40 bg-primary/[0.03] shadow-[0_0_30px_hsl(var(--primary)/0.08)]"
            : "border-border/50 bg-card/30 hover:border-border/80 hover:bg-card/50"
        }`}
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

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-6 md:px-7 pb-6 md:pb-7 pl-[4.25rem] md:pl-[4.75rem]">
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
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
            <div className="space-y-4">
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
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  useDocumentTitle(
    "NexCore | Premium Software Engineering Agency",
    "NexCore is a senior engineering team that builds scalable SaaS platforms, e-commerce stores, and custom web applications. Get a free project estimate."
  );

  return (
    <main
    >
      <HeroSection />
      <TrustedTechnologiesSection />
      <WhyChooseSection />
      <DevelopmentProcessSection />
      <ServicesSection />
      <TechStackSection />

      <FAQSection />
      <ContactCTASection />
    </main>
  );
}
