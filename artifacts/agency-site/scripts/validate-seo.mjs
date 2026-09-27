import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_URL, routeOutputPath, routes } from "./seo-config.mjs";

const dist = new URL("../dist/public/", import.meta.url);
const failures = [];
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
for (const route of routes) {
  const file = join(dist.pathname, routeOutputPath(route.path));
  let html;
  try {
    html = await readFile(file, "utf8");
  } catch {
    failures.push(`${route.path}: missing prerendered HTML`);
    continue;
  }
  const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  for (const [label, value] of [
    ["title", escapeHtml(route.title)],
    ["description", escapeHtml(route.description)],
    ["canonical", canonical],
    ["structured data", "data-static-route-jsonld"],
  ]) {
    if (!html.includes(value)) failures.push(`${route.path}: missing ${label}`);
  }
}
for (const asset of [
  "opengraph.png",
  "apple-touch-icon.png",
  "site.webmanifest",
  "sitemap.xml",
  "robots.txt",
]) {
  try {
    await access(new URL(asset, dist));
  } catch {
    failures.push(`missing public asset: ${asset}`);
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`SEO validation passed for ${routes.length} routes.`);
