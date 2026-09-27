type AnalyticsValue = string | number | boolean | undefined;

type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
let initialized = false;
let scheduled = false;

function prepareAnalyticsQueue() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
}

export function initializeAnalytics() {
  if (!measurementId || initialized || typeof window === "undefined") return;
  initialized = true;

  prepareAnalyticsQueue();

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  window.gtag!("js", new Date());
  window.gtag!("config", measurementId, { send_page_view: false });
}

export function scheduleAnalytics() {
  if (!measurementId || scheduled || typeof window === "undefined") return;
  scheduled = true;
  prepareAnalyticsQueue();

  const start = () => initializeAnalytics();
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(start, { timeout: 2_000 });
  } else {
    globalThis.setTimeout(start, 1_500);
  }
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  prepareAnalyticsQueue();
  window.gtag?.("event", name, params);
}

export function trackPageView(path: string) {
  trackEvent("page_view", {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
  });
}

export function trackLead(source: string, service?: string) {
  trackEvent("generate_lead", {
    lead_source: source,
    service,
  });
}
