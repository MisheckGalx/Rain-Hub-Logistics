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

const titles: Record<string, string> = {
  "/": "Rain Hub Logistics — Freight, customs and truck hire from Midrand",
  "/services": "Services — Rain Hub Logistics",
  "/fleet": "Our fleet — Rain Hub Logistics",
  "/about": "About — Rain Hub Logistics",
  "/clients": "Clients — Rain Hub Logistics",
  "/contact": "Get a quote — Rain Hub Logistics",
};

const descriptions: Record<string, string> = {
  "/": "Rain Hub Logistics moves cargo across Southern Africa: road, sea and air freight, customs clearance and truck hire from Midrand, Johannesburg.",
  "/services": "Road freight, sea freight, air freight, customs clearance and truck hire from one Midrand-based team.",
  "/fleet": "Trucks from 8 to 36 tonnes with professional drivers, dispatched from Midrand for regional and cross-border loads.",
  "/about": "Rain Hub Logistics is a Midrand logistics company moving cargo by road, sea and air across Southern Africa.",
  "/clients": "Businesses across cable, machinery and heavy industry that rely on Rain Hub Logistics to move their freight.",
  "/contact": "Request a freight quote from Rain Hub Logistics. Call, WhatsApp or send the details and we'll come back with a price.",
};

function App() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.title = titles[location] ?? "Page not found — Rain Hub Logistics";
    document.querySelector('meta[name="description"]')?.setAttribute("content", descriptions[location] ?? descriptions["/"]);
  }, [location]);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Navigation />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={ServicesPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/fleet" component={FleetPage} />
            <Route path="/clients" component={ClientsPage} />
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
