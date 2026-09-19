import { useEffect } from "react";
import {
  SITE_NAME,
  LOCALE,
  absoluteUrl,
  absoluteImageUrl,
  titleWithBrand,
} from "@/lib/seo";

export type SEOConfig = {
  title: string;
  description?: string;
  /** Path for canonical & og:url, e.g. /services/seo */
  path?: string;
  /** Absolute or site-relative image */
  image?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  keywords?: string[] | string;
  /** One or more JSON-LD objects */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown> | null | undefined>;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  /** Append | We Raise Tech if missing (default true) */
  brandTitle?: boolean;
};

function setMeta(
  attr: "name" | "property",
  key: string,
  content: string | undefined | null
) {
  if (content == null || content === "") return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(attr: "name" | "property", key: string) {
  document.head.querySelectorAll(`meta[${attr}="${key}"]`).forEach((node) => node.remove());
}

function setLink(rel: string, href: string, extra?: Record<string, string>) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  // Prefer canonical singleton; for alternates keep single primary
  if (rel === "canonical") {
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  if (extra) {
    Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
  }
}

const JSON_LD_ATTR = "data-seo-jsonld";

function applyJsonLd(data: SEOConfig["jsonLd"]) {
  // Replace both build-time and previous client-side route JSON-LD.
  document.head
    .querySelectorAll(`script[${JSON_LD_ATTR}="true"], script[data-static-route-jsonld="true"]`)
    .forEach((n) => n.remove());

  if (!data) return;
  const list = (Array.isArray(data) ? data : [data]).filter(
    (item): item is Record<string, unknown> => !!item && typeof item === "object"
  );

  list.forEach((payload) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(JSON_LD_ATTR, "true");
    script.text = JSON.stringify(payload);
    document.head.appendChild(script);
  });
}

/**
 * Full-page SEO: title, description, canonical, Open Graph, Twitter, robots, JSON-LD.
 * Prefer this over bare document.title updates for SPA routes.
 */
export function useSEO(config: SEOConfig) {
  const {
    title,
    description,
    path,
    image,
    type = "website",
    noindex = false,
    keywords,
    jsonLd,
    publishedTime,
    modifiedTime,
    author,
    brandTitle = true,
  } = config;

  const keywordsKey = Array.isArray(keywords) ? keywords.join(",") : keywords || "";
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const finalTitle = brandTitle ? titleWithBrand(title) : title;
    const canonical = absoluteUrl(path || window.location.pathname || "/");
    const ogImage = absoluteImageUrl(image);
    const kw = keywordsKey || undefined;

    document.title = finalTitle;

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }

    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta("name", "googlebot", noindex ? "noindex, nofollow" : "index, follow");
    if (kw) setMeta("name", "keywords", kw);
    else removeMeta("name", "keywords");
    setMeta("name", "author", author || SITE_NAME);
    setMeta("name", "publisher", SITE_NAME);
    setMeta("name", "theme-color", "#3b82f6");

    setLink("canonical", canonical);

    // Open Graph
    setMeta("property", "og:title", finalTitle);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", LOCALE);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:secure_url", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", finalTitle);

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", finalTitle);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:image:alt", finalTitle);
    setMeta("name", "twitter:url", canonical);

    if (type === "article") {
      if (publishedTime) setMeta("property", "article:published_time", publishedTime);
      if (modifiedTime || publishedTime) {
        setMeta("property", "article:modified_time", modifiedTime || publishedTime || "");
      }
      if (author) setMeta("property", "article:author", author);
    } else {
      removeMeta("property", "article:published_time");
      removeMeta("property", "article:modified_time");
      removeMeta("property", "article:author");
    }

    applyJsonLd(jsonLdKey ? (JSON.parse(jsonLdKey) as SEOConfig["jsonLd"]) : undefined);
  }, [
    title,
    description,
    path,
    image,
    type,
    noindex,
    keywordsKey,
    jsonLdKey,
    publishedTime,
    modifiedTime,
    author,
    brandTitle,
  ]);
}

/** Backward-compatible helper used across existing pages. */
export function useDocumentTitle(title: string, description?: string, path?: string) {
  useSEO({
    title,
    description,
    path,
    brandTitle: false, // pages already include brand in most titles
  });
}
