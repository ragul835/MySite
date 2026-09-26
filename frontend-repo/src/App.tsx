import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import HomePage from "@/pages/home";
import { useEffect, lazy, Suspense, type ComponentType } from "react";
import logger from "@/lib/logger";
import { scheduleAnalytics, trackEvent, trackPageView } from "@/lib/analytics";

// Helper to automatically retry loading a chunk if it fails due to a new deployment
type PageModule = { default: ComponentType<any> };
type PageLoader = () => Promise<PageModule>;

const lazyImport = (importFunc: PageLoader) => {
  return lazy(async () => {
    try {
      const module = await importFunc();
      sessionStorage.removeItem('chunk-retry');
      return module;
    } catch (error) {
      const isChunkError = error instanceof TypeError;
      const hasRetried = sessionStorage.getItem('chunk-retry');
      
      if (isChunkError && !hasRetried) {
        sessionStorage.setItem('chunk-retry', 'true');
        window.location.reload();
        // Keep suspense fallback active while reloading
        return new Promise<PageModule>(() => {});
      }
      throw error;
    }
  });
};

const loaders = {
  about: () => import("@/pages/about"),
  services: () => import("@/pages/services"),
  serviceDetail: () => import("@/pages/service-detail"),
  solutions: () => import("@/pages/solutions"),
  contact: () => import("@/pages/contact"),
  thankYou: () => import("@/pages/thank-you"),
  privacy: () => import("@/pages/privacy"),
  terms: () => import("@/pages/terms"),
  blog: () => import("@/pages/blog"),
  blogPost: () => import("@/pages/blog-post"),
  portfolio: () => import("@/pages/portfolio"),
  caseStudy: () => import("@/pages/samosasheet-case-study"),
  notFound: () => import("@/pages/not-found"),
} satisfies Record<string, PageLoader>;

const AboutPage = lazyImport(loaders.about);
const ServicesPage = lazyImport(loaders.services);
const ServiceDetailPage = lazyImport(loaders.serviceDetail);
const SolutionsPage = lazyImport(loaders.solutions);
const ContactPage = lazyImport(loaders.contact);
const ThankYouPage = lazyImport(loaders.thankYou);
const PrivacyPage = lazyImport(loaders.privacy);
const TermsPage = lazyImport(loaders.terms);
const BlogPage = lazyImport(loaders.blog);
const BlogPostPage = lazyImport(loaders.blogPost);
const PortfolioPage = lazyImport(loaders.portfolio);
const SamosaSheetCaseStudyPage = lazyImport(loaders.caseStudy);
const NotFound = lazyImport(loaders.notFound);

const prefetched = new Set<PageLoader>();

function loaderForPath(path: string): PageLoader | undefined {
  if (path === "/") return undefined;
  if (path === "/about") return loaders.about;
  if (path === "/services") return loaders.services;
  if (path.startsWith("/services/")) return loaders.serviceDetail;
  if (path === "/solutions") return loaders.solutions;
  if (path === "/contact") return loaders.contact;
  if (path === "/thank-you") return loaders.thankYou;
  if (path === "/privacy") return loaders.privacy;
  if (path === "/terms") return loaders.terms;
  if (path === "/blog") return loaders.blog;
  if (path.startsWith("/blog/")) return loaders.blogPost;
  if (path === "/portfolio") return loaders.portfolio;
  if (path === "/portfolio/samosasheet") return loaders.caseStudy;
  return loaders.notFound;
}

function IntentPrefetch() {
  useEffect(() => {
    const prefetch = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.origin !== window.location.origin) return;
      const loader = loaderForPath(anchor.pathname);
      if (!loader || prefetched.has(loader)) return;
      prefetched.add(loader);
      void loader().catch(() => prefetched.delete(loader));
    };

    document.addEventListener("pointerover", prefetch, { passive: true });
    document.addEventListener("focusin", prefetch);
    return () => {
      document.removeEventListener("pointerover", prefetch);
      document.removeEventListener("focusin", prefetch);
    };
  }, []);
  return null;
}

function RouteLogger() {
  const [location] = useLocation();
  useEffect(() => {
    scheduleAnalytics();
    logger.route(location);
    trackPageView(location);
    // Scroll to top on route change (unless navigating to a hash)
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <div className="fixed inset-0 bg-dot-grid opacity-[0.15] pointer-events-none" />
      <Navbar />
      <main id="main-content" className="flex-1 relative z-10 outline-none" tabIndex={-1} role="main">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-[calc(100svh-5rem)] flex items-center justify-center" aria-label="Loading page">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <RouteLogger />
      <IntentPrefetch />
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/portfolio/samosasheet" component={SamosaSheetCaseStudyPage} />
          <Route path="/portfolio" component={PortfolioPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/services/:slug" component={ServiceDetailPage} />
          <Route path="/solutions" component={SolutionsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/thank-you" component={ThankYouPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/blog/:slug" component={BlogPostPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

function App() {
  useEffect(() => {
    scheduleAnalytics();
    const handleCalendlyMessage = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com") return;
      if ((event.data as { event?: string } | null)?.event === "calendly.event_scheduled") {
        trackEvent("calendly_booking_complete", { lead_source: "calendly" });
      }
    };
    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, []);

  return (
    <ErrorBoundary>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </ErrorBoundary>
  );
}

export default App;
