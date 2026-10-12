import { Suspense, lazy, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { track } from "@vercel/analytics";
import site from "@shared/site.json";
import ErrorBoundary from "./components/ErrorBoundary";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import MobileActionBar from "./components/MobileActionBar";
import Home from "./pages/Home";

// Everything except Home loads on demand, so the first screen downloads less.
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const FleetPage = lazy(() => import("./pages/FleetPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const pages = site.pages as Record<string, { title: string; description: string }>;

function App() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const page = pages[location];
    document.title = page?.title ?? "Page not found — Rain Hub Logistics";
    document.querySelector('meta[name="description"]')?.setAttribute("content", (page ?? pages["/"]).description);
    // Unknown address: tell search engines not to index it, and don't claim the home page as its canonical.
    let robots = document.querySelector('meta[name="robots"]');
    if (!page) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex");
      document.querySelector('link[rel="canonical"]')?.remove();
    } else robots?.remove();
  }, [location]);

  // Count the actions that matter (cookie-free): taps on WhatsApp, phone and email links.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const href = (e.target as Element | null)?.closest("a")?.getAttribute("href") ?? "";
      try {
        if (href.includes("wa.me")) track("whatsapp_click");
        else if (href.startsWith("tel:")) track("call_click");
        else if (href.startsWith("mailto:")) track("email_click");
      } catch {
        /* analytics must never break the site */
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <ErrorBoundary>
      <Navigation />
      <Suspense fallback={<div className="min-h-[70svh]" />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/fleet" component={FleetPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/clients" component={ClientsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <Footer />
      {location !== "/contact" && <div className="h-[72px] bg-[#F5F5F7] md:hidden" aria-hidden="true" />}
      <aside aria-label="Quick contact">
        <WhatsAppButton />
        <MobileActionBar />
      </aside>
    </ErrorBoundary>
  );
}

export default App;
