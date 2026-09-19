import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const DIST_DIR = new URL("../dist/", import.meta.url);
const SITE_URL = "https://weraisetech.com";
const SITE_NAME = "We Raise Tech";
const BUILD_LAST_MODIFIED = "2026-09-19";

const coreRoutes = [
  {
    path: "/",
    title: "We Raise Tech | Web, Mobile App & Custom Software Development Agency",
    description:
      "We Raise Tech builds high-performance websites, mobile apps, SaaS platforms, e-commerce stores, and custom software for businesses worldwide.",
  },
  {
    path: "/about",
    title: "About We Raise Tech | Software Engineering Agency",
    description:
      "Learn about We Raise Tech — a product-focused engineering team delivering web, mobile, SaaS, and custom software with transparent process and long-term support.",
  },
  {
    path: "/services",
    title: "Software Development Services | Web, Mobile, SaaS & More | We Raise Tech",
    description:
      "Explore web, mobile app, SaaS, e-commerce, Shopify, SEO, UI/UX, maintenance, and custom software development services from We Raise Tech.",
  },
  {
    path: "/solutions",
    title: "Solutions & Delivery Process | We Raise Tech",
    description:
      "See how We Raise Tech plans, designs, builds, and supports digital products — discovery through deployment for startups and growing businesses.",
  },
  {
    path: "/portfolio",
    title: "Portfolio & Case Studies | We Raise Tech Client Projects",
    description:
      "Explore We Raise Tech case studies across web, mobile, SaaS, e-commerce, SEO, UI/UX, Shopify, maintenance, and custom software.",
  },
  {
    path: "/portfolio/samosasheet",
    title: "SamosaSheet Website Case Study | We Raise Tech",
    description:
      "See how We Raise Tech built SamosaSheet, a responsive, search-ready product catalog and enquiry website for Karpagam Foods in Chennai.",
    image: "/portfolio/samosasheet/samosa-sheets-rectangular-premium-hero-v3.webp",
    kind: "case-study",
    clientName: "Karpagam Foods",
    clientUrl: "https://samosasheet.com/",
  },
  {
    path: "/blog",
    title: "Blog | Web, Mobile, SaaS & Software Insights | We Raise Tech",
    description:
      "Expert guides from We Raise Tech on web and mobile development, SaaS, e-commerce, technical SEO, UI/UX, maintenance, and custom software.",
  },
  {
    path: "/contact",
    title: "Contact We Raise Tech | Free Project Consultation",
    description:
      "Contact We Raise Tech for web, mobile, SaaS, or custom software projects. Tell us about your goals — we respond within 24 hours. Free discovery call.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | We Raise Tech",
    description:
      "Read how We Raise Tech collects, uses, and protects personal information when you use our website and services.",
  },
  {
    path: "/terms",
    title: "Terms & Conditions | We Raise Tech",
    description:
      "Terms governing use of the We Raise Tech website and engagement of our software development and digital services.",
  },
];

const services = [
  ["e-commerce", "E-commerce Developers", "We build scalable, conversion-focused e-commerce platforms."],
  ["full-stack", "Full-Stack Web Developers", "Scalable web solutions using modern technology stacks."],
  ["seo", "SEO Experts", "Boost your visibility, qualified traffic, and organic search performance."],
  ["saas", "SaaS Development Experts", "Build scalable, high-performance SaaS platforms."],
  ["ui-ux", "UI/UX Designers", "Digital experiences that delight users and support conversion."],
  ["shopify", "Shopify Development Experts", "We build fast, scalable, and custom Shopify stores."],
  ["ecommerce-optimization", "E-commerce Optimization", "We improve store speed, performance, and conversion rates."],
  ["web-development", "Web Development", "Custom web applications and high-performance websites."],
  ["maintenance-support", "Website Maintenance & Support", "Keep your website secure, fast, and up to date."],
  ["mobile-app-development", "Mobile App Development", "High-performance iOS and Android applications."],
  ["custom-software-development", "Custom Software Development", "Tailor-made software solutions for complex business problems."],
].map(([slug, name, summary]) => {
  const serviceName = name.replace(/\s+(developers|experts|designers)$/i, "");
  return {
    path: `/services/${slug}`,
    title: `${name} | We Raise Tech Services`,
    description: `${summary} We Raise Tech delivers ${serviceName.toLowerCase()} services for startups and businesses worldwide.`,
    kind: "service",
    name,
  };
});

