export const SITE_URL = "https://weraisetech.com";
export const DEFAULT_IMAGE = `${SITE_URL}/opengraph.png`;

const topLevel = [
  [
    "/",
    "We Raise Tech | Premium Software Engineering Agency",
    "We Raise Tech is a senior engineering team that builds scalable SaaS platforms, e-commerce stores, and custom web applications. Get a free project estimate.",
  ],
  [
    "/about",
    "About Us | We Raise Tech",
    "An elite, focused engineering team that punches above its weight class. Learn about our mission, values, and engineering philosophy.",
  ],
  [
    "/services",
    "Services | We Raise Tech",
    "Full-stack development, SaaS platforms, mobile apps, custom software, website maintenance, e-commerce, UI/UX, SEO, and Shopify — everything under one roof.",
  ],
  [
    "/solutions",
    "Solutions & Capabilities | We Raise Tech",
    "Custom digital solutions engineered for scale and performance. Discover our process: Discovery, Design, Development, and Deployment.",
  ],
  [
    "/blog",
    "Blog | We Raise Tech — Insights on Web, Mobile, SaaS & Custom Software",
    "Expert articles from We Raise Tech on web development, mobile apps, custom software, website maintenance, SaaS, ecommerce, SEO, and modern engineering.",
  ],
  [
    "/contact",
    "Contact Us | We Raise Tech",
    "Get in touch with We Raise Tech. Tell us about your project and we'll respond within 24 hours with a clear plan and honest assessment.",
  ],
  [
    "/privacy",
    "Privacy Policy | We Raise Tech",
    "Learn how We Raise Tech collects, uses, and protects your personal data when you use our website and services.",
  ],
  [
    "/terms",
    "Terms & Conditions | We Raise Tech",
    "Read the terms governing use of the We Raise Tech website and our software development and digital services.",
  ],
];

const articles = [
  [
    "top-web-development-trends-2026",
    "Top Web Development Trends in 2026: What Leading IT Companies Are Building",
    "Explore the top web development trends in 2026 including AI integration, edge computing, and performance optimization. Expert insights from We Raise Tech.",
    "web-development-trends-2026.jpg",
  ],
  [
    "scalable-saas-development-guide",
    "Scalable SaaS Development Guide: Build Products That Grow With Your Business",
    "Learn how to build scalable SaaS applications with proven strategies from an experienced IT company. Multi-tenancy, architecture, and growth tips included.",
    "scalable-saas-development.jpg",
  ],
  [
    "ecommerce-development-best-practices",
    "Ecommerce Development Best Practices to Maximize Conversions in 2026",
    "Master ecommerce development best practices for 2026. Discover how an IT company optimizes stores for speed, SEO, and conversions that drive real revenue.",
    "ecommerce-development.jpg",
  ],
  [
    "technical-seo-guide-for-it-companies",
    "Technical SEO Guide for Modern Websites: An IT Company Perspective",
    "Technical SEO guide from a leading IT company. Improve rankings with Core Web Vitals, schema, mobile-first indexing, and modern optimization techniques.",
    "technical-seo.jpg",
  ],
  [
    "ui-ux-design-for-business-growth",
    "How Professional UI/UX Design Drives 3x Business Growth and Conversions",
    "See how professional UI/UX design from an IT company can dramatically increase conversions, reduce bounce rates, and fuel sustainable business growth.",
    "ui-ux-design.jpg",
  ],
  [
    "shopify-development-vs-custom-solutions",
    "Shopify Development vs Custom Ecommerce: Choosing the Right Solution",
    "Shopify vs custom ecommerce development: detailed comparison by a top IT company. Find the best fit for your budget, scale, and unique business requirements.",
    "shopify-vs-custom.jpg",
  ],
  [
    "website-maintenance-support-guide",
    "Website Maintenance & Support: Why Ongoing Care Protects Revenue",
    "Why website maintenance and support matter after launch. Security, speed, backups, and response plans from We Raise Tech.",
    "technical-seo.jpg",
  ],
  [
    "mobile-app-development-guide-2026",
    "Mobile App Development in 2026: Native vs Cross-Platform Decisions",
    "Mobile app development guide for 2026. Native vs cross-platform, stacks, timelines, and launch strategy from We Raise Tech.",
    "ui-ux-design.jpg",
  ],
  [
    "custom-software-development-when-to-build",
    "Custom Software Development: When Off-the-Shelf Tools Stop Working",
    "When custom software development beats SaaS tools. ROI, process automation, integrations, and ownership insights from We Raise Tech.",
    "scalable-saas-development.jpg",
  ],
];

export const routes = [
  ...topLevel.map(([path, title, description]) => ({
    path,
    title,
    description,
    type: "website",
    image: DEFAULT_IMAGE,
  })),
  ...articles.map(([slug, title, description, image]) => ({
    path: `/blog/${slug}`,
    title: `${title} | We Raise Tech`,
    description,
    type: "article",
    image: `${SITE_URL}/blog/${image}`,
  })),
];

export function routeOutputPath(path) {
  return path === "/" ? "index.html" : `${path.slice(1)}/index.html`;
}
