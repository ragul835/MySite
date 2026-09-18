import { Link, useLocation } from "wouter";
import { Container } from "./Container";
import { Github, Linkedin, Mail, Phone, MapPin, ArrowRight, Sparkles, Instagram, Facebook } from "lucide-react";

import { SERVICES } from "@/data/services";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const techLinks = [
  { href: "#", label: "React" },
  { href: "#", label: "Node.js" },
  { href: "#", label: "Java" },
  { href: "#", label: "PostgreSQL" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const footerSocials = [
  { icon: Github, label: "GitHub", href: "https://github.com", hoverClass: "hover:text-primary hover:border-primary/50 hover:bg-primary/10" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", hoverClass: "hover:text-primary hover:border-primary/50 hover:bg-primary/10" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com", hoverClass: "hover:text-[#1877F2] hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com", hoverClass: "hover:text-[#E4405F] hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10" },
  { icon: XIcon, label: "X", href: "https://twitter.com", hoverClass: "hover:text-white hover:border-white/50 hover:bg-white/10" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [, setLocation] = useLocation();

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const [path, hash] = href.split('#');
    
    if (path && window.location.pathname !== path) {
      setLocation(href);
    } else if (hash) {
      setLocation(href);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <footer className="relative bg-[#0a0a0f] text-white">
      {/* Gradient accent line at the very top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          <div className="lg:col-span-1">
            <Link
              href="/"
              aria-label="We Raise Tech home"
              className="group mb-4 inline-flex items-center gap-3"
            >
              <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[1.35rem] bg-white/5 shadow-[0_8px_28px_rgba(37,99,235,0.3)] ring-1 ring-white/15 transition duration-300 group-hover:scale-105 group-hover:ring-cyan-300/40">
                <img
                  src="/we-raise-tech-logo.png"
                  alt=""
                  aria-hidden="true"
                  width={64}
                  height={64}
                  className="h-full w-full scale-[1.08] object-contain drop-shadow-[0_2px_10px_rgba(56,189,248,0.5)]"
                />
              </span>
              <span className="whitespace-nowrap text-2xl font-extrabold tracking-[-0.04em] text-white">
                We <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">Raise</span> Tech
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              We Raise Tech is a software engineering agency for web development, mobile apps, SaaS, e-commerce, custom software, SEO, UI/UX, and website maintenance.
            </p>
            <div className="flex items-center gap-3">
              {footerSocials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${s.label} profile`}
                    data-testid={`link-${s.label.toLowerCase()}-footer`}
                    className={`w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all ${s.hoverClass}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-testid={`link-footer-${link.label.toLowerCase()}`}
                    className="text-slate-400 hover:text-primary text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    data-testid={`link-footer-service-${service.slug}`}
                    className="text-slate-400 hover:text-primary text-sm transition-colors flex items-center gap-2 group cursor-pointer"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Contact Us
            </h3>
            <address className="not-italic">
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <a href="mailto:ragulsiva@zohomail.in" className="hover:text-primary transition-colors">
                  ragulsiva@zohomail.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <a href="tel:+919080163393" className="hover:text-primary transition-colors">
                  +91 9080163393
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>India</span>
              </li>
              <li className="pt-2">
                <div className="relative inline-flex group cursor-default mt-2">
                  <div className="absolute transition-all duration-1000 opacity-20 -inset-px bg-gradient-to-r from-primary via-blue-400 to-secondary rounded-full blur-md group-hover:opacity-50 group-hover:-inset-1 group-hover:duration-200"></div>
                  <div className="relative inline-flex items-center gap-2 px-4 py-1.5 text-[10px] sm:text-xs font-bold text-white transition-all duration-200 bg-[#0a0a0f] border border-white/10 rounded-full uppercase tracking-widest backdrop-blur-xl">
                    <Sparkles className="w-3 h-3 text-primary" />
                    Next-Gen Solutions
                  </div>
                </div>
              </li>
            </ul>
            </address>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
            <p className="text-xs text-slate-500">
              &copy; {year} We Raise Tech. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-slate-500 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
