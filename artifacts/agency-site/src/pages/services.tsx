import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Code2, ShoppingCart, Layers, Palette, Search, ShoppingBag, Gauge,
  ChevronRight, CheckCircle
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";

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
              <span className="text-foreground">Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-6">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Everything you need to build, launch, and scale a digital product — under one roof.
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Services Detail */}
      <section className="py-24">
        <Container>
          <div className="space-y-24">
            {servicesList.map((service, i) => {
              const Icon = service.icon;
              const isEven = i % 2 === 0;
              return (
                <AnimateOnScroll key={service.title}>
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
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
                      <div
                        className="h-72 rounded-3xl border border-border/50 overflow-hidden relative"
                        style={{
                          background: `linear-gradient(135deg, hsl(217 91% 60% / ${0.05 + (i % 3) * 0.03}) 0%, hsl(221 83% 53% / ${0.08 + (i % 2) * 0.04}) 100%)`,
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            backgroundImage: `
                              linear-gradient(hsl(0 0% 20%) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(0 0% 20%) 1px, transparent 1px)
                            `,
                            backgroundSize: "32px 32px",
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            className="w-20 h-20 rounded-3xl bg-primary/15 border border-primary/30 flex items-center justify-center"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                          >
                            <Icon className="w-10 h-10 text-primary/70" />
                          </motion.div>
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
      <section className="py-24 relative overflow-hidden border-t border-border/30">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(221 83% 8%) 100%)" }}
        />
        <Container className="relative z-10 text-center">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-5 tracking-tight">
              Have a project in mind?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
              Let's talk. We'll help you figure out the right approach and give you an honest estimate.
            </p>
            <GradientButton href="/contact" className="px-12 py-4 text-base">
              Start a Conversation
            </GradientButton>
          </AnimateOnScroll>
        </Container>
      </section>
    </main>
  );
}
