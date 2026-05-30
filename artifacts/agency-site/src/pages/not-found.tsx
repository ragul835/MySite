import { Link } from "wouter";
import { ArrowLeft, Search } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GradientButton } from "@/components/shared/GradientButton";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("404 — Page Not Found | NexCore");

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-[100px]"
          style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)" }}
        />
      </div>

      <Container className="relative z-10 text-center max-w-2xl">
        {/* Animated 404 number */}
        <div className="relative mb-8">
          <span className="text-[10rem] md:text-[14rem] font-heading font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary/20 to-primary/5 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center backdrop-blur-sm shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
              <Search className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <GradientButton href="/" className="px-10 py-4 text-base">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </GradientButton>
      </Container>
    </section>
  );
}
