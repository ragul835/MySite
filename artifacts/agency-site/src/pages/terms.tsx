import { Link } from "wouter";
import { ChevronRight, Scale, Mail, Globe, FileText, Calendar, AlertTriangle, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const lastUpdated = "July 8, 2026";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Seichox website (seichox.dev), submitting inquiries, or engaging our services, you agree to be bound by these Terms & Conditions ("Terms"). If you do not agree to these Terms, please do not use our website or services.

These Terms constitute a legally binding agreement between you (the "Client") and Seichox ("we," "us," or "our"). They govern your use of our website and all professional services we provide, including but not limited to:

Web Development, Full-Stack Development, E-Commerce Solutions, SaaS Platform Development, UI/UX Design, SEO Services, Shopify Development, and related consulting.`
  },
  {
    id: "services",
    title: "2. Description of Services",
    content: `Seichox provides custom software development and digital services for businesses worldwide. Our offerings include:

• Custom website and web application development using modern frameworks (React, Next.js, Node.js, etc.)
• Full-stack development and scalable backend systems
• E-commerce platforms and Shopify stores (including custom themes, apps, and headless commerce)
• SaaS product development with subscription billing, multi-tenancy, and admin tools
• Professional UI/UX design, research, wireframing, and prototyping
• Technical SEO audits, on-page optimization, and content strategy
• Ongoing maintenance, support, and performance optimization

All services are delivered on a project basis or via retainer agreements as outlined in separate statements of work (SOWs), proposals, or contracts. Estimates and timelines provided are good-faith projections and may be adjusted based on scope changes or unforeseen technical challenges.`
  },
  {
    id: "client-responsibilities",
    title: "3. Client Responsibilities",
    content: `To ensure successful project delivery, you agree to:

• Provide accurate, complete, and timely information, content, assets, credentials, and feedback.
• Designate a primary point of contact with decision-making authority.
• Review and respond to requests for approvals or clarifications within reasonable timeframes (delays may impact project schedules and pricing).
• Ensure you have all necessary rights to any materials, trademarks, images, copy, or third-party content you provide.
• Comply with all applicable laws in your jurisdiction.

You are solely responsible for the accuracy of information supplied to us and for obtaining any required licenses or permissions for third-party assets used in your project.`
  },
  {
    id: "intellectual-property",
    title: "4. Intellectual Property Rights",
    content: `Upon full payment of all applicable fees:

• You will own the custom deliverables specifically created for your project (final designs, source code written exclusively for your project, and compiled assets).
• Seichox retains all rights, title, and interest in any pre-existing materials, frameworks, libraries, code snippets, design systems, tools, methodologies, and general components developed independently or used across multiple clients ("Background IP").
• You receive a perpetual, non-exclusive, non-transferable (unless otherwise agreed) license to use any Background IP incorporated into your deliverables.

You grant Seichox a non-exclusive license to use anonymized project outcomes, screenshots, and case studies for marketing and portfolio purposes unless you explicitly request otherwise in writing.

Third-party libraries, open-source components, and platform services (Shopify, Stripe, etc.) remain subject to their respective license terms.`
  },
  {
    id: "confidentiality",
    title: "5. Confidentiality",
    content: `Both parties agree to keep confidential all non-public information disclosed during the engagement ("Confidential Information").

Seichox will:
• Use reasonable care to protect your Confidential Information.
• Use it solely for performing the agreed services.
• Not disclose it to third parties without your prior written consent, except to employees/contractors with a need to know who are bound by confidentiality obligations.

This obligation does not apply to information that: (a) is or becomes publicly available through no fault of ours; (b) was rightfully known prior to disclosure; (c) is independently developed; or (d) is required to be disclosed by law.

Project source code, business strategies, credentials, and customer data are treated as highly confidential.`
  },
  {
    id: "payments",
    title: "6. Payments and Pricing",
    content: `Pricing and payment schedules are specified in the applicable proposal, SOW, or invoice.

General terms:
• A deposit (typically 30–50%) is usually required to commence work.
• Milestone payments are due upon delivery and approval of defined deliverables.
• Final payment is due before final delivery, handover, or launch.
• Late payments may result in suspension of work and accrual of reasonable interest.
• All prices are exclusive of applicable taxes (GST in India or VAT/sales tax as required).

Scope changes requested after project kickoff will be documented and may result in additional fees and timeline adjustments. We will seek written approval before proceeding with significant changes.`
  },
  {
    id: "warranties",
    title: "7. Warranties, Disclaimers & Limitations",
    content: `Seichox represents that services will be performed in a professional and workmanlike manner consistent with industry standards.

EXCEPT AS EXPRESSLY SET FORTH IN A WRITTEN AGREEMENT, ALL SERVICES AND THE WEBSITE ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.

Specific disclaimers:
• SEO Services: We cannot and do not guarantee specific search engine rankings, traffic volumes, or conversion rates. Search algorithms change frequently and results depend on many factors outside our control.
• Third-party platforms (Shopify, payment gateways, hosting): We are not responsible for outages, policy changes, or limitations imposed by those providers.
• Security: While we implement industry-standard protections, we cannot guarantee that your systems will be completely immune to all threats.

Limitation of Liability: To the maximum extent permitted by law, Seichox's total liability arising out of or related to any engagement shall not exceed the total fees actually paid by you to Seichox for the specific project giving rise to the claim. In no event shall we be liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or business interruption, regardless of the cause.`
  },
  {
    id: "project-delivery",
    title: "8. Project Delivery, Revisions & Support",
    content: `Delivery and revisions are governed by the project agreement:

• We include a reasonable number of revision rounds as defined in the proposal.
• Additional revisions or features beyond the agreed scope will be billed separately.
• Upon final delivery and payment, you are responsible for ongoing hosting, maintenance, backups, and security unless a separate support agreement is in place.
• We provide a limited post-launch support window (typically 14–30 days) for critical bugs related to our deliverables.

For long-term maintenance, performance monitoring, or feature development, we offer retainer or support packages.`
  },
  {
    id: "termination",
    title: "9. Termination",
    content: `Either party may terminate an engagement:

• For convenience: With written notice, subject to payment for all work completed to date and reasonable wind-down costs.
• For cause: If the other party materially breaches these Terms and fails to cure within 15 days of written notice.

Upon termination:
• You will receive all deliverables for which payment has been made.
• Seichox may retain copies of work product as required for legal or archival purposes.
• Provisions that by their nature should survive (IP, confidentiality, limitation of liability, governing law) shall survive termination.`
  },
  {
    id: "governing-law",
    title: "10. Governing Law & Dispute Resolution",
    content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.

Any dispute arising out of or relating to these Terms or our services shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be subject to the exclusive jurisdiction of the courts located in [Your City/State, India — update as needed].

For international clients, we are willing to discuss alternative dispute resolution mechanisms (arbitration or mediation) on a case-by-case basis as part of the service agreement.`
  },
  {
    id: "indemnification",
    title: "11. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Seichox and its team from and against any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to:

• Your use of the deliverables or website
• Content or materials you provided
• Your violation of these Terms or applicable law
• Infringement of third-party rights resulting from materials supplied by you`
  },
  {
    id: "miscellaneous",
    title: "12. Miscellaneous",
    content: `• Entire Agreement: These Terms, together with any signed SOW or proposal, constitute the entire agreement and supersede all prior communications.
• Severability: If any provision is found unenforceable, the remaining provisions remain in effect.
• Waiver: Failure to enforce any right does not constitute a waiver.
• Assignment: You may not assign these Terms without our prior written consent.
• Force Majeure: Neither party is liable for delays caused by events beyond reasonable control (natural disasters, pandemics, government actions, internet outages, etc.).
• Updates: We may update these Terms. Continued use after changes constitutes acceptance of the revised Terms. The date at the top indicates the latest revision.

If any conflict exists between these website Terms and a signed client agreement, the signed agreement shall control.`
  },
  {
    id: "contact",
    title: "13. Contact Information",
    content: `For questions about these Terms & Conditions, proposals, or existing engagements:

Seichox
Email: ragulsiva@zohomail.in
Phone / WhatsApp: +91 9080163393
Location: India

We are committed to clear communication and fair dealings with all our clients, both local and global.`
  }
];

