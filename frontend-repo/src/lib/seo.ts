/** Site-wide SEO constants and structured-data helpers for We Raise Tech. */

export const SITE_URL = "https://weraisetech.com";
export const SITE_NAME = "We Raise Tech";
export const SITE_LEGAL_NAME = "We Raise Tech";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.png`;
export const DEFAULT_OG_IMAGE_WIDTH = 1730;
export const DEFAULT_OG_IMAGE_HEIGHT = 909;
export const DEFAULT_OG_IMAGE_TYPE = "image/png";
export const CONTACT_EMAIL = "contact@weraisetech.com";
export const CONTACT_PHONE = "+919080163393";
export const X_URL = "https://x.com/weraisetech";
export const FACEBOOK_URL = "https://www.facebook.com/share/1CfrkFgdDi/";
export const INSTAGRAM_URL = "https://www.instagram.com/weraisetech/";
export const SOCIAL_URLS = [X_URL, FACEBOOK_URL, INSTAGRAM_URL];
export const LOCALE = "en_US";

export const DEFAULT_KEYWORDS = [
  "software development company",
  "web development company",
  "custom software development",
  "web application development",
  "mobile app development",
  "SaaS development",
  "e-commerce development",
  "Shopify development",
  "UI UX design",
  "technical SEO",
  "website maintenance",
  "full stack development",
  "product development company",
  "startup software development",
  "scalable software architecture",
  "We Raise Tech",
  "India software development company",
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
      contentUrl: absoluteUrl("/we-raise-tech-logo.png"),
      width: 1254,
      height: 1254,
    },
    image: DEFAULT_OG_IMAGE,
    description:
      "We Raise Tech is a custom software development company building scalable web applications, mobile apps, SaaS platforms, e-commerce systems, and tailored business software.",
    slogan: "Custom software built to scale.",
    knowsAbout: DEFAULT_KEYWORDS,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    sameAs: SOCIAL_URLS,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: "Worldwide",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE,
        availableLanguage: ["English"],
        areaServed: "Worldwide",
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
    alternateName: "WeRaiseTech",
    description:
      "Custom software development for scalable web applications, mobile apps, SaaS platforms, e-commerce systems, and digital products by We Raise Tech.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function serviceMetaDescription(name: string, description: string) {
  const serviceName = name.replace(/\s+(developers|experts|designers)$/i, "");
  return `${description} We Raise Tech delivers ${serviceName.toLowerCase()} services for startups and businesses worldwide.`;
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

export function caseStudyJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image: string;
  clientName: string;
  clientUrl?: string;
  dateCreated?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(input.path)}#case-study`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: absoluteImageUrl(input.image),
    creator: { "@id": `${SITE_URL}/#organization` },
    about: {
      "@type": "Organization",
      name: input.clientName,
      url: input.clientUrl,
    },
    dateCreated: input.dateCreated,
    inLanguage: "en",
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
    title: "Custom Software & Web Development Company | We Raise Tech",
    description:
      "We Raise Tech helps startups and growing businesses launch high-converting websites, SaaS platforms, mobile apps, and custom software built to scale.",
    path: "/",
    keywords: DEFAULT_KEYWORDS,
  },
  about: {
    title: "About We Raise Tech | Software Engineering Company",
    description:
      "Learn about We Raise Tech — a product-focused engineering team delivering web, mobile, SaaS, and custom software with transparent process and long-term support.",
    path: "/about",
  },
  services: {
    title: "Software Development Services | We Raise Tech",
    description:
      "Explore web, mobile app, SaaS, e-commerce, Shopify, SEO, UI/UX, maintenance, and custom software development services from We Raise Tech.",
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
      "Explore We Raise Tech case studies across web, mobile, SaaS, e-commerce, SEO, UI/UX, Shopify, maintenance, and custom software.",
    path: "/portfolio",
  },
  blog: {
    title: "Software Development Blog & Guides | We Raise Tech",
    description:
      "Expert guides from We Raise Tech on web and mobile development, SaaS, e-commerce, technical SEO, UI/UX, maintenance, and custom software.",
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
