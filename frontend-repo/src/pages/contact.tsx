import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Mail, Phone, MapPin, Github, Linkedin,
  ChevronRight, Send, Info, Plus, Minus, Sparkles, ArrowRight, Clock, MessageSquare, Facebook, Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import logger from "@/lib/logger";
import { useSEO } from "@/hooks/useDocumentTitle";
import { PAGE_SEO, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid WhatsApp number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(1, "Please enter a message"),
});
type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  "Full-Stack Development", "E-Commerce Development", "SaaS Development",
  "UI/UX Design", "SEO Services", "Shopify Development", "E-Commerce Optimization",
  "Website Maintenance & Support", "Mobile App Development", "Custom Software Development", "Other",
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "ragulsiva@zohomail.in", href: "mailto:ragulsiva@zohomail.in" },
  { icon: Phone, label: "WhatsApp", value: "+91 9080163393", href: "tel:+919080163393" },
  { icon: MapPin, label: "Location", value: "India", href: null },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: null },
];

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: XIcon, label: "X", href: "https://twitter.com" },
];

const faqData = [
  { q: "How quickly will I hear back?", a: "We guarantee a response as soon as possible on business days. Our team acts quickly to address your inquiries." },
  { q: "What happens after I submit the form?", a: "A senior team member reviews your inquiry and schedules a free 30-minute discovery call to discuss your project." },
  { q: "Is the initial consultation free?", a: "Yes. The discovery call and initial project estimate are completely free with no obligations." },
  { q: "Can I reach you outside of business hours?", a: "We monitor our inbox around the clock. Urgent inquiries get a prompt acknowledgment even on weekends." },
  { q: "What information should I include?", a: "Include a brief description, your timeline, approximate budget range, and any preferred technologies for a more tailored response." },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceValue, setServiceValue] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: PAGE_SEO.contact.title,
    description: PAGE_SEO.contact.description,
    path: PAGE_SEO.contact.path,
    brandTitle: false,
    keywords: ["contact We Raise Tech", "hire web developers", "software development consultation"],
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
      faqJsonLd(faqData.map((f) => ({ question: f.q, answer: f.a }))),
    ],
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (window.location.hash === "#contact-form") {
        document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const { register, handleSubmit, formState: { errors }, reset, setValue, trigger } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const start = Date.now();
    try {
      logger.info("Submitting contact form", { service: data.service });
      const API_BASE = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API_BASE}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      logger.api("POST", "/api/v1/contact", res.status, Date.now() - start);
      let json: Record<string, unknown> = {};
      const text = await res.text();
      if (text) { try { json = JSON.parse(text); } catch {} }
      if (res.status === 429) { toast.error("Too many requests — please wait a minute."); return; }
      if (!res.ok) throw new Error((json.message as string) ?? "Submission failed.");
      toast.success((json.message as string) ?? "Message sent! We'll be in touch within 24 hours.");
      reset();
      setServiceValue("");
    } catch (err: unknown) {
      logger.error("Contact form submission failed", err);
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-14 pt-16 sm:pb-16 sm:pt-24 lg:pt-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_0%,hsl(var(--primary)/0.1),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] -z-10 animate-orb-drift" />

        <Container>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/30 text-xs text-muted-foreground mb-10 backdrop-blur-sm">
            <Link id="contact-breadcrumb-home" href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Contact</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Now Taking New Clients
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tighter leading-[1.05] mb-6 text-foreground">
                Let's Build{" "}
                <span className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent animate-gradient">
                  Something Great
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
                Tell us about your project, your constraints, and your goals. We respond to every inquiry within 24 hours — no sales scripts, no runaround.
              </p>
              {/* Info chips */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Clock, text: "24h Response" },
                  { icon: MessageSquare, text: "Free Consultation" },
                  { icon: Sparkles, text: "No Obligations" },
                ].map((chip) => (
                  <div key={chip.text} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/30 text-xs font-medium text-muted-foreground backdrop-blur-sm">
                    <chip.icon className="w-3.5 h-3.5 text-primary" />
                    {chip.text}
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            {/* Contact info sidebar */}
            <AnimateOnScroll delay={0.2}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.label} className="premium-card group min-w-0 p-5 transition-all">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} data-testid={`link-contact-${info.label.toLowerCase()}`} className="break-words text-sm font-medium text-foreground transition-colors hover:text-primary">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{info.value}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Form + Info ── */}
      <section id="contact-form" className="py-16 md:py-20 scroll-mt-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Form */}
            <AnimateOnScroll className="lg:col-span-3">
              <div className="premium-card rounded-3xl overflow-hidden !shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/8 rounded-bl-full blur-3xl pointer-events-none" />
                <div className="relative p-7 md:p-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Send className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-heading font-extrabold text-foreground">Send us a message</h2>
                  </div>
                  <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" data-testid="form-contact">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name <span className="text-destructive">*</span></Label>
                        <Input id="name" placeholder="Your name" data-testid="input-name" {...register("name")} className={errors.name ? "border-destructive" : ""} />
                        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email <span className="text-destructive">*</span></Label>
                        <Input id="email" type="email" placeholder="your@email.com" data-testid="input-email" {...register("email")} className={errors.email ? "border-destructive" : ""} />
                        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">WhatsApp <span className="text-destructive">*</span></Label>
                        <Input id="phone" type="tel" placeholder="+91 12345 67890" data-testid="input-phone" {...register("phone")} className={errors.phone ? "border-destructive" : ""} />
                        {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Service <span className="text-destructive">*</span></Label>
                        <Select value={serviceValue} onValueChange={(val) => { setServiceValue(val); setValue("service", val); trigger("service"); }}>
                          <SelectTrigger data-testid="select-service" className={errors.service ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        {errors.service && <p className="text-xs text-destructive">{errors.service.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5">
                        Message <span className="text-destructive">*</span>
                        <span title="A brief description of your project helps us prepare a better response" className="text-muted-foreground/60">
                          <Info className="w-3 h-3" />
                        </span>
                      </Label>
                      <Textarea id="message" placeholder="Tell us about your project, timeline, and goals..." rows={5} data-testid="textarea-message" {...register("message")} className={errors.message ? "border-destructive" : ""} />
                      {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      data-testid="button-submit-contact"
                      className="w-full py-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-base shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" /> Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right column */}
            <AnimateOnScroll delay={0.2} className="lg:col-span-2 space-y-6">
              {/* Social links */}
              <div className="premium-card p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Follow our journey</p>
                <div className="flex items-center gap-3">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                        data-testid={`link-social-${s.label.toLowerCase()}`}
                        className="w-10 h-10 rounded-xl border border-border/50 bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all">
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Response widget */}
              <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm overflow-hidden p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-2xl rounded-bl-full pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center text-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full border border-primary/30 animate-[ping_3s_ease-out_infinite]" />
                    <div className="w-14 h-14 rounded-full bg-card border border-primary/20 flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-heading font-bold text-foreground">Guaranteed Response</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Within <span className="text-primary font-bold">24 Hours</span></p>
                  </div>
                </div>
              </div>

              {/* FAQ mini */}
              <div className="premium-card p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Quick Questions</p>
                <div className="space-y-2">
                  {faqData.slice(0, 3).map((item, i) => (
                    <div key={i} className={`rounded-xl border transition-all overflow-hidden ${openFaq === i ? "border-primary/30 bg-primary/[0.02]" : "premium-card hover:bg-card/90"}`}>
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-3 p-4 text-left cursor-pointer">
                        <span className="text-sm font-medium text-foreground">{item.q}</span>
                        {openFaq === i ? <Minus className="w-3.5 h-3.5 text-primary shrink-0" /> : <Plus className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
                      </button>
                      <div className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                           <p className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>
    </div>
  );
}
