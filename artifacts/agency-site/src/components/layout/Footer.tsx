import { Link } from "wouter";
import { Container } from "./Container";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const services = [
  "Full-Stack Development",
  "E-Commerce Development",
  "SaaS Development",
  "UI/UX Design",
  "SEO Services",
  "Shopify Development",
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-heading font-bold tracking-tighter">
                NexCore<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              We build scalable digital products that power the next generation of startups and growing businesses.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-github-footer"
                className="w-9 h-9 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin-footer"
                className="w-9 h-9 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-twitter-footer"
                className="w-9 h-9 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-testid={`link-footer-${link.label.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    data-testid={`link-footer-service-${service.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@nexcore.dev"
                  data-testid="link-footer-email"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  hello@nexcore.dev
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  data-testid="link-footer-phone"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-border/30">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {year} NexCore. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with React &amp; TypeScript
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
