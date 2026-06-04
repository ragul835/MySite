import { Link, useLocation } from "wouter";
import { Container } from "./Container";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const services = [
  "Web Development",
  "E-Commerce",
  "SEO",
  "SaaS",
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
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
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-heading font-bold tracking-tighter text-white">
                NexCore<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              We build scalable digital products that power the next generation of startups and growing businesses.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our GitHub profile"
                data-testid="link-github-footer"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our LinkedIn profile"
                data-testid="link-linkedin-footer"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
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
              {services.map((service) => {
                const href = `/services#${service.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <li key={service}>
                    <a
                      href={href}
                      onClick={(e) => handleHashLink(e, href)}
                      data-testid={`link-footer-service-${service.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-slate-400 hover:text-primary text-sm transition-colors flex items-center gap-2 group cursor-pointer"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Technologies
            </h3>
            <ul className="space-y-3">
              {techLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-primary text-sm transition-colors flex items-center gap-2 group cursor-pointer"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
            <p className="text-xs text-slate-500">
              &copy; {year} NexCore. All rights reserved.
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
