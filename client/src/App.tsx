import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import FleetPage from "./pages/FleetPage";
import ClientsPage from "./pages/ClientsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const paths: Record<string, string> = {
  home: "/",
  services: "/services",
  about: "/about",
  fleet: "/fleet",
  clients: "/clients",
  contact: "/contact",
};

const titles: Record<string, string> = {
  "/": "Rain Hub Logistics — Freight, customs and truck hire from Midrand",
  "/services": "Services — Rain Hub Logistics",
  "/fleet": "Our fleet — Rain Hub Logistics",
  "/about": "About — Rain Hub Logistics",
  "/clients": "Clients — Rain Hub Logistics",
  "/contact": "Get a quote — Rain Hub Logistics",
};

function App() {
  const [location, setLocation] = useLocation();

  // Pages not yet rebuilt still call onNavigate("services") etc. — map that onto real URLs.
  const onNavigate = (page: string) => setLocation(paths[page] ?? "/");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.title = titles[location] ?? "Page not found — Rain Hub Logistics";
  }, [location]);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Navigation />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services">{() => <ServicesPage onNavigate={onNavigate} />}</Route>
            <Route path="/about">{() => <AboutPage onNavigate={onNavigate} />}</Route>
            <Route path="/fleet">{() => <FleetPage onNavigate={onNavigate} />}</Route>
            <Route path="/clients">{() => <ClientsPage onNavigate={onNavigate} />}</Route>
            <Route path="/contact" component={ContactPage} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
          <WhatsAppButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
