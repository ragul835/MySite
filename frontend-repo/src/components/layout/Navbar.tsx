import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, ChevronRight, Layers, ShoppingCart, Layout, Search, Cloud, PenTool, ShoppingBag, Zap, Rocket, ArrowRight, Code, Info, Briefcase, Lightbulb, Grid, FileText, Settings, Smartphone, Terminal } from "lucide-react";
import { GradientButton } from "../shared/GradientButton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "#company", label: "Company", icon: "Building" },
  { href: "/services", label: "Services", icon: "Briefcase" },
  { href: "/portfolio", label: "Portfolio", icon: "Grid" },
  { href: "/solutions", label: "Solutions", icon: "Lightbulb" },
];

const SERVICES_MENU = [
  {
    title: "E-commerce Developers",
    slug: "e-commerce",
    description: "We build scalable, conversion-focused e-commerce platforms.",
    icon: "ShoppingCart",
  },
  {
    title: "Full-Stack Web Developers",
    slug: "full-stack",
    description: "Scalable web solutions using modern tech stacks.",
    icon: "Layout",
  },
  {
    title: "SEO Experts",
    slug: "seo",
    description: "Boost your visibility, traffic, and search rankings.",
    icon: "Search",
  },
  {
    title: "SaaS Development Experts",
    slug: "saas",
    description: "Build scalable, high-performance SaaS platforms.",
    icon: "Cloud",
  },
  {
    title: "UI/UX Designers",
    slug: "ui-ux",
    description: "Digital experiences that delight and convert users.",
    icon: "PenTool",
  },
  {
    title: "Shopify Development Experts",
    slug: "shopify",
    description: "We build fast, scalable, and custom Shopify stores.",
    icon: "ShoppingBag",
  },
  {
    title: "E-commerce Optimization",
    slug: "ecommerce-optimization",
    description: "We improve speed, performance, and conversion rates.",
    icon: "Zap",
  },
  {
    title: "Web Development",
    slug: "web-development",
    description: "Custom web applications and high-performance websites.",
    icon: "Code",
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
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

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
    setIsMobileServicesOpen(false);
    setIsMobileCompanyOpen(false);
    setHoveredMenu(null);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 bg-background/60 backdrop-blur-2xl border-b border-transparent",
          isScrolled && "shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-border/40 bg-background/80 backdrop-blur-3xl"
        )}
      >
        <Container>
          <div className="relative flex h-20 w-full items-center justify-between">
            {/* Left Panel */}
            <div className="flex items-center justify-start">
              <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3.5" aria-label="We Raise Tech home">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.2rem] bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-violet-500/20 shadow-[0_8px_24px_rgba(59,130,246,0.2)] ring-1 ring-primary/20 transition duration-300 group-hover:scale-105 group-hover:shadow-[0_10px_30px_rgba(99,102,241,0.32)] sm:h-16 sm:w-16 sm:rounded-[1.35rem]">
                  <img
                    src="/we-raise-tech-logo.png"
                    alt=""
                    aria-hidden="true"
                    width={64}
                    height={64}
                    className="h-full w-full scale-[1.08] object-contain drop-shadow-[0_2px_8px_rgba(59,130,246,0.4)]"
                  />
                </span>
                <span className="inline whitespace-nowrap text-lg font-extrabold tracking-[-0.04em] text-foreground sm:text-xl lg:hidden xl:inline xl:text-2xl">
                  We <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">Raise</span> Tech
                </span>
              </Link>
            </div>

            {/* Center Panel: Desktop Nav */}
            <nav className="hidden flex-none items-center justify-center gap-5 lg:flex xl:gap-8">
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
                                ShoppingCart, Layout, Search, Cloud, PenTool, ShoppingBag, Zap, Rocket, Code, Settings, Smartphone, Terminal
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
                <Link href="/contact" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 whitespace-nowrap">
                  Book a Free Call <ArrowRight className="h-4 w-4" />
                </Link>
                <GradientButton href="/contact#contact-form" className="px-6 py-2 flex items-center gap-1 whitespace-nowrap">
                  Get a Free Estimate <ArrowRight className="h-4 w-4" />
                </GradientButton>
              </div>

              {/* Mobile Nav Trigger */}
              <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-11 w-11 text-foreground" aria-label="Open navigation menu">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="flex w-[90vw] flex-col border-l-0 bg-background/95 px-5 pt-10 shadow-2xl backdrop-blur-3xl sm:w-[400px] sm:px-8 sm:pt-16">
                    <div className="flex flex-1 flex-col gap-8 overflow-y-auto pb-8 sm:gap-12 [&::-webkit-scrollbar]:hidden">
                      {/* Brand Header */}
                      <Link href="/" className="group mb-2 flex items-center gap-3" aria-label="We Raise Tech home">
                        <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-violet-500/20 shadow-[0_8px_24px_rgba(59,130,246,0.2)] ring-1 ring-primary/20">
                          <img
                            src="/we-raise-tech-logo.png"
                            alt=""
                            aria-hidden="true"
                            width={64}
                            height={64}
                            className="h-full w-full scale-[1.08] object-contain drop-shadow-[0_2px_8px_rgba(59,130,246,0.4)]"
                          />
                        </span>
                        <span className="whitespace-nowrap text-2xl font-extrabold tracking-[-0.04em] text-foreground">
                          We <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">Raise</span> Tech
                        </span>
                      </Link>

                      {/* Navigation Links */}
                      <nav className="flex flex-col gap-6">
                        {NAV_LINKS.map((link) => {
                          const isActive = location === link.href || (link.href === '/services' && location.startsWith('/services'));
                          
                          if (link.label === "Company") {
                             return (
                               <div key={link.href} className="flex flex-col">
                                 <button
                                   onClick={() => setIsMobileCompanyOpen(!isMobileCompanyOpen)}
                                   className={cn(
                                     "flex items-center justify-between text-2xl font-heading font-bold transition-colors text-left",
                                     (location === "/about" || location === "/blog") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                   )}
                                 >
                                   {link.label}
                                   <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", isMobileCompanyOpen ? "rotate-180" : "")} />
                                 </button>
                                 
                                 <div className={cn(
                                   "grid transition-all duration-300 ease-in-out",
                                   isMobileCompanyOpen ? "grid-rows-[1fr] mt-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                                 )}>
                                   <div className="overflow-hidden flex flex-col gap-5 pl-4 border-l-2 border-border/50">
                                      <Link href="/about" className="text-base text-muted-foreground hover:text-foreground transition-colors font-medium">About Us</Link>
                                      <Link href="/blog" className="text-base text-muted-foreground hover:text-foreground transition-colors font-medium">Our Blog</Link>
                                   </div>
                                 </div>
                               </div>
                             );
                          }

                          if (link.label === "Services") {
                             return (
                               <div key={link.href} className="flex flex-col">
                                 <button
                                   onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                   className={cn(
                                     "flex items-center justify-between text-2xl font-heading font-bold transition-colors text-left",
                                     isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                   )}
                                 >
                                   {link.label}
                                   <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", isMobileServicesOpen ? "rotate-180" : "")} />
                                 </button>
                                 
                                 {/* Expanded Services Sub-menu */}
                                 <div className={cn(
                                   "grid transition-all duration-300 ease-in-out",
                                   isMobileServicesOpen ? "grid-rows-[1fr] mt-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                                 )}>
                                   <div className="overflow-hidden flex flex-col gap-5 pl-4 border-l-2 border-border/50">
                                      {SERVICES_MENU.map((srv, idx) => (
                                        <Link key={idx} href={`/services/${srv.slug}`} className="text-base text-muted-foreground hover:text-foreground transition-colors font-medium">
                                          {srv.title}
                                        </Link>
                                      ))}
                                      <Link href="/services" className="text-base text-primary font-bold hover:underline mt-2 flex items-center gap-2">
                                        View All Services <ArrowRight className="w-4 h-4" />
                                      </Link>
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
                                "text-2xl font-heading font-bold transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {link.label}
                            </Link>
                          );
                        })}
                      </nav>
                      
                      {/* Footer Actions */}
                      <div className="mt-auto pt-8 flex flex-col gap-5 border-t border-border/20">
                        <GradientButton href="/contact#contact-form" className="w-full text-center py-6 text-lg font-bold shadow-xl shadow-primary/20 rounded-2xl">
                          Start Your Project
                        </GradientButton>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </Container>
      </motion.header>
    </>
  );
}
