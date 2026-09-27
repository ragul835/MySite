import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { useEffect, lazy, Suspense } from "react";
import logger from "@/lib/logger";
import { trackPageView } from "@/lib/analytics";
import { AnalyticsConsent } from "@/components/shared/AnalyticsConsent";

const HomePage = lazy(() => import("@/pages/home"));
const AboutPage = lazy(() => import("@/pages/about"));
const ServicesPage = lazy(() => import("@/pages/services"));
const SolutionsPage = lazy(() => import("@/pages/solutions"));
const ContactPage = lazy(() => import("@/pages/contact"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));
const TermsPage = lazy(() => import("@/pages/terms"));
const BlogPage = lazy(() => import("@/pages/blog"));
const BlogPostPage = lazy(() => import("@/pages/blog-post"));
const NotFound = lazy(() => import("@/pages/not-found"));

function RouteLogger() {
  const [location] = useLocation();
  useEffect(() => {
    logger.route(location);
    queueMicrotask(() => trackPageView(location));
    // Scroll to top on route change (unless navigating to a hash)
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div
      className="min-h-[50vh] flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div
        className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"
        aria-hidden="true"
      />
      <span className="sr-only">Loading page</span>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <Layout>
      <RouteLogger />
      <AnimatePresence mode="wait">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -20 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
          className="flex-1 flex flex-col"
        >
          <Suspense fallback={<LoadingFallback />}>
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/services" component={ServicesPage} />
              <Route path="/solutions" component={SolutionsPage} />
              <Route path="/blog" component={BlogPage} />
              <Route path="/blog/:slug" component={BlogPostPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/privacy" component={PrivacyPage} />
              <Route path="/terms" component={TermsPage} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster richColors position="top-right" />
        <AnalyticsConsent />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
