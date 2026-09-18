import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 bg-background/60 backdrop-blur-2xl border-b border-transparent",
          isScrolled && "shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-border/40 bg-background/80 backdrop-blur-3xl"
        )}
      >
        <Container>
          <div className="flex h-20 items-center justify-between lg:h-24">
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
              <span className="whitespace-nowrap text-lg font-extrabold tracking-[-0.04em] text-foreground sm:text-2xl">
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
                      "text-sm font-medium transition-colors hover:text-primary relative group",
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
              <SheetContent side="right" className="flex w-[90vw] flex-col border-l-border/50 bg-background/95 pt-16 backdrop-blur-xl sm:w-[360px] sm:pt-20">
                <nav className="flex flex-col gap-6">
                  {NAV_LINKS.map((link) => {
                    const isActive = location === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "text-xl sm:text-2xl font-heading font-semibold transition-colors",
                          isActive ? "text-primary" : "text-foreground hover:text-primary"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  <div className="mt-8">
                    <GradientButton href="/contact#contact-form" className="w-full text-center">
                      Get Started
                    </GradientButton>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </motion.header>
    </>
  );
}