const articles = [
  ["top-web-development-trends-2026", "Top Web Development Trends in 2026: What Leading IT Companies Are Building", "Explore 2026 web development trends, including AI integration, edge computing, and performance optimization, with insights from We Raise Tech.", "2026-07-08", "web-development-trends-2026.jpg"],
  ["full-stack-development-playbook", "Full-Stack Development Playbook: Frontend, Backend, and Everything Between", "Full-stack development playbook from We Raise Tech. Frontend, backend, databases, APIs, and engineering practices for production systems.", "2026-07-10", "full-stack-development.jpg"],
  ["ecommerce-development-best-practices", "Ecommerce Development Best Practices to Maximize Conversions in 2026", "Master ecommerce development best practices for 2026. Discover how an IT company optimizes stores for speed, SEO, and conversions that drive real revenue.", "2026-07-03", "ecommerce-development.jpg"],
  ["scalable-saas-development-guide", "Scalable SaaS Development Guide: Build Products That Grow With Your Business", "Learn how to build scalable SaaS applications with proven strategies from an experienced IT company. Multi-tenancy, architecture, and growth tips included.", "2026-07-05", "scalable-saas-development.jpg"],
  ["technical-seo-guide-for-it-companies", "Technical SEO Guide for Modern Websites: An IT Company Perspective", "Technical SEO guide from a leading IT company. Improve rankings with Core Web Vitals, schema, mobile-first indexing, and modern optimization techniques.", "2026-07-01", "technical-seo.jpg"],
  ["ui-ux-design-for-business-growth", "How Professional UI/UX Design Drives 3x Business Growth and Conversions", "See how professional UI/UX design from an IT company can dramatically increase conversions, reduce bounce rates, and fuel sustainable business growth.", "2026-06-28", "ui-ux-design.jpg"],
  ["shopify-development-vs-custom-solutions", "Shopify Development vs Custom Ecommerce: Choosing the Right Solution", "Shopify vs custom ecommerce development: detailed comparison by We Raise Tech. Find the best fit for budget, scale, and requirements.", "2026-06-25", "shopify-vs-custom.jpg"],
  ["ecommerce-optimization-cro-guide", "E-Commerce Optimization Guide: CRO, Speed, and Revenue Experiments", "E-commerce optimization and CRO guide from We Raise Tech. Speed, experiments, funnels, and tactics that increase online revenue.", "2026-07-11", "ecommerce-optimization.jpg"],
  ["website-maintenance-support-guide", "Website Maintenance & Support: Why Ongoing Care Protects Revenue", "Why website maintenance and support matter after launch. Security, speed, backups, and response plans from We Raise Tech.", "2026-07-12", "website-maintenance-support.jpg"],
  ["mobile-app-development-guide-2026", "Mobile App Development in 2026: Native vs Cross-Platform Decisions", "Mobile app development guide for 2026. Native vs cross-platform, stacks, timelines, and launch strategy from We Raise Tech.", "2026-07-14", "mobile-app-development.jpg"],
  ["custom-software-development-when-to-build", "Custom Software Development: When Off-the-Shelf Tools Stop Working", "When custom software development beats SaaS tools. ROI, process automation, integrations, and ownership insights from We Raise Tech.", "2026-07-16", "custom-software-development.jpg"],
].map(([slug, title, description, published, image]) => ({
  path: `/blog/${slug}`,
  title: `${title} | We Raise Tech`,
  description,
  kind: "article",
  published,
  image: `/blog/${image}`,
}));

