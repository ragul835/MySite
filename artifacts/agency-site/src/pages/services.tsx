import { Link } from "wouter";
import { useEffect } from "react";
import {
  Code2, ShoppingCart, Layers, Palette, Search, ShoppingBag, Gauge,
  ChevronRight, CheckCircle
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const servicesList = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "We architect and build complete web applications — from pixel-perfect frontends to battle-tested APIs and cloud infrastructure. Our full-stack practice spans the entire delivery lifecycle, with no handoffs between siloed teams.",
    features: [
      "Frontend Development (React, Next.js, TypeScript)",
      "Backend Architecture & REST APIs",
      "Authentication Systems & Security",
      "Cloud Deployment & Infrastructure",
      "Performance Optimization",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    description: "We build online stores engineered for conversion. Every UX decision is backed by commerce best practices — from frictionless checkout flows to SEO-first architecture that drives organic discovery.",
    features: [
      "Custom E-Commerce Websites",
      "Payment Gateway Integration (Stripe, PayPal)",
      "Mobile-Responsive Storefronts",
      "SEO-Friendly Architecture",
      "Performance & Core Web Vitals",
    ],
  },
  {
    icon: Layers,
    title: "SaaS Development",
    description: "Building a SaaS product is a long game. We set you up to win it — with multi-tenant architecture, scalable subscription billing, and dashboards your users will actually want to open.",
    features: [
      "SaaS Platform Architecture",
      "Subscription & Billing Systems",
      "Multi-Tenant Infrastructure",
      "Dashboard Applications",
      "Third-Party API Integrations",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "We design interfaces that feel effortless — because the hard work happened before the user ever sees a pixel. We combine aesthetic precision with a deep understanding of how people actually use software.",
    features: [
      "Responsive Interface Design",
      "Modern User Experience Flows",
      "Accessibility Compliance (WCAG)",
      "Conversion-Focused UI Patterns",
      "Design System Creation",
    ],
  },
  {
    icon: Search,
    title: "SEO Services",
    description: "We approach SEO like engineers — systematic, measurable, and rooted in data. From Core Web Vitals to structured data, we make sure search engines find you and trust you.",
    features: [
      "Technical SEO Audits & Fixes",
      "On-Page Content Optimization",
      "Off-Page SEO & Link Strategy",
      "Keyword Research & Mapping",
      "Core Web Vitals Optimization",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Shopify Development",
    description: "We build Shopify stores that convert at a higher rate than the generic out-of-the-box experience. Custom themes, optimized apps, and mobile-first design that turns visitors into customers.",
    features: [
      "Custom Shopify Store Setup",
      "Theme Development & Customization",
      "App Integrations & Marketplace",
      "Mobile-First Storefronts",
      "Shopify Plus Expertise",
    ],
  },
  {
    icon: Gauge,
    title: "E-Commerce Optimization",
    description: "Existing store underperforming? We audit, diagnose, and fix the bottlenecks — whether it's page speed, checkout friction, or mobile performance — turning your existing traffic into revenue.",
    features: [
      "Page Speed & Load Time Optimization",
      "Conversion Rate Optimization (CRO)",
      "Core Web Vitals Improvement",
      "Image & Asset Optimization",
      "Mobile Performance Audits",
    ],
  },
];

export default function ServicesPage() {
  useDocumentTitle(
    "Services | NexCore",
    "Full-stack development, SaaS platforms, e-commerce stores, UI/UX design, SEO services, and Shopify development — everything under one roof."
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

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
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Services</span>
            </div>
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter leading-[1.05] mb-8 text-foreground">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-secondary relative">
                  Services
                  <span className="absolute -inset-x-4 -inset-y-2 bg-primary/20 blur-3xl opacity-0 animate-[pulse_4s_ease-in-out_infinite] mix-blend-screen -z-10" />
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed border-l-4 border-primary/30 pl-6 max-w-2xl">
                Everything you need to build, launch, and scale a digital product — under one roof.
              </p>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Services Detail */}
      <section className="py-16">
        <Container>
          <div className="space-y-20">
            {servicesList.map((service, i) => {
              const Icon = service.icon;
              const isEven = i % 2 === 0;
              return (
                <AnimateOnScroll key={service.title}>
                  <div
                    id={service.title.toLowerCase().replace(/\s+/g, "-")}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center scroll-mt-32 ${
                      isEven ? "" : "lg:[&>*:first-child]:order-2"
                    }`}
                    data-testid={`section-service-${i}`}
                  >
                    {/* Text side */}
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 tracking-tight">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                        {service.description}
                      </p>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                            <span className="text-foreground text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Decorative side */}
                    <div>
                      <div className="h-72 w-full relative flex items-center justify-center perspective-[1000px]">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-3xl blur-2xl" />
                        
                        {/* Interactive Stack */}
                        <div
                          className="relative w-48 h-48"
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          {/* Back Card */}
                          <div 
                            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/10 shadow-xl backdrop-blur-sm"
                            style={{ transform: "translateZ(-30px) scale(0.9)", opacity: 0.6 }}
                          />
                          
                          {/* Middle Card */}
                          <div 
                            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/20 shadow-xl backdrop-blur-md"
                            style={{ transform: "translateZ(0px) scale(0.95)", opacity: 0.8 }}
                          />
                          
                          {/* Front Main Card */}
                          <div 
                            className="absolute inset-0 rounded-2xl bg-card/80 border border-primary/30 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center p-6 gap-4"
                            style={{ transform: "translateZ(30px)" }}
                          >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-inner">
                              <Icon className="w-8 h-8 text-primary" />
                            </div>
                            <div className="w-full space-y-2">
                              <div className="h-1.5 w-3/4 mx-auto bg-primary/20 rounded-full" />
                              <div className="h-1.5 w-1/2 mx-auto bg-primary/20 rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden border-t border-border/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10" />
        <Container className="relative z-10 text-center">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-5 tracking-tight">
              Have a project in mind?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
              Let's talk. We'll help you figure out the right approach and give you an honest estimate.
            </p>
            <GradientButton href="/contact#contact-form" className="px-12 py-4 text-base">
              Start a Conversation
            </GradientButton>
          </AnimateOnScroll>
        </Container>
      </section>
    </main>
  );
}
