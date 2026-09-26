import React, { lazy, Suspense, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Container } from "./Container";
import { Menu, ChevronDown, Layers, ShoppingCart, ShoppingBag, Search, Cloud, PenTool, Rocket, ArrowRight, Code, Settings, Smartphone, Terminal, PanelLeftClose } from "lucide-react";
import { GradientButton } from "../shared/GradientButton";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const CalendlyPopup = lazy(() => import("@/components/shared/CalendlyPopup"));

const NAV_LINKS = [
  { href: "#company", label: "Company", icon: "Building" },
  { href: "/services", label: "Services", icon: "Briefcase" },
  { href: "/portfolio", label: "Portfolio", icon: "Grid" },
  { href: "/solutions", label: "Solutions", icon: "Lightbulb" },
];

const SERVICES_MENU = [
  {
    title: "E-Commerce Development",
    slug: "e-commerce",
    description: "Custom commerce platforms built to convert and scale.",
    icon: "ShoppingCart",
  },
  {
    title: "Shopify Development",
    slug: "shopify",
    description: "Custom Shopify stores, themes, apps, and migrations.",
    icon: "ShoppingBag",
  },
  {
    title: "Full-Stack Web Development",
    slug: "web-development",
    description: "High-performance websites and custom web applications.",
    icon: "Code",
  },
  {
    title: "SEO Services",
    slug: "seo",
    description: "Boost your visibility, traffic, and search rankings.",
    icon: "Search",
  },
  {
    title: "SaaS Development",
    slug: "saas",
    description: "Build scalable, high-performance SaaS platforms.",
    icon: "Cloud",
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux",
    description: "Digital experiences that delight and convert users.",
    icon: "PenTool",
  },
  {
    title: "Website Maintenance & Support",
    slug: "maintenance-support",
    description: "Keep your website secure, fast, and up-to-date.",
    icon: "Settings",
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description: "High-performance iOS and Android applications.",
    icon: "Smartphone",
  },
  {
    title: "Custom Software Development",
    slug: "custom-software-development",
    description: "Tailor-made software solutions to solve complex business problems.",
    icon: "Terminal",
  }
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setHoveredMenu(null);
  }, [location]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 bg-background/95 backdrop-blur-md border-b border-transparent",
          isScrolled && "shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-border/40 bg-background/95"
        )}
      >
        <Container>
          <div className="relative flex h-20 w-full items-center justify-between">
            {/* Left Panel */}
            <div className="flex items-center justify-start">
              <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3.5" aria-label="We Raise Tech home">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.2rem] bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-violet-500/20 shadow-[0_8px_24px_rgba(59,130,246,0.2)] ring-1 ring-primary/20 transition duration-300 group-hover:scale-105 group-hover:shadow-[0_10px_30px_rgba(99,102,241,0.32)] sm:h-16 sm:w-16 sm:rounded-[1.35rem]">
                  <img
                    src="/we-raise-tech-logo-128.webp"
                    alt=""
                    aria-hidden="true"
                    width={64}
                    height={64}
                    fetchPriority="high"
                    className="h-full w-full scale-[1.08] object-contain drop-shadow-[0_2px_8px_rgba(59,130,246,0.4)]"
                  />
                </span>
                <span className="inline whitespace-nowrap text-lg font-extrabold tracking-[-0.04em] text-foreground sm:text-xl lg:hidden xl:inline xl:text-2xl">
                  We <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">Raise</span> Tech
                </span>
              </Link>
            </div>

            {/* Center Panel: Desktop Nav */}
            <nav aria-label="Primary" className="hidden flex-none items-center justify-center gap-5 lg:flex xl:gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = location === link.href;

                if (link.label === "Company") {
                  return (
                    <div 
                      key={link.href} 
                      className="relative"
                      onMouseEnter={() => setHoveredMenu(link.label)}
                      onMouseLeave={() => setHoveredMenu(null)}
                    >
                      <button 
                        onClick={() => setHoveredMenu(hoveredMenu === link.label ? null : link.label)}
                        className={cn(
                          "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary py-4",
                          (location === "/about" || location === "/blog") ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                        <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", hoveredMenu === link.label && "rotate-180")} />
                      </button>
                      <div className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 transform",
                        hoveredMenu === link.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
                      )}>
                        <div className="w-48 bg-background border border-border/50 rounded-xl shadow-2xl flex flex-col p-2">
                          <Link href="/about" className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors flex items-center justify-between group/link">
                            About Us <ArrowRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                          </Link>
                          <Link href="/blog" className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors flex items-center justify-between group/link">
                            Our Blog <ArrowRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (link.label === "Services") {
                  return (
                    <div 
                      key={link.href} 
                      className="relative"
                      onMouseEnter={() => setHoveredMenu(link.label)}
                      onMouseLeave={() => setHoveredMenu(null)}
                    >
                      <button 
                        onClick={() => setHoveredMenu(hoveredMenu === link.label ? null : link.label)}
                        className={cn(
                          "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary py-4",
                          isActive ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                        <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", hoveredMenu === link.label && "rotate-180")} />
                      </button>
                      <div className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 transform",
                        hoveredMenu === link.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
                      )}>
                        <div className="w-[850px] max-h-[450px] bg-background border border-border/50 rounded-2xl shadow-2xl flex overflow-hidden">
                          {/* Left Panel */}
                          <div className="w-[320px] bg-[#0F172A] p-8 text-white flex flex-col">
                            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                              <Layers className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold font-heading mb-4 leading-tight">Everything your business needs</h3>
                            <p className="text-slate-400 text-sm mb-auto leading-relaxed">
                              End-to-end technology solutions built for scale, speed, and results.
                            </p>
                            <Link href="/services" className="mt-8 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                              Browse all services <ArrowRight className="h-4 w-4" />
                            </Link>
                            <p className="text-slate-500 text-xs mt-2">{SERVICES_MENU.length} services available</p>
                          </div>
                          
                          {/* Right Panel */}
                          <div className="flex-1 p-6 grid grid-cols-2 gap-x-4 gap-y-2 bg-background overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                            {SERVICES_MENU.map((service, idx) => {
                              const IconMap: any = {
                                ShoppingCart, ShoppingBag, Search, Cloud, PenTool, Rocket, Code, Settings, Smartphone, Terminal
                              };
                              const Icon = IconMap[service.icon];
                              return (
                                <Link 
                                  key={idx} 
                                  href={`/services/${service.slug}`}
                                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group/item"
                                >
                                  <div className="mt-0.5 p-2 rounded-md bg-muted text-muted-foreground group-hover/item:text-primary group-hover/item:bg-primary/10 transition-colors">
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-semibold text-foreground mb-1">{service.title}</h4>
                                    <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary relative group py-4",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                    <div
                      className={cn(
                        "absolute bottom-2 left-0 right-0 h-0.5 bg-primary transition-transform origin-left duration-300 ease-out",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right Panel: CTA & Mobile Nav */}
            <div className="flex items-center justify-end">
              {/* Desktop CTA */}
              <div className="hidden items-center gap-3 lg:flex xl:gap-6">
                <button onClick={() => { trackEvent("calendly_open", { placement: "desktop_nav" }); setIsCalendlyOpen(true); }} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer">
                  Book a Free Call <ArrowRight className="h-4 w-4" />
                </button>
                <GradientButton href="/contact#contact-form" className="px-6 py-2 flex items-center gap-1 whitespace-nowrap">
                  Get a Free Estimate <ArrowRight className="h-4 w-4" />
                </GradientButton>
              </div>

              {/* Mobile Nav Trigger */}
              <div className="lg:hidden">
                <button type="button" onClick={() => setIsMobileMenuOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground transition hover:bg-muted" aria-label="Open navigation menu" aria-expanded={isMobileMenuOpen}>
                  <Menu className="h-6 w-6" />
                </button>
                {isMobileMenuOpen && (
                  <div className="fixed inset-0 z-[70] lg:hidden">
                    <button type="button" className="absolute inset-0 bg-black/45" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close navigation menu" />
                    <aside role="dialog" aria-modal="true" aria-labelledby="mobile-nav-title" aria-describedby="mobile-nav-description" className="absolute inset-y-0 left-0 flex w-[76vw] min-w-[264px] max-w-[304px] flex-col gap-0 border-r border-slate-200 bg-white p-0 text-slate-900 shadow-2xl">
                    <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
                      <span id="mobile-nav-title" className="sr-only">Mobile navigation</span>
                      <span id="mobile-nav-description" className="sr-only">Browse services, company pages, and contact options.</span>
                      <Link href="/" className="flex min-w-0 items-center gap-2" aria-label="We Raise Tech home">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-violet-500/20 ring-1 ring-primary/15">
                          <img src="/we-raise-tech-logo-128.webp" alt="" aria-hidden="true" width={40} height={40} className="h-full w-full scale-105 object-contain" />
                        </span>
                        <span className="truncate text-base font-extrabold tracking-[-0.04em]">
                          We <span className="text-primary">Raise</span> Tech
                        </span>
                      </Link>
                      <button type="button" onClick={() => setIsMobileMenuOpen(false)} className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900" aria-label="Close navigation menu">
                        <PanelLeftClose className="h-5 w-5" />
                      </button>
                    </div>

                    <nav className="min-h-0 flex-1 overflow-y-auto px-4 pb-36 pt-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Mobile navigation">
                      <div className="flex items-center justify-between px-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Services</p>
                        <Link href="/services" className="inline-flex min-h-10 items-center gap-1 text-xs font-semibold text-primary">
                          View all <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>

                      <div className="mt-2 space-y-0.5">
                        {SERVICES_MENU.map((service) => {
                          const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                            ShoppingCart, ShoppingBag, Search, Cloud, PenTool, Rocket, Code, Settings, Smartphone, Terminal
                          };
                          const Icon = IconMap[service.icon] ?? Code;
                          return (
                            <Link key={service.slug} href={`/services/${service.slug}`} className="group flex min-h-14 items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-primary">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition group-hover:bg-primary/10 group-hover:text-primary">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="leading-5">{service.title}</span>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="my-4 h-px bg-slate-100" />
                      <p className="px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Company</p>
                      <div className="mt-2 space-y-1">
                        {[
                          { href: "/about", label: "About Us", description: "Our story, values, and approach" },
                          { href: "/portfolio", label: "Portfolio", description: "Selected work and case studies" },
                          { href: "/blog", label: "Insights", description: "Engineering guides and updates" },
                          { href: "/solutions", label: "Solutions", description: "How we solve product challenges" },
                        ].map((link) => (
                          <Link key={link.href} href={link.href} className="group flex min-h-16 items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary">
                              <Code className="h-4 w-4" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-medium text-slate-700 group-hover:text-primary">{link.label}</span>
                              <span className="mt-0.5 block truncate text-[11px] text-slate-400">{link.description}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </nav>

                    <div className="absolute inset-x-0 bottom-0 border-t border-slate-100 bg-white/95 p-4 shadow-[0_-12px_30px_rgba(15,23,42,0.06)] backdrop-blur">
                      <GradientButton href="/contact#contact-form" onClick={() => setIsMobileMenuOpen(false)} className="min-h-11 w-full rounded-xl py-2.5 text-sm">
                        Start a Project <ArrowRight className="h-4 w-4" />
                      </GradientButton>
                      <button onClick={() => { trackEvent("calendly_open", { placement: "mobile_nav" }); setIsMobileMenuOpen(false); setIsCalendlyOpen(true); }} className="mt-2 flex min-h-11 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm cursor-pointer">
                        Book a Free Call <ArrowRight className="h-4 w-4" />
                      </button>
                      <p className="mt-3 text-center text-[10px] text-slate-400">Free consultation · Response within 24 hours</p>
                    </div>
                    </aside>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </header>
      
      {isCalendlyOpen && (
        <Suspense fallback={null}>
          <CalendlyPopup onClose={() => setIsCalendlyOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
