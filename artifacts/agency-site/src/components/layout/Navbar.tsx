import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { GradientButton } from "../shared/GradientButton";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
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
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 bg-background/60 backdrop-blur-2xl border-b border-transparent",
          isScrolled && "shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-border/40 bg-background/80 backdrop-blur-3xl"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-heading font-bold text-foreground tracking-tighter">
                NexCore<span className="text-primary">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
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
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl border-l-border/50 flex flex-col pt-20">
                <nav className="flex flex-col gap-6">
                  {NAV_LINKS.map((link) => {
                    const isActive = location === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "text-2xl font-heading font-semibold transition-colors",
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
    </header>
    </>
  );
}
