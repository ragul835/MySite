import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ArrowRight,
  Code2,
  Gauge,
  Layers3,
  Menu,
  PanelLeftClose,
  Palette,
  Search,
  ShoppingBag,
  ShoppingCart,
  Terminal,
} from "lucide-react";
import { GradientButton } from "../shared/GradientButton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const MOBILE_SERVICES = [
  { href: "/services#web-development", label: "Web Development", icon: Code2 },
  { href: "/services#full-stack-development", label: "Full-Stack Development", icon: Layers3 },
  { href: "/services#e-commerce-development", label: "E-Commerce Development", icon: ShoppingCart },
  { href: "/services#saas-development", label: "SaaS Development", icon: Gauge },
  { href: "/services#ui/ux-design", label: "UI/UX Design", icon: Palette },
  { href: "/services#seo-optimization", label: "SEO Optimization", icon: Search },
  { href: "/services#shopify-development", label: "Shopify Development", icon: ShoppingBag },
  { href: "/services#custom-software-development", label: "Custom Software", icon: Terminal },
];

const MOBILE_COMPANY_LINKS = [
  { href: "/about", label: "About Us", description: "Our story, values, and approach" },
  { href: "/solutions", label: "Solutions", description: "How we solve product challenges" },
  { href: "/blog", label: "Insights", description: "Engineering guides and updates" },
  { href: "/contact", label: "Contact", description: "Talk directly with our team" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 bg-background/60 backdrop-blur-2xl border-b border-transparent",
          isScrolled && "shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-border/40 bg-background/80 backdrop-blur-3xl"
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between sm:h-20 lg:h-24">
            <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3.5" aria-label="We Raise Tech home">
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[0.9rem] bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-violet-500/20 shadow-[0_8px_24px_rgba(59,130,246,0.2)] ring-1 ring-primary/20 transition duration-300 group-hover:scale-105 group-hover:shadow-[0_10px_30px_rgba(99,102,241,0.32)] sm:h-16 sm:w-16 sm:rounded-[1.35rem]">
                <img
                  src="/we-raise-tech-logo.png"
                  alt=""
                  aria-hidden="true"
                  width={64}
                  height={64}
                  className="h-full w-full scale-[1.08] object-contain drop-shadow-[0_2px_8px_rgba(59,130,246,0.4)]"
                />
              </span>
              <span className="whitespace-nowrap text-[1.05rem] font-extrabold tracking-[-0.04em] text-foreground sm:text-2xl">
                We <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">Raise</span> Tech
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative group inline-flex min-h-11 items-center text-sm font-medium transition-colors hover:text-primary",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                    <div
                      className={cn(
                        "absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary transition-transform origin-left duration-300 ease-out",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                );
              })}
            <GradientButton href="/contact#contact-form" className="ml-4 px-6 py-2">
              Get Started
            </GradientButton>
          </nav>

          {/* Mobile Nav */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-11 w-11 text-foreground" aria-label="Open navigation menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex w-[76vw] min-w-[264px] max-w-[304px] flex-col gap-0 border-r border-slate-200 bg-white p-0 text-slate-900 shadow-2xl [&>button]:-right-11 [&>button]:top-4 [&>button]:h-9 [&>button]:w-9 [&>button]:rounded-full [&>button]:bg-black/20 [&>button]:text-white [&>button]:opacity-100 [&>button]:ring-offset-0"
              >
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
                  <Link href="/" className="flex min-w-0 items-center gap-2" aria-label="We Raise Tech home">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-violet-500/20 ring-1 ring-primary/15">
                      <img src="/we-raise-tech-logo.png" alt="" aria-hidden="true" width={40} height={40} className="h-full w-full scale-105 object-contain" />
                    </span>
                    <span className="truncate text-base font-extrabold tracking-[-0.04em]">
                      We <span className="text-primary">Raise</span> Tech
                    </span>
                  </Link>
                  <SheetClose asChild>
                    <button type="button" className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900" aria-label="Close navigation menu">
                      <PanelLeftClose className="h-5 w-5" />
                    </button>
                  </SheetClose>
                </div>

                <nav className="min-h-0 flex-1 overflow-y-auto px-4 pb-36 pt-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Mobile navigation">
                  <div className="flex items-center justify-between px-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Services</p>
                    <Link href="/services" className="inline-flex min-h-10 items-center gap-1 text-xs font-semibold text-primary">
                      View all <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="mt-2 space-y-0.5">
                    {MOBILE_SERVICES.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="group flex min-h-14 items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-primary"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition group-hover:bg-primary/10 group-hover:text-primary">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="leading-5">{service.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="my-4 h-px bg-slate-100" />

                  <p className="px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Company</p>
                  <div className="mt-2 space-y-1">
                    {MOBILE_COMPANY_LINKS.map((link) => (
                      <Link key={link.href} href={link.href} className="group flex min-h-16 items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary">
                          <Code2 className="h-4 w-4" />
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
                  <GradientButton
                    href="/contact#contact-form"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-11 w-full rounded-xl py-2.5 text-sm"
                  >
                    Start a Project <ArrowRight className="h-4 w-4" />
                  </GradientButton>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-2 flex min-h-11 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm"
                  >
                    Book a Free Call <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-3 text-center text-[10px] text-slate-400">Free consultation · Response within 24 hours</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </motion.header>
    </>
  );
}
