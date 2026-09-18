/** Site-wide SEO constants and structured-data helpers for We Raise Tech. */

export const SITE_URL = "https://weraisetech.com";
export const SITE_NAME = "We Raise Tech";
export const SITE_LEGAL_NAME = "We Raise Tech";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.png`;
export const TWITTER_HANDLE = "@weraisetech";
export const CONTACT_EMAIL = "ragulsiva@zohomail.in";
export const CONTACT_PHONE = "+919080163393";
export const LOCALE = "en_IN";

export const DEFAULT_KEYWORDS = [
  "web development company",
  "custom software development",
  "mobile app development",
  "SaaS development",
  "e-commerce development",
  "Shopify development",
  "UI UX design",
  "technical SEO",
  "website maintenance",
  "full stack development",
  "We Raise Tech",
  "India software agency",
];

export function absoluteUrl(path = "/"): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function absoluteImageUrl(image?: string | null): string {
  if (!image) return DEFAULT_OG_IMAGE;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return absoluteUrl(image.startsWith("/") ? image : `/${image}`);
}

export function titleWithBrand(title: string, brand = SITE_NAME): string {
  if (!title) return brand;
  if (title.includes(brand)) return title;
  return `${title} | ${brand}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/we-raise-tech-logo.png"),
    },
    image: DEFAULT_OG_IMAGE,
    description:
      "We Raise Tech is a software engineering agency building websites, mobile apps, SaaS platforms, e-commerce stores, and custom software with ongoing maintenance and support.",
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: "Worldwide",
    sameAs: [
      "https://github.com",
      "https://linkedin.com",
      "https://twitter.com",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE,
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Web development, mobile apps, SaaS, e-commerce, custom software, SEO, UI/UX, and website maintenance by We Raise Tech.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    image: DEFAULT_OG_IMAGE,
    url: SITE_URL,
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    knowsAbout: DEFAULT_KEYWORDS,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: absoluteImageUrl(input.image),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "Worldwide",
    serviceType: input.name,
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: [absoluteImageUrl(input.image)],
    author: {
      "@type": "Organization",
      name: input.authorName || SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/we-raise-tech-logo.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(input.path),
    },
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    keywords: input.keywords?.join(", "),
    inLanguage: "en",
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function itemListJsonLd(
  name: string,
  items: { name: string; path: string; description?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
      description: item.description,
    })),
  };
}

/** Static SEO copy for top-level routes */
export const PAGE_SEO = {
  home: {
    title: "We Raise Tech | Web, Mobile App & Custom Software Development Agency",
    description:
      "We Raise Tech designs and builds high-performance websites, mobile apps, SaaS platforms, e-commerce stores, and custom software — plus SEO, UI/UX, and website maintenance. Free discovery call.",
    path: "/",
    keywords: DEFAULT_KEYWORDS,
  },
  about: {
    title: "About We Raise Tech | Software Engineering Agency",
    description:
      "Learn about We Raise Tech — a product-focused engineering team delivering web, mobile, SaaS, and custom software with transparent process and long-term support.",
    path: "/about",
  },
  services: {
    title: "Software Development Services | Web, Mobile, SaaS & More | We Raise Tech",
    description:
      "Explore We Raise Tech services: web development, full-stack apps, e-commerce, SaaS, Shopify, SEO, UI/UX, CRO, website maintenance, mobile apps, and custom software.",
    path: "/services",
  },
  solutions: {
    title: "Solutions & Delivery Process | We Raise Tech",
    description:
      "See how We Raise Tech plans, designs, builds, and supports digital products — discovery through deployment for startups and growing businesses.",
    path: "/solutions",
  },
  portfolio: {
    title: "Portfolio & Case Studies | We Raise Tech Client Projects",
    description:
      "Browse unique case studies for every We Raise Tech service — web, full-stack, ecommerce, SaaS, SEO, UI/UX, Shopify, CRO, maintenance, mobile apps, and custom software.",
    path: "/portfolio",
  },
  blog: {
    title: "Blog | Web, Mobile, SaaS & Software Insights | We Raise Tech",
    description:
      "Expert guides from We Raise Tech on web development, full-stack engineering, ecommerce, SaaS, SEO, UI/UX, Shopify, CRO, maintenance, mobile apps, and custom software.",
    path: "/blog",
  },
  contact: {
    title: "Contact We Raise Tech | Free Project Consultation",
    description:
      "Contact We Raise Tech for web, mobile, SaaS, or custom software projects. Tell us about your goals — we respond within 24 hours. Free discovery call.",
    path: "/contact",
  },
  privacy: {
    title: "Privacy Policy | We Raise Tech",
    description:
      "Read how We Raise Tech collects, uses, and protects personal information when you use our website and services.",
    path: "/privacy",
  },
  terms: {
    title: "Terms & Conditions | We Raise Tech",
    description:
      "Terms governing use of the We Raise Tech website and engagement of our software development and digital services.",
    path: "/terms",
  },
  notFound: {
    title: "Page Not Found | We Raise Tech",
    description: "The page you requested does not exist. Return home or explore We Raise Tech services, portfolio, and blog.",
    path: "/404",
    noindex: true,
  },
} as const;
