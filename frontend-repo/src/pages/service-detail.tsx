import { useParams, Link } from "wouter";
import { useState } from "react";
import { PopupModal } from "react-calendly";
import {
  ChevronRight, ShoppingCart, Layout, Search, Cloud, PenTool,
  ShoppingBag, Zap, Rocket, Code, ArrowRight, CheckCircle,
  Shield, Layers, Target, Users, Clock, Globe,
  Database, MonitorSmartphone, LineChart,
  Wrench, Sparkles, TrendingUp, X, Lock, Check,
  Building2, Stethoscope, Briefcase, Factory, Banknote,
  Settings, Smartphone, Terminal, ShieldCheck, Activity, Bell, Heart
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useSEO } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/data/services";
import {
  breadcrumbJsonLd,
  serviceJsonLd,
  faqJsonLd,
  serviceMetaDescription,
} from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const IconMap: Record<string, any> = {
  ShoppingCart, Layout, Search, Cloud, PenTool, ShoppingBag,
  TrendingUp, Code, Shield, Layers, Target, Users, Clock,
  Globe, Database, MonitorSmartphone, LineChart, Wrench, Sparkles, Zap, Rocket,
  Settings, Smartphone, Terminal, ShieldCheck, Activity, Bell, Heart, CheckCircle, Lock
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const service = SERVICES.find(s => s.slug === slug);

  useSEO(
    service
      ? {
          title: `${service.title} | We Raise Tech Services`,
          description: serviceMetaDescription(service.title, service.description),
          path: `/services/${service.slug}`,
          brandTitle: false,
          keywords: [
            service.title,
            service.slug.replace(/-/g, " "),
            ...service.technologies.slice(0, 5),
            "We Raise Tech",
          ],
          jsonLd: [
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
            ]),
            serviceJsonLd({
              name: service.title,
              description: service.description,
              path: `/services/${service.slug}`,
            }),
            faqJsonLd(
              (service.faqs || []).map((f) => ({
                question: f.question,
                answer: f.answer,
              }))
            ),
          ],
        }
      : {
          title: "Service Not Found | We Raise Tech",
          description: "The requested service page does not exist. Browse all We Raise Tech software development services.",
          path: slug ? `/services/${slug}` : "/services",
          brandTitle: false,
          noindex: true,
        }
  );

  if (!service) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[60vh] text-center pt-32">
        <h1 className="text-4xl font-heading font-extrabold mb-4">Service Not Found</h1>
        <p className="text-muted-foreground mb-8">The service you are looking for does not exist.</p>
        <Link href="/services" className="text-primary hover:underline">
          View all services
        </Link>
      </div>
    );
  }

  const MainIcon = IconMap[service.icon] || Code;

  // Split title to highlight the last word or two
  const titleWords = service.title.split(" ");
  const highlightCount = titleWords.length > 2 ? 2 : 1;
  const mainTitle = titleWords.slice(0, titleWords.length - highlightCount).join(" ");
  const highlightTitle = titleWords.slice(titleWords.length - highlightCount).join(" ");

  return (
    <div className="w-full flex flex-col">
      {/* ── Hero ── */}
      <section className="relative pt-32 sm:pt-40 pb-20 lg:pb-32 overflow-hidden bg-slate-50/50 dark:bg-background">
        {/* Dot pattern background */}
        <div className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-10 bg-[radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-background/80 text-xs font-medium text-muted-foreground mb-8">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <MainIcon className="w-3 h-3 text-primary" />
                </div>
                Service Details
              </div>

              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[1.1] mb-6 text-foreground">
                {mainTitle} <span className="text-primary">{highlightTitle}</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                {service.longDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <GradientButton href="/contact#contact-form" className="px-8 py-3.5 text-sm font-semibold rounded-full shadow-lg shadow-primary/20">
                  Start Your Project Today
                </GradientButton>
                <button onClick={() => setIsCalendlyOpen(true)} className="px-6 py-3.5 rounded-full text-foreground hover:text-primary transition-colors text-sm font-semibold flex items-center gap-2 group cursor-pointer">
                  Book a Free Call <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>


            </AnimateOnScroll>

            {/* Right: Floating Card */}
            <AnimateOnScroll delay={0.2} className="relative hidden lg:block">
              <div className="bg-background rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-border/50 max-w-md mx-auto relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-8">
                  <MainIcon className="w-10 h-10 text-primary" />
                </div>



                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Industries We Serve</div>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50 border border-border/50 text-xs font-medium text-foreground"><Banknote className="w-3.5 h-3.5" /> Fintech</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50 border border-border/50 text-xs font-medium text-foreground"><Stethoscope className="w-3.5 h-3.5" /> Healthcare</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50 border border-border/50 text-xs font-medium text-foreground"><Cloud className="w-3.5 h-3.5" /> SaaS</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50 border border-border/50 text-xs font-medium text-foreground"><ShoppingCart className="w-3.5 h-3.5" /> Retail</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50 border border-border/50 text-xs font-medium text-foreground"><Briefcase className="w-3.5 h-3.5" /> Enterprise</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50 border border-border/50 text-xs font-medium text-foreground"><Factory className="w-3.5 h-3.5" /> Manufacturing</span>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-primary bg-primary/5 rounded-lg px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  Open for new projects
                </div>
              </div>

              {/* Decorative blobs behind card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 to-transparent blur-3xl -z-10 rounded-full"></div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Hurdles Section ── */}
      <section className="py-20 lg:py-32 bg-background border-t border-border/10 relative">
        <Container>
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
                Are you facing any of these <span className="text-primary">{service.title} challenges</span>?
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left: Hurdles */}
            <AnimateOnScroll>
              <div className="border-b border-destructive/20 pb-2 mb-6 inline-block">
                <h3 className="text-xl font-bold">Common Business & Technical Hurdles</h3>
              </div>
              <div className="flex flex-col gap-3">
                {service.hurdles?.map((hurdle, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-card border border-border/50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <span className="font-medium text-foreground">{hurdle}</span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            {/* Right: Solution */}
            <AnimateOnScroll delay={0.2}>
              <div className="border-b border-primary/20 pb-2 mb-6 inline-block">
                <h3 className="text-xl font-bold">Our Proven {service.title} Solution</h3>
              </div>
              <div className="bg-slate-50 dark:bg-muted/20 border border-border/50 rounded-2xl p-8 lg:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <h4 className="text-xl font-bold">Comprehensive Solution</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We provide a complete development and optimization service that solves these common pain points. From improving performance and SEO to seamless integrations and post-launch support, we deliver a platform that's <strong className="text-foreground">fast, scalable, secure, and conversion-focused</strong>, helping you grow your digital revenue.
                </p>

                <div className="text-sm text-muted-foreground mb-4">Transform Your Business Today</div>
                <div className="flex flex-wrap items-center gap-4">
                  <GradientButton href="/contact" className="px-6 py-2.5 text-sm font-semibold rounded-lg shadow-md">
                    Let's Build It <ArrowRight className="w-4 h-4 ml-1 inline" />
                  </GradientButton>
                  <button onClick={() => setIsCalendlyOpen(true)} className="text-foreground hover:text-primary transition-colors text-sm font-semibold flex items-center gap-2 group cursor-pointer">
                    Book a Free Call <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Features / Offerings ── */}
      <section className="py-20 lg:py-32 bg-slate-50/50 dark:bg-muted/10">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimateOnScroll>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight mb-4">
                Our {service.title.split(" ")[0]} <span className="text-primary">Service Offerings</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                From full custom builds to platform migrations and enhancements, we cover the full spectrum of services to support you throughout the journey.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {service.features.map((feature, idx) => {
              const words = feature.title.split(" ");
              const featureMain = words.slice(0, words.length > 2 ? 2 : 1).join(" ");
              const featureEnd = words.slice(words.length > 2 ? 2 : 1).join(" ");

              return (
                <AnimateOnScroll key={idx} delay={idx * 0.1}>
                  <div className="bg-background rounded-[1.5rem] border border-border/50 p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all h-full flex flex-col group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <MainIcon className="w-6 h-6 text-primary" />
                    </div>

                    <h4 className="text-xl font-bold mb-4 leading-tight">
                      <span className="text-primary">{featureMain}</span> {featureEnd}
                    </h4>

                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed">{feature.description}</p>

                    {feature.details && feature.details.length > 0 && (
                      <ul className="space-y-3 mt-auto pt-6 border-t border-border/30">
                        {feature.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </Container>
      </section>



      {/* ── Technologies (Dark Section) ── */}
      <section className="py-20 lg:py-32 relative bg-[#060D1A] overflow-hidden">
        {/* Dark theme specific dot grid */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent -z-10 blur-3xl"></div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <AnimateOnScroll>
                <div className="text-xs font-bold tracking-widest text-primary uppercase mb-2">Custom Engineering</div>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-6">
                  Need a tailored architecture for your project?
                </h2>
                <p className="text-slate-400 mb-8 text-lg">
                  We adapt our stack to your infrastructure, compliance requirements, and scale. No cookie-cutter solutions.
                </p>
                <GradientButton href="/contact" className="px-8 shadow-lg shadow-primary/20">
                  Discuss your stack <ArrowRight className="w-4 h-4 ml-2 inline" />
                </GradientButton>
              </AnimateOnScroll>
            </div>

            <div className="lg:col-span-8">
              <AnimateOnScroll delay={0.2}>
                <div className="space-y-10">
                  {/* Category 1 */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="px-3 py-1 rounded bg-slate-800 border border-slate-700">
                        <Code className="w-4 h-4 text-slate-300" />
                      </div>
                      <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">Core Stack & Frameworks</h4>
                      <div className="h-[1px] flex-1 bg-slate-800"></div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {service.technologies.slice(0, 4).map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-sm font-medium text-slate-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="px-3 py-1 rounded bg-slate-800 border border-slate-700">
                        <Database className="w-4 h-4 text-slate-300" />
                      </div>
                      <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">Database & Infrastructure</h4>
                      <div className="h-[1px] flex-1 bg-slate-800"></div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {service.technologies.slice(4).map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-sm font-medium text-slate-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          {tech}
                        </div>
                      ))}
                      {/* Filler technologies to make it look robust if the array is short */}
                      {service.technologies.length < 5 && (
                        <>
                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-sm font-medium text-slate-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            AWS / DigitalOcean
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-sm font-medium text-slate-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            GitHub Actions CI/CD
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Category 3: Security */}
                  {service.security && service.security.length > 0 && (
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="px-3 py-1 rounded bg-slate-800 border border-slate-700">
                          <Shield className="w-4 h-4 text-slate-300" />
                        </div>
                        <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">Security & Optimization</h4>
                        <div className="h-[1px] flex-1 bg-slate-800"></div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {service.security.map((sec, idx) => (
                          <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-sm font-medium text-slate-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {sec.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20 lg:py-32 bg-slate-50 dark:bg-background">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <AnimateOnScroll>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight mb-4">
                {service.title} FAQs
              </h2>
              <p className="text-muted-foreground text-lg">
                Common questions about our enterprise software development services and process.
              </p>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 items-start">
              {/* Left Column */}
              <div className="flex flex-col gap-4">
                {service.faqs.filter((_, i) => i % 2 === 0).map((faq, idx) => (
                  <Accordion type="single" collapsible className="w-full bg-background rounded-xl border border-border/50 shadow-sm px-6" key={`left-${idx}`}>
                    <AccordionItem value={`item-left-${idx}`} className="border-none">
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
              
              {/* Right Column */}
              <div className="flex flex-col gap-4">
                {service.faqs.filter((_, i) => i % 2 !== 0).map((faq, idx) => (
                  <Accordion type="single" collapsible className="w-full bg-background rounded-xl border border-border/50 shadow-sm px-6" key={`right-${idx}`}>
                    <AccordionItem value={`item-right-${idx}`} className="border-none">
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
                
                {/* Optional duplicate filler for visual balance if few FAQs */}
                {service.faqs.length % 2 !== 0 && (
                  <Accordion type="single" collapsible className="w-full bg-background rounded-xl border border-border/50 shadow-sm px-6">
                    <AccordionItem value="item-filler" className="border-none">
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                        Do you provide ongoing maintenance and support?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        Yes, we offer comprehensive post-launch support and maintenance packages to ensure your platform remains secure, fast, and up-to-date with the latest technologies.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {isCalendlyOpen && (
        <PopupModal
          url="https://calendly.com/weraisetech"
          onModalClose={() => setIsCalendlyOpen(false)}
          open={isCalendlyOpen}
          rootElement={document.getElementById("root") || document.body}
        />
      )}
    </div>
  );
}
 
