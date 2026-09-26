import { Link } from "wouter";
import { ArrowRight, CalendarDays, CheckCircle2, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GradientButton } from "@/components/shared/GradientButton";
import { useSEO } from "@/hooks/useDocumentTitle";

export default function ThankYouPage() {
  useSEO({
    title: "Thank You | We Raise Tech",
    description: "Your project inquiry has been received by We Raise Tech.",
    path: "/thank-you",
    brandTitle: false,
    noindex: true,
  });

  return (
    <section className="relative flex min-h-[68vh] items-center overflow-hidden py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,hsl(var(--primary)/0.14),transparent)]" />
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-primary/20 bg-card/80 p-8 text-center shadow-2xl backdrop-blur md:p-12">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" aria-hidden="true" />
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            We received your inquiry
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Thank you for considering We Raise Tech. A senior team member will review your project and respond within 24 hours.
          </p>
          <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
              <CalendarDays className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="mt-2 font-semibold text-foreground">What happens next</p>
              <p className="mt-1 text-sm text-muted-foreground">We review your goals, timeline, and the best next step.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
              <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="mt-2 font-semibold text-foreground">Need to add details?</p>
              <a className="mt-1 block text-sm text-primary hover:underline" href="mailto:contact@weraisetech.com">
                contact@weraisetech.com
              </a>
            </div>
          </div>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GradientButton href="/portfolio" className="w-full sm:w-auto">
              View our work <ArrowRight className="h-4 w-4" />
            </GradientButton>
            <Link href="/" className="text-sm font-semibold text-muted-foreground hover:text-primary">
              Return to homepage
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