export default function TermsAndConditions() {
  useDocumentTitle(
    "Terms & Conditions | Seichox",
    "Read the Terms & Conditions for Seichox IT services — web development, full-stack, e-commerce, SaaS, UI/UX, SEO, and Shopify development."
  );

  return (
    <div className="w-full flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-36 pb-16 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_0%,hsl(var(--primary)/0.08),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <Container>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/30 text-xs text-muted-foreground mb-8 backdrop-blur-sm">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Legal</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Terms &amp; Conditions</span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[2px] mb-6">
              <Scale className="w-3.5 h-3.5" /> Legal
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tighter leading-[1.05] mb-6">
              Terms &amp; Conditions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              The rules governing the use of our website and professional IT services.
            </p>

            <div className="flex items-center gap-4 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Global clients welcome • Governed by Indian law</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Important Notice Banner */}
            <div className="mb-10 p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-foreground mb-1">Professional Services Agreement</p>
                <p className="text-muted-foreground">
                  These Terms apply to website usage and form the baseline for our client engagements. 
                  Specific projects are also governed by detailed proposals and service agreements.
                </p>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="mb-12 p-6 rounded-2xl border border-border/60 bg-card/30">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                <FileText className="w-4 h-4" /> Quick Navigation
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors py-0.5"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Terms Sections */}
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index} id={section.id} className="scroll-mt-20">
                  <h2 className="text-2xl font-heading font-bold tracking-tight mb-4 text-foreground">
                    {section.title}
                  </h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none text-[15px] leading-relaxed text-muted-foreground">
                    {section.content.split('\n\n').map((paragraph, pIndex) => {
                      if (paragraph.startsWith('•')) {
                        const items = paragraph.split('\n').filter(Boolean);
                        return (
                          <ul key={pIndex} className="list-disc pl-6 space-y-1.5 my-4">
                            {items.map((item, i) => (
                              <li key={i}>{item.replace(/^•\s*/, '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={pIndex} className="mb-4">{paragraph}</p>;
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-16 pt-8 border-t border-border/60">
              <div className="flex items-start gap-3 text-sm text-muted-foreground bg-muted/40 p-5 rounded-xl">
                <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-1">Legal Disclaimer</p>
                  <p>
                    These Terms &amp; Conditions are provided as a comprehensive professional template suitable for an IT services company. 
                    They should be reviewed and customized by a qualified attorney licensed in your jurisdiction to address your specific 
                    operational needs, risk profile, and client contracts.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">Ready to start a project or have questions?</p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Get in touch <Mail className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
