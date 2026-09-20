import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const DIST = new URL("../dist/", import.meta.url);
const SITE_URL = "https://weraisetech.com";
const errors = [];
const warnings = [];

function capture(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || "";
}

function outputFile(url) {
  const path = new URL(url).pathname;
  return path === "/" ? "index.html" : `${path.slice(1)}.html`;
}

function check(condition, message) {
  if (!condition) errors.push(message);
}

const sitemap = await readFile(new URL("sitemap.xml", DIST), "utf8");
const urls = [...sitemap.matchAll(/<loc>(https:\/\/weraisetech\.com[^<]*)<\/loc>/g)].map((match) => match[1]);
const pageUrls = urls.filter((url) => !/\.(?:png|jpe?g|webp|svg)$/i.test(url));
check(pageUrls.length > 0, "Sitemap contains no page URLs");
check(new Set(pageUrls).size === pageUrls.length, "Sitemap contains duplicate page URLs");

const titles = new Map();
const descriptions = new Map();

for (const url of pageUrls) {
  const file = outputFile(url);
  const fileUrl = new URL(file, DIST);
  try {
    await access(fileUrl);
  } catch {
    errors.push(`${url}: missing generated file ${file}`);
    continue;
  }

  const html = await readFile(fileUrl, "utf8");
  const title = capture(html, /<title>([^<]+)<\/title>/i);
  const description = capture(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const canonical = capture(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);

  check(Boolean(title), `${url}: missing title`);
  check(Boolean(description), `${url}: missing meta description`);
  check(canonical === url, `${url}: canonical is ${canonical || "missing"}`);
  check(html.includes(`hreflang="en" href="${url}"`), `${url}: missing English alternate`);
  check(html.includes(`hreflang="x-default" href="${url}"`), `${url}: missing x-default alternate`);
  check(!/<meta\s+name=["']keywords["']/i.test(html), `${url}: obsolete meta keywords tag present`);
  check(/<meta\s+property=["']og:image["']/.test(html), `${url}: missing Open Graph image`);
  check(/<meta\s+property=["']og:image:type["']/.test(html), `${url}: missing Open Graph image type`);
  check(/<meta\s+property=["']og:image:width["']/.test(html), `${url}: missing Open Graph image width`);
  check(/<meta\s+property=["']og:image:height["']/.test(html), `${url}: missing Open Graph image height`);
  check(/<meta\s+name=["']twitter:card["']/.test(html), `${url}: missing Twitter card`);
  check(html.includes('id="static-seo-content"'), `${url}: missing crawlable static route content`);
  check(/<h1>[^<]+<\/h1>/.test(html), `${url}: static route content has no H1`);

  const jsonLdBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  check(jsonLdBlocks.length > 0, `${url}: missing JSON-LD`);
  jsonLdBlocks.forEach((block, index) => {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      errors.push(`${url}: invalid JSON-LD block ${index + 1} (${error.message})`);
    }
  });

  if (title.length > 65) warnings.push(`${url}: title is ${title.length} characters`);
  if (description.length > 165) warnings.push(`${url}: description is ${description.length} characters`);
  if (titles.has(title)) errors.push(`${url}: duplicate title also used by ${titles.get(title)}`);
  if (descriptions.has(description)) errors.push(`${url}: duplicate description also used by ${descriptions.get(description)}`);
  titles.set(title, url);
  descriptions.set(description, url);
}

const robots = await readFile(new URL("robots.txt", DIST), "utf8");
check(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), "robots.txt does not reference the production sitemap");

const lastModified = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
check(lastModified.length === pageUrls.length, "Every sitemap page must have one lastmod value");
lastModified.forEach((date) => check(/^\d{4}-\d{2}-\d{2}$/.test(date), `Invalid sitemap lastmod: ${date}`));

const notFound = await readFile(new URL("404.html", DIST), "utf8");
check(/name=["']robots["']\s+content=["']noindex, follow["']/.test(notFound), "404 page must be noindex, follow");

warnings.forEach((warning) => console.warn(`SEO warning: ${warning}`));
if (errors.length) {
  errors.forEach((error) => console.error(`SEO error: ${error}`));
  process.exitCode = 1;
} else {
  console.log(`SEO validation passed for ${pageUrls.length} indexable routes.`);
}
