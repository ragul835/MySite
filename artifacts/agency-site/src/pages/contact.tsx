import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Mail, Phone, MapPin, Github, Linkedin, Twitter, ChevronRight, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(20, "Message must be at least 20 characters"),
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

const budgets = [
  "Under $5K",
  "$5K - $10K",
  "$10K - $25K",
  "$25K - $50K",
  "$50K+",
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@nexcore.dev",
    href: "mailto:hello@nexcore.dev",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: null,
  },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceValue, setServiceValue] = useState("");
  const [budgetValue, setBudgetValue] = useState("");

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
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      // TODO: Replace with Spring Boot API call — endpoint: POST /api/v1/contact
      console.log("Contact form submitted:", data);
      toast.success("Message sent! We'll be in touch within 24 hours.");
      reset();
      setServiceValue("");
      setBudgetValue("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative py-24 overflow-hidden border-b border-border/30">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(217 91% 60% / 0.2) 0%, transparent 60%)" }}
        />
        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Contact</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Tell us about your project. We respond to every inquiry within 24 hours — no sales scripts, no runaround.
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Two-column layout */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Form */}
            <AnimateOnScroll className="lg:col-span-3">
              <div className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Send us a message</h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Fill out the form below and we'll come back to you with a clear plan and honest timeline.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        data-testid="input-name"
                        {...register("name")}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
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
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="Acme Inc."
                        data-testid="input-company"
                        {...register("company")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        data-testid="input-phone"
                        {...register("phone")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Service Needed *</Label>
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

                    <div className="space-y-2">
                      <Label>Budget Range *</Label>
                      <Select
                        value={budgetValue}
                        onValueChange={(val) => {
                          setBudgetValue(val);
                          setValue("budget", val);
                          trigger("budget");
                        }}
                      >
                        <SelectTrigger data-testid="select-budget" className={errors.budget ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgets.map((b) => (
                            <SelectItem key={b} value={b}>{b}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.budget && (
                        <p className="text-xs text-destructive">{errors.budget.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project — what you're building, where you're at, and what you need from us."
                      rows={5}
                      data-testid="textarea-message"
                      {...register("message")}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      data-testid="button-submit-contact"
                      className="w-full py-6 bg-gradient-to-r from-primary to-accent text-white font-semibold text-base hover:opacity-90 transition-opacity"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </AnimateOnScroll>

            {/* Contact Info */}
            <AnimateOnScroll delay={0.2} className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Let's talk directly
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Prefer a more direct conversation? We're reachable on all of these channels.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div
                        key={info.label}
                        className="p-5 rounded-xl border border-border/50 bg-card/50 flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
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

                <div className="p-6 rounded-xl border border-border/50 bg-card/50">
                  <p className="text-sm font-semibold text-foreground mb-4">Follow us</p>
                  <div className="flex items-center gap-3">
                    {socials.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`link-social-${social.label.toLowerCase()}`}
                          className="w-10 h-10 rounded-lg border border-border/50 bg-background/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Decorative element */}
                <div
                  className="h-40 rounded-2xl border border-border/30 overflow-hidden relative"
                  style={{ background: "linear-gradient(135deg, hsl(217 91% 60% / 0.08) 0%, hsl(221 83% 53% / 0.12) 100%)" }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "linear-gradient(hsl(0 0% 20%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 20%) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground text-center px-6">
                      Response time:{" "}
                      <span className="text-primary font-semibold">within 24 hours</span>
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>
    </main>
  );
}
