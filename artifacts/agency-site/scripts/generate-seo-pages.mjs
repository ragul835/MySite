import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  DEFAULT_IMAGE,
  SITE_URL,
  routeOutputPath,
  routes,
} from "./seo-config.mjs";

const dist = new URL("../dist/public/", import.meta.url);
const template = await readFile(new URL("index.html", dist), "utf8");

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );

function replaceMeta(html, selector, value) {
  const [attribute, key] = selector;
  const pattern = new RegExp(`<meta\\s+${attribute}=["']${key}["'][^>]*>`, "i");
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace("</head>", `  ${tag}\n  </head>`);
}

function render(route) {
  const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  let html = template
    .replace(
      /<title>[^<]*<\/title>/i,
      `<title>${escapeHtml(route.title)}</title>`,
    )
    .replace(
      /<link\s+rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${canonical}" />`,
    );
  for (const [selector, value] of [
    [["name", "description"], route.description],
    [["name", "robots"], "index, follow, max-image-preview:large"],
    [["property", "og:title"], route.title],
    [["property", "og:description"], route.description],
    [["property", "og:type"], route.type],
    [["property", "og:url"], canonical],
    [["property", "og:image"], route.image || DEFAULT_IMAGE],
    [["name", "twitter:title"], route.title],
    [["name", "twitter:description"], route.description],
    [["name", "twitter:image"], route.image || DEFAULT_IMAGE],
  ])
    html = replaceMeta(html, selector, value);

  const jsonLd =
    route.type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: route.title.replace(/ \| We Raise Tech$/, ""),
          description: route.description,
          image: [route.image],
          mainEntityOfPage: canonical,
          author: {
            "@type": "Organization",
            name: "We Raise Tech",
            url: SITE_URL,
          },
          publisher: {
            "@type": "Organization",
            name: "We Raise Tech",
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/we-raise-tech-logo.png`,
            },
          },
        }
      : route.path === "/"
        ? {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "We Raise Tech",
            url: SITE_URL,
            image: DEFAULT_IMAGE,
            email: "contact@weraisetech.com",
            telephone: "+919080163393",
            areaServed: "Worldwide",
            address: { "@type": "PostalAddress", addressCountry: "IN" },
          }
        : {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${SITE_URL}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: route.title.split("|")[0].trim(),
                item: canonical,
              },
            ],
          };
  return html.replace(
    "</head>",
    `  <script type="application/ld+json" data-static-route-jsonld="true">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>\n  </head>`,
  );
}

for (const route of routes) {
  const relative = routeOutputPath(route.path);
  const target = join(dist.pathname, relative);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, render(route), "utf8");
}

console.log(`Generated SEO HTML for ${routes.length} routes.`);
