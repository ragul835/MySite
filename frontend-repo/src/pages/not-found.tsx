import { Link } from "wouter";
import { ArrowLeft, Home, Search, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GradientButton } from "@/components/shared/GradientButton";
import { useSEO } from "@/hooks/useDocumentTitle";
import { PAGE_SEO } from "@/lib/seo";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  useSEO({
    title: PAGE_SEO.notFound.title,
    description: PAGE_SEO.notFound.description,
    path: typeof window !== "undefined" ? window.location.pathname : "/404",
    brandTitle: false,
    noindex: true,
  });

  return (
    <section className="relative flex-1 w-full flex items-center justify-center overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,hsl(var(--primary)/0.1),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] -z-10" />

      <Container className="relative z-10 text-center max-w-2xl">
        {/* Giant 404 */}
        <div className="relative mb-8 select-none">
          <span className="text-[10rem] sm:text-[14rem] font-heading font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary/20 via-primary/10 to-transparent">
            404
          </span>
          {/* Icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-card/90 border border-border/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-foreground mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <GradientButton href="/" className="px-8 py-3.5 text-sm font-semibold">
            <Home className="w-4 h-4 mr-2 inline" /> Back to Home
          </GradientButton>
          <Link href="/contact">
            <span className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full border border-border/50 bg-card/40 hover:bg-card/80 text-foreground transition-all cursor-pointer">
              Contact Us <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Quick nav */}
        <div className="p-6 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Explore Pages</p>
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border/40 bg-card/30 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
