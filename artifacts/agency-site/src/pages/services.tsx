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
    title: "Web Development",
    whatItIs: "Custom business websites engineered for performance, security, and scalability.",
    benefits: "Establishes a strong digital presence, improves user engagement, and drives conversions.",
    technologiesUsed: "React, Next.js, HTML/CSS, TypeScript",
    whoNeedsIt: "Businesses looking for a professional, high-performance website.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    whatItIs: "High-converting online stores with seamless payment flows and mobile-first design.",
    benefits: "Increases sales, provides a smooth shopping experience, and scales with your business.",
    technologiesUsed: "Next.js, Node.js, Stripe, PostgreSQL",
    whoNeedsIt: "Retailers and brands wanting to sell products online efficiently.",
  },
  {
    icon: Layers,
    title: "Full Stack Development",
    whatItIs: "End-to-end web applications built with modern frameworks and battle-tested architectures.",
    benefits: "Provides a complete, robust solution with seamless frontend and backend integration.",
    technologiesUsed: "React, Node.js, PostgreSQL, TypeScript",
    whoNeedsIt: "Companies needing complex, custom web applications.",
  },
  {
    icon: Gauge,
    title: "SaaS Development",
    whatItIs: "Multi-tenant platforms and subscription systems built to scale from day one.",
    benefits: "Creates reliable recurring revenue streams with scalable infrastructure.",
    technologiesUsed: "Next.js, NestJS, AWS, MongoDB",
    whoNeedsIt: "Startups and enterprises building subscription-based software.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    whatItIs: "Interfaces that are as beautiful as they are intuitive — designed to convert.",
    benefits: "Enhances user satisfaction, reduces bounce rates, and strengthens brand identity.",
    technologiesUsed: "Figma, Framer, Tailwind CSS",
    whoNeedsIt: "Any product that needs a modern, user-friendly interface.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    whatItIs: "Technical and on-page SEO that drives qualified traffic and measurable growth.",
    benefits: "Improves search engine rankings, increases organic traffic, and lowers acquisition costs.",
    technologiesUsed: "Google Search Console, Lighthouse, Next.js SEO",
    whoNeedsIt: "Businesses wanting better visibility on Google.",
  },
  {
    icon: ShoppingBag,
    title: "Shopify Development",
    whatItIs: "Custom Shopify themes and apps that turn browsers into buyers.",
    benefits: "Provides a tailored shopping experience on a robust e-commerce platform.",
    technologiesUsed: "Shopify Liquid, React, Node.js",
    whoNeedsIt: "Merchants looking for customized Shopify stores.",
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
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">What It Is</h3>
                          <p className="text-muted-foreground text-sm">{service.whatItIs}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Benefits</h3>
                          <p className="text-muted-foreground text-sm">{service.benefits}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Technologies Used</h3>
                          <p className="text-muted-foreground text-sm">{service.technologiesUsed}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Who Needs It</h3>
                          <p className="text-muted-foreground text-sm">{service.whoNeedsIt}</p>
                        </div>
                      </div>
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
