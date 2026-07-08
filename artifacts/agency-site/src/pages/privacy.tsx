import { Link } from "wouter";
import { ChevronRight, Shield, Mail, Globe, Lock, Users, FileText, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const lastUpdated = "July 8, 2026";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `Seichox ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (seichox.dev), use our services, or communicate with us.

This policy applies to all visitors, users, and others who access the site or engage our IT services including web development, full-stack development, e-commerce solutions, SaaS platforms, UI/UX design, SEO, and Shopify development. It covers both local clients in India and international clients worldwide.`
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: `We collect several types of information from and about users of our website and services:

Personal Data:
• Name, email address, phone number (including WhatsApp), and company name when you submit contact forms, request quotes, or book consultations.
• Project details, requirements, budget information, and any other information you voluntarily provide in messages or during discovery calls.
• Billing and payment information when applicable (processed securely by third-party providers; we do not store full card details).

Automatically Collected Information:
• Technical data such as IP address, browser type and version, time zone setting, operating system, device information, and referring website.
• Usage data including pages viewed, time spent on pages, click patterns, and interactions with forms or service pages.
• Cookies and similar tracking technologies (see Cookies section below).

Client Project Data:
• Source code, designs, content, credentials, and third-party API keys you share with us during project execution. We treat all client data as strictly confidential.`
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: `We use the information we collect for the following purposes:

• To provide, operate, and deliver our professional services (web development, SaaS, e-commerce, Shopify builds, UI/UX, SEO, etc.).
• To respond to inquiries, prepare proposals, schedule consultations, and communicate project updates.
• To personalize your experience and improve our website, services, and marketing.
• To send service-related communications, project updates, and (with your consent) occasional newsletters or case studies.
• To comply with legal obligations, enforce our agreements, prevent fraud, and protect the rights of Seichox and our clients.
• For analytics and research to understand how visitors use our site and improve offerings.

We process personal data on the following legal bases (where applicable): consent, performance of a contract, legitimate interests, and legal obligations.`
  },
  {
    id: "cookies",
    title: "4. Cookies and Tracking Technologies",
    content: `We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and remember preferences.

Types of cookies we use:
• Essential cookies: Required for core site functionality (navigation, form submissions).
• Analytics cookies: Help us understand visitor behavior (e.g., Google Analytics).
• Preference cookies: Remember choices such as language or theme preferences.

You can control cookies through your browser settings. Disabling certain cookies may affect site functionality. For more information, review your browser's cookie management tools.`
  },
  {
    id: "sharing",
    title: "5. Sharing and Disclosure of Information",
    content: `We do not sell your personal data. We may share information in the following limited circumstances:

• Service Providers: Trusted third parties who assist us in operating our business (e.g., hosting providers such as Vercel, email delivery via Resend, analytics platforms, cloud infrastructure). These parties are contractually obligated to protect your data.
• Professional Advisors: Lawyers, accountants, or auditors when necessary.
• Legal Requirements: If required by law, court order, or governmental authority, or to protect our rights, property, or safety.
• Business Transfers: In connection with a merger, acquisition, or sale of assets, subject to confidentiality protections.
• With Your Consent: When you explicitly authorize us to share specific information.

Client project data and source materials are never shared with third parties except as strictly necessary to deliver the agreed services (e.g., hosting setup) and always under appropriate safeguards.`
  },
  {
    id: "data-security",
    title: "6. Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include:

• Encryption of data in transit (TLS) and at rest where applicable.
• Access controls and least-privilege principles for our team.
• Secure development practices and regular security reviews.
• Use of reputable, compliant infrastructure providers.

While we strive to use commercially acceptable means to protect your data, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.`
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    content: `We retain personal data only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.

• Contact and inquiry data: Retained for up to 3 years after last interaction, or longer if required for active projects or legal claims.
• Project deliverables and source code: Retained according to the terms of our service agreements (typically provided to you upon project completion).
• Analytics data: Anonymized or aggregated where possible; raw logs are retained for a limited period.

You may request deletion of your personal data (subject to legal and contractual obligations).`
  },
  {
    id: "your-rights",
    title: "8. Your Rights and Choices",
    content: `Depending on your location, you may have the following rights regarding your personal data:

• Access: Request a copy of the personal data we hold about you.
• Correction: Request correction of inaccurate or incomplete data.
• Deletion: Request deletion of your personal data ("right to be forgotten").
• Restriction or Objection: Object to or restrict certain processing activities.
• Data Portability: Receive your data in a structured, machine-readable format.
• Withdraw Consent: Where processing is based on consent, withdraw it at any time.
• Opt-out of Marketing: Unsubscribe from emails at any time via the link provided or by contacting us.

For residents of the European Economic Area (GDPR), California (CCPA/CPRA), or India (Digital Personal Data Protection Act 2023), additional rights may apply.

To exercise any of these rights, please contact us using the details below. We will respond within the timeframes required by applicable law (typically 30 days). We may require verification of your identity.`
  },
  {
    id: "international",
    title: "9. International Data Transfers",
    content: `Seichox is based in India. If you are located outside India, your information may be transferred to, processed, and stored in India or other countries where our service providers operate.

We take appropriate steps to ensure that your personal data receives an adequate level of protection in accordance with this Privacy Policy and applicable data protection laws, including through the use of Standard Contractual Clauses or equivalent safeguards where required.`
  },
  {
    id: "childrens-privacy",
    title: "10. Children's Privacy",
    content: `Our services and website are not directed to children under the age of 13 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect personal information from children. If you believe we have inadvertently collected such data, please contact us immediately so we can take appropriate action.`
  },
  {
    id: "changes",
    title: "11. Changes to This Privacy Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. The "Last Updated" date at the top of this page indicates when the policy was last revised.

We encourage you to review this page periodically. Material changes will be communicated via email (if we have your contact information) or by prominent notice on our website.`
  },
  {
    id: "contact",
    title: "12. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

Seichox
Email: ragulsiva@zohomail.in
Phone / WhatsApp: +91 9080163393
Location: India

We take privacy seriously and will respond promptly to all legitimate inquiries.`
  }
];

export default function PrivacyPolicy() {
  useDocumentTitle(
    "Privacy Policy | Seichox",
    "Learn how Seichox collects, uses, and protects your personal data. Privacy Policy for our web development, SaaS, e-commerce, and digital services."
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
            <span className="text-foreground font-medium">Privacy Policy</span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[2px] mb-6">
              <Shield className="w-3.5 h-3.5" /> Legal
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tighter leading-[1.05] mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              How we collect, use, and protect your information when you engage with Seichox.
            </p>

            <div className="flex items-center gap-4 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Applies globally (GDPR, CCPA, DPDP)</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
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

            {/* Policy Sections */}
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
                <Lock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-1">Important Notice</p>
                  <p>
                    This Privacy Policy is provided as a professional template. Laws vary by jurisdiction. 
                    We recommend consulting with a qualified legal professional to ensure full compliance 
                    for your specific business operations and client base.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">Questions about your data?</p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Contact our team <Mail className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
