import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Mail, Phone, MapPin, Github, Linkedin, Twitter, ChevronRight, Send, Info, Plus, Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll, AnimatedItem } from "@/components/shared/AnimateOnScroll";
import logger from "@/lib/logger";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid WhatsApp number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(1, "Please enter a message"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  "Full-Stack Development",
  "E-Commerce Development",
  "SaaS Development",
  "UI/UX Design",
  "SEO Services",
  "Shopify Development",
  "E-Commerce Optimization",
  "Other",
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@nexcore.com",
    href: "mailto:contact@nexcore.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9080163393",
    href: "tel:+919080163393",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: null,
  },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
];

const contactFaqData = [
  {
    question: "How quickly will I hear back after submitting the form?",
    answer:
      "We guarantee a response within 24 hours on business days. Most inquiries get a reply within 4–6 hours. You'll receive a confirmation email immediately after submitting.",
  },
  {
    question: "What happens after I send a message?",
    answer:
      "A senior team member reviews your inquiry and schedules a free 30-minute discovery call. During the call, we'll discuss your project requirements, timeline, and budget to determine the best path forward.",
  },
  {
    question: "Is the initial consultation free?",
    answer:
      "Yes. The discovery call and initial project estimate are completely free with no obligations. We'll provide a transparent breakdown of scope, timeline, and cost so you can make an informed decision.",
  },
  {
    question: "Can I reach you outside of business hours?",
    answer:
      "We monitor our inbox around the clock. While detailed responses may come during business hours, urgent inquiries submitted evenings or weekends will still get a prompt acknowledgment.",
  },
  {
    question: "What information should I include in my message?",
    answer:
      "The more context, the better! Include a brief description of your project or idea, your timeline expectations, approximate budget range, and any specific technologies you prefer. This helps us prepare a more tailored response.",
  },
];

function ContactFAQAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <AnimatedItem>
      <div
        className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
          isOpen
            ? "border-primary/40 bg-primary/[0.03] shadow-[0_0_30px_hsl(var(--primary)/0.08)]"
            : "border-border/50 bg-card/30 hover:border-border/80 hover:bg-card/50"
        }`}
      >
        <button
          onClick={onToggle}
          data-testid={`contact-faq-toggle-${index}`}
          className="w-full flex items-start gap-4 p-6 md:p-7 text-left cursor-pointer"
        >
          <span
            className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              isOpen
                ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                : "bg-muted/80 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-base md:text-lg font-heading font-semibold transition-colors ${
                isOpen ? "text-foreground" : "text-foreground/90"
              }`}
            >
              {item.question}
            </h3>
          </div>

          <span
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? "bg-primary/15 text-primary rotate-0"
                : "bg-muted/60 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            }`}
          >
            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </span>
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-6 md:px-7 pb-6 md:pb-7 pl-[4.25rem] md:pl-[4.75rem]">
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedItem>
  );
}

function ContactFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/15 to-transparent pointer-events-none" />
      <Container>
        <AnimateOnScroll>
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Common questions about getting in touch and working with us."
          />
        </AnimateOnScroll>

        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll stagger>
            <div className="space-y-4">
              {contactFaqData.map((item, i) => (
                <ContactFAQAccordionItem
                  key={item.question}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceValue, setServiceValue] = useState("");

  useDocumentTitle(
    "Contact Us | NexCore",
    "Get in touch with NexCore. Tell us about your project and we'll respond within 24 hours with a clear plan and honest assessment."
  );


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (window.location.hash === "#contact-form") {
        const element = document.getElementById("contact-form");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm<ContactFormData>({
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

      // Safely parse JSON — handle empty or non-JSON responses
      let json: Record<string, unknown> = {};
      const text = await res.text();
      if (text) {
        try { json = JSON.parse(text); } catch { /* empty or non-JSON body */ }
      }

      if (res.status === 429) {
        toast.error("Too many requests — please wait a minute and try again.");
        return;
      }
      if (!res.ok) {
        throw new Error((json.message as string) ?? "Submission failed. Please try again.");
      }
      toast.success((json.message as string) ?? "Message sent! We'll be in touch within 24 hours.");
      reset();
      setServiceValue("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      logger.error("Contact form submission failed", err);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative py-32 overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        
        {/* Massive Glowing Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(221 83% 53%) 0%, transparent 70%)" }}
          />
        </div>

        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium mb-8">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  We are currently taking new clients
                </div>
                
                <h1 className="text-6xl md:text-8xl font-heading font-bold text-foreground tracking-tight leading-tight mb-8">
                  Let's Build <br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Together.</span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg border-l-4 border-primary/30 pl-6">
                  Tell us about your project, your constraints, and your goals. We respond to every inquiry within 24 hours — no sales scripts, no runaround.
                </p>
              </div>
              
              <div className="hidden lg:flex justify-end">
                {/* Floating Decorative Contact Visual */}
                <div 
                  className="relative w-80 h-80 rounded-3xl bg-card/40 border border-white/10 backdrop-blur-2xl shadow-2xl flex items-center justify-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
                  <div className="w-32 h-32 rounded-full bg-primary/20 blur-2xl absolute" />
                  <Mail className="w-24 h-24 text-primary relative z-10 drop-shadow-xl" />
                  
                  {/* Floating elements */}
                  <div 
                    className="absolute top-12 right-12 w-12 h-12 rounded-xl bg-secondary/20 border border-secondary/30 backdrop-blur-md flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 text-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Two-column */}
      <section id="contact-form" className="relative py-24 scroll-mt-24 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.05),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--secondary)/0.05),transparent_50%)] pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
            {/* Contact Form */}
            <AnimateOnScroll className="lg:col-span-3">
              <div className="relative p-8 md:p-10 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-heading font-extrabold text-foreground mb-3 tracking-tight">Send us a message</h2>
                  <p className="text-muted-foreground text-base mb-10 leading-relaxed max-w-md">
                    Fill out the form below and our team will get back to you within 24 hours to discuss your vision.
                  </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        data-testid="input-name"
                        {...register("name")}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        data-testid="input-email"
                        {...register("email")}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">WhatsApp Number <span className="text-destructive">*</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 12345 67890"
                        data-testid="input-phone"
                        {...register("phone")}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Service Interest <span className="text-destructive">*</span></Label>
                      <Select
                        value={serviceValue}
                        onValueChange={(val) => {
                          setServiceValue(val);
                          setValue("service", val);
                          trigger("service");
                        }}
                      >
                        <SelectTrigger data-testid="select-service" className={errors.service ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p className="text-xs text-destructive">{errors.service.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="inline-flex items-center gap-1.5">
                      Message <span className="text-destructive">*</span>
                      <span className="text-muted-foreground" title="A brief description of your project helps us prepare a better response">
                        <Info className="w-3.5 h-3.5" />
                      </span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      rows={5}
                      data-testid="textarea-message"
                      {...register("message")}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      data-testid="button-submit-contact"
                      className="w-full py-7 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending securely...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </div>
                  </form>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Contact Info */}
            <AnimateOnScroll delay={0.2} className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-heading font-extrabold text-foreground mb-3 tracking-tight">
                    Let's talk directly
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Prefer a more direct conversation? We're reachable on all of these channels and always ready to help.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div
                        key={info.label}
                        className="group p-6 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm shadow-sm hover:bg-card/40 hover:border-primary/30 transition-all flex items-center gap-5 cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">{info.label}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              data-testid={`link-contact-${info.label.toLowerCase()}`}
                              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium text-foreground">{info.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-8 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm shadow-sm">
                  <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-6">Follow our journey</p>
                  <div className="flex items-center gap-4">
                    {socials.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`link-social-${social.label.toLowerCase()}`}
                          className="w-10 h-10 rounded-lg border border-border bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Premium Animated Response Widget */}
                <div className="relative h-40 rounded-2xl overflow-hidden bg-card/60 backdrop-blur-xl border border-border/50 shadow-lg group flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="relative flex items-center justify-center">
                      {/* Animated Radar Rings Centered on Dot */}
                      <div className="absolute w-24 h-24 rounded-full border border-primary/30 animate-[ping_3s_ease-out_infinite] pointer-events-none" />
                      <div className="absolute w-16 h-16 rounded-full border border-primary/40 animate-[ping_3s_ease-out_infinite_1s] pointer-events-none" />
                      
                      <div className="w-12 h-12 rounded-full bg-background border border-border/50 shadow-md flex items-center justify-center relative z-10">
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse" />
                        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping absolute" />
                        <div className="w-2.5 h-2.5 rounded-full bg-primary relative z-10" />
                      </div>
                    </div>
                    
                    <div className="text-center relative z-10 bg-background/80 px-4 py-1 rounded-full backdrop-blur-md border border-border/50">
                      <p className="text-sm font-semibold text-foreground">Guaranteed Response</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Within <span className="text-primary font-bold">24 Hours</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <ContactFAQSection />
    </main>
  );
}
