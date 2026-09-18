import { Link, useLocation } from "wouter";
import { Container } from "./Container";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const services = [
  "Web Development",
  "Full Stack Development",
  "E-Commerce",
  "SaaS",
  "UI/UX Design",
  "SEO",
  "Shopify",
  "Website Maintenance & Support",
  "Mobile App Development",
  "Custom Software Development",
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
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
              Building reliable digital solutions with modern technology, clean engineering practices, and a commitment to long-term success.
            </p>
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
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a href="mailto:contact@weraisetech.com" className="hover:text-primary transition-colors">
                  contact@weraisetech.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a href="tel:+919080163393" className="hover:text-primary transition-colors">
                  +91 9080163393
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>India</span>
              </li>
              <li className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Available for new projects
                </div>
              </li>
            </ul>
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
