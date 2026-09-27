import { Link, useLocation } from "wouter";
import { Container } from "./Container";
import { Mail, Phone, MapPin, ArrowRight, Sparkles } from "lucide-react";

import { FACEBOOK_URL, INSTAGRAM_URL, X_URL } from "@/lib/seo";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/web-development", label: "Full-Stack Web Development" },
  { href: "/services/e-commerce", label: "E-Commerce Development" },
  { href: "/services/shopify", label: "Shopify Development" },
  { href: "/services/saas", label: "SaaS Development" },
  { href: "/services/mobile-app-development", label: "Mobile App Development" },
  { href: "/services/custom-software-development", label: "Custom Software" },
  { href: "/services/ui-ux", label: "UI/UX Design" },
  { href: "/services/seo", label: "SEO Services" },
  { href: "/services/maintenance-support", label: "Website Maintenance" },
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

const socialLinks = [
  { href: X_URL, label: "X", testId: "link-footer-x" },
  { href: FACEBOOK_URL, label: "Facebook", testId: "link-footer-facebook" },
  { href: INSTAGRAM_URL, label: "Instagram", testId: "link-footer-instagram" },
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
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="lg:col-span-3">
            <Link
              href="/"
              aria-label="We Raise Tech home"
              className="group mb-4 inline-flex items-center gap-3"
            >
              <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[1.35rem] bg-white/5 shadow-[0_8px_28px_rgba(37,99,235,0.3)] ring-1 ring-white/15 transition duration-300 group-hover:scale-105 group-hover:ring-cyan-300/40">
                <img
                  src="/we-raise-tech-logo-128.webp"
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
              We Raise Tech is a software engineering company for web development, mobile apps, SaaS, e-commerce, custom software, SEO, UI/UX, and website maintenance.
            </p>
            <div className="flex flex-wrap gap-2" aria-label="We Raise Tech social media links">
              {socialLinks.map(({ href, label, testId }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow We Raise Tech on ${label}`}
                  data-testid={testId}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
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

          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {serviceLinks.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    data-testid={`link-footer-service-${service.href.split("/").pop()}`}
                    className="group flex items-start gap-2 text-sm leading-5 text-slate-400 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ArrowRight className="mt-1 h-3 w-3 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" />
                    <span>{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Contact Us
            </h3>
            <address className="not-italic">
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <a href="mailto:contact@weraisetech.com" className="hover:text-primary transition-colors">
                  contact@weraisetech.com
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
          <div className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-slate-500">
              &copy; {year} We Raise Tech. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
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
