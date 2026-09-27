type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const consentKey = "analytics_consent";
let initialized = false;
let scheduled = false;

function prepareQueue() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

function initializeAnalytics() {
  if (!measurementId || initialized) return;
  initialized = true;
  prepareQueue();
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
  window.gtag?.("js", new Date());
  window.gtag?.("config", measurementId, {
    send_page_view: false,
    anonymize_ip: true,
  });
}

export function scheduleAnalytics() {
  if (
    !measurementId ||
    scheduled ||
    typeof window === "undefined" ||
    window.localStorage.getItem(consentKey) !== "granted"
  )
    return;
  scheduled = true;
  prepareQueue();
  if (window.requestIdleCallback) {
    window.requestIdleCallback(initializeAnalytics, { timeout: 2_000 });
  } else {
    window.setTimeout(initializeAnalytics, 1_500);
  }
}

export function analyticsConsent(): "granted" | "denied" | null {
  const value = window.localStorage.getItem(consentKey);
  return value === "granted" || value === "denied" ? value : null;
}

export function setAnalyticsConsent(value: "granted" | "denied") {
  window.localStorage.setItem(consentKey, value);
  if (value === "granted") {
    scheduleAnalytics();
    trackPageView(window.location.pathname);
  }
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (!measurementId || typeof window === "undefined") return;
  prepareQueue();
  window.gtag?.("event", name, params);
}

export function trackPageView(path: string) {
  trackEvent("page_view", {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
  });
}

export function trackLead(
  stage: "started" | "submitted" | "failed",
  service?: string,
) {
  trackEvent(stage === "submitted" ? "generate_lead" : "lead_form_progress", {
    stage,
    service,
  });
}
