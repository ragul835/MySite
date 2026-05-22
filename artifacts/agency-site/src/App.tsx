import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ServicesPage from "@/pages/services";
import SolutionsPage from "@/pages/solutions";
import ContactPage from "@/pages/contact";
import { useEffect } from "react";
import logger from "@/lib/logger";

const queryClient = new QueryClient();

function RouteLogger() {
  const [location] = useLocation();
  useEffect(() => {
    logger.route(location);
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

function Router() {
  return (
    <Layout>
      <RouteLogger />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/solutions" component={SolutionsPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster richColors position="top-right" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