const routes = [...coreRoutes, ...services, ...articles];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function absoluteUrl(path) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function replaceMeta(html, attribute, key, value) {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*>`, "i");
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function removeMeta(html, attribute, key) {
  const pattern = new RegExp(`\\s*<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*>`, "gi");
  return html.replace(pattern, "");
}

function routeJsonLd(route) {
  const url = absoluteUrl(route.path);
  const breadcrumbItems = route.path
    .split("/")
    .filter(Boolean)
    .map((segment, index, parts) => ({
      "@type": "ListItem",
      position: index + 2,
      name: index === parts.length - 1 ? route.title.split(" | ")[0] : segment.replaceAll("-", " "),
      item: absoluteUrl(`/${parts.slice(0, index + 1).join("/")}`),
    }));

  const page = {
    "@type": route.kind === "article" ? "Article" : route.kind === "service" ? "Service" : route.kind === "case-study" ? "CreativeWork" : "WebPage",
    "@id": `${url}#primary`,
    name: route.title,
    description: route.description,
    url,
    inLanguage: "en",
  };

  if (route.kind === "article") {
    page.headline = route.title.replace(` | ${SITE_NAME}`, "");
    page.image = `${SITE_URL}${route.image}`;
    page.datePublished = route.published;
    page.dateModified = route.published;
    page.author = { "@id": `${SITE_URL}/#organization` };
    page.publisher = { "@id": `${SITE_URL}/#organization` };
    page.mainEntityOfPage = url;
  } else if (route.kind === "service") {
    page.serviceType = route.name;
    page.provider = { "@id": `${SITE_URL}/#organization` };
    page.areaServed = "Worldwide";
  } else if (route.kind === "case-study") {
    page.creator = { "@id": `${SITE_URL}/#organization` };
    page.about = {
      "@type": "Organization",
      name: route.clientName,
      url: route.clientUrl,
    };
    page.dateCreated = "2026";
  } else {
    page.isPartOf = { "@id": `${SITE_URL}/#website` };
    page.about = { "@id": `${SITE_URL}/#organization` };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      page,
      ...(route.path === "/"
        ? []
        : [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                ...breadcrumbItems,
              ],
            },
          ]),
    ],
  };
}

function renderRoute(shell, route, { noindex = false } = {}) {
  const canonical = absoluteUrl(route.path);
  const image = route.image ? `${SITE_URL}${route.image}` : `${SITE_URL}/opengraph.png`;
  let html = shell.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

  html = replaceMeta(html, "name", "description", route.description);
  html = replaceMeta(html, "name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  html = replaceMeta(html, "name", "googlebot", noindex ? "noindex, nofollow" : "index, follow");
  html = replaceMeta(html, "property", "og:title", route.title);
  html = replaceMeta(html, "property", "og:description", route.description);
  html = replaceMeta(html, "property", "og:type", route.kind === "article" ? "article" : "website");
  html = replaceMeta(html, "property", "og:url", canonical);
  html = replaceMeta(html, "property", "og:image", image);
  html = replaceMeta(html, "property", "og:image:secure_url", image);
  html = replaceMeta(html, "property", "og:image:alt", route.title);
  html = replaceMeta(html, "name", "twitter:title", route.title);
  html = replaceMeta(html, "name", "twitter:description", route.description);
  html = replaceMeta(html, "name", "twitter:image", image);
  html = replaceMeta(html, "name", "twitter:image:alt", route.title);
  html = replaceMeta(html, "name", "twitter:url", canonical);
  html = removeMeta(html, "name", "keywords");
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`);

  if (route.kind === "article") {
    html = replaceMeta(html, "property", "article:published_time", `${route.published}T00:00:00.000Z`);
    html = replaceMeta(html, "property", "article:modified_time", `${route.published}T00:00:00.000Z`);
    html = replaceMeta(html, "property", "article:author", "We Raise Tech Engineering");
  }

  if (!noindex) {
    const jsonLd = JSON.stringify(routeJsonLd(route)).replaceAll("<", "\\u003c");
    html = html.replace("</head>", `    <script type="application/ld+json" data-static-route-jsonld="true">${jsonLd}</script>\n  </head>`);
  }

  return html;
}

function outputPath(path) {
  if (path === "/") return join(DIST_DIR.pathname, "index.html");
  return join(DIST_DIR.pathname, `${path.slice(1)}.html`);
}

const shell = await readFile(new URL("index.html", DIST_DIR), "utf8");
const seen = new Set();

for (const route of routes) {
  if (seen.has(route.path)) throw new Error(`Duplicate SEO route: ${route.path}`);
  seen.add(route.path);
  if (!route.title || !route.description) throw new Error(`Incomplete SEO metadata: ${route.path}`);
  const target = outputPath(route.path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderRoute(shell, route), "utf8");
}

const notFound = {
  path: "/404",
  title: "Page Not Found | We Raise Tech",
  description: "The requested page does not exist. Explore We Raise Tech services, portfolio, and software development insights.",
};
await writeFile(join(DIST_DIR.pathname, "404.html"), renderRoute(shell, notFound, { noindex: true }), "utf8");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <lastmod>${BUILD_LAST_MODIFIED}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;
await writeFile(new URL("sitemap.xml", DIST_DIR), sitemap, "utf8");

console.log(`Generated SEO HTML for ${routes.length} routes, 404.html, and sitemap.xml.`);
