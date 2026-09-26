interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

const productionHosts = new Set(["weraisetech.com", "www.weraisetech.com"]);

function withProductionHeaders(response: Response, url: URL): Response {
  const secured = new Response(response.body, response);
  secured.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  secured.headers.set("X-Content-Type-Options", "nosniff");
  secured.headers.set("X-Frame-Options", "SAMEORIGIN");
  secured.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  secured.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (url.pathname.startsWith("/assets/")) {
    secured.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (/\.(?:woff2?|webp|avif|png|jpe?g|svg|ico)$/i.test(url.pathname)) {
    secured.headers.set("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
  } else if (/\.(?:xml|webmanifest)$/i.test(url.pathname)) {
    secured.headers.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  } else {
    secured.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }
  return secured;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (productionHosts.has(url.hostname) && (url.protocol === "http:" || url.hostname === "www.weraisetech.com")) {
      url.protocol = "https:";
      url.hostname = "weraisetech.com";
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    return productionHosts.has(url.hostname) ? withProductionHeaders(response, url) : response;
  },
};
