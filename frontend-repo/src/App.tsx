import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence, motion, LazyMotion, domAnimation } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { useEffect, lazy, Suspense } from "react";
import logger from "@/lib/logger";

// Helper to automatically retry loading a chunk if it fails due to a new deployment
const lazyImport = (importFunc: () => Promise<any>) => {
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
        return new Promise<{ default: React.ComponentType<any> }>(() => {});
      }
      throw error;
    }
  });
};

const HomePage = lazyImport(() => import("@/pages/home"));
const AboutPage = lazyImport(() => import("@/pages/about"));
const ServicesPage = lazyImport(() => import("@/pages/services"));
const ServiceDetailPage = lazyImport(() => import("@/pages/service-detail"));
const SolutionsPage = lazyImport(() => import("@/pages/solutions"));
const ContactPage = lazyImport(() => import("@/pages/contact"));
const PrivacyPage = lazyImport(() => import("@/pages/privacy"));
const TermsPage = lazyImport(() => import("@/pages/terms"));
const BlogPage = lazyImport(() => import("@/pages/blog"));
const BlogPostPage = lazyImport(() => import("@/pages/blog-post"));
const PortfolioPage = lazyImport(() => import("@/pages/portfolio"));
const NotFound = lazyImport(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function RouteLogger() {
  const [location] = useLocation();
  useEffect(() => {
    logger.route(location);
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
      <div className="fixed inset-0 bg-noise mix-blend-overlay z-50 pointer-events-none opacity-[0.25]" />
      <div className="fixed inset-0 bg-dot-grid opacity-[0.15] pointer-events-none" />
      <Navbar />
      <main id="main-content" className="flex-1 relative z-10 outline-none" tabIndex={-1} role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  
  return (
    <LazyMotion features={domAnimation} strict>
      <Layout>
        <RouteLogger />
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            <Suspense fallback={<LoadingFallback />}>
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/portfolio" component={PortfolioPage} />
                <Route path="/services" component={ServicesPage} />
                <Route path="/services/:slug" component={ServiceDetailPage} />
                <Route path="/solutions" component={SolutionsPage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/privacy" component={PrivacyPage} />
                <Route path="/terms" component={TermsPage} />
                <Route path="/blog" component={BlogPage} />
                <Route path="/blog/:slug" component={BlogPostPage} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </Layout>
    </LazyMotion>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster richColors position="top-right" />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
