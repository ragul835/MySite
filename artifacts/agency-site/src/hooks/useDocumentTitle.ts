import { useEffect } from "react";

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;

    const canonicalUrl = new URL(
      window.location.pathname,
      "https://weraisetech.com",
    ).toString();

    const upsertMeta = (
      selector: string,
      attribute: string,
      name: string,
      content: string,
    ) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta(
      'meta[property="og:type"]',
      "property",
      "og:type",
      window.location.pathname.startsWith("/blog/") ? "article" : "website",
    );
    upsertMeta(
      'meta[property="og:site_name"]',
      "property",
      "og:site_name",
      "We Raise Tech",
    );
    upsertMeta(
      'meta[property="og:image"]',
      "property",
      "og:image",
      "https://weraisetech.com/opengraph.png",
    );
    upsertMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image",
    );
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta(
      'meta[name="twitter:image"]',
      "name",
      "twitter:image",
      "https://weraisetech.com/opengraph.png",
    );
    upsertMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      title.startsWith("404")
        ? "noindex, follow"
        : "index, follow, max-image-preview:large",
    );

    if (description) {
      upsertMeta(
        'meta[name="description"]',
        "name",
        "description",
        description,
      );
      upsertMeta(
        'meta[property="og:description"]',
        "property",
        "og:description",
        description,
      );
      upsertMeta(
        'meta[name="twitter:description"]',
        "name",
        "twitter:description",
        description,
      );
    }

    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description]);
}
