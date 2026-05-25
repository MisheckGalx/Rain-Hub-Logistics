import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import FleetPage from "./pages/FleetPage";
import ClientsPage from "./pages/ClientsPage";
import ContactPage from "./pages/ContactPage";

type Page = "home" | "services" | "about" | "fleet" | "clients" | "contact";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":      return <Home onNavigate={navigate} />;
      case "services":  return <ServicesPage onNavigate={navigate} />;
      case "about":     return <AboutPage onNavigate={navigate} />;
      case "fleet":     return <FleetPage onNavigate={navigate} />;
      case "clients":   return <ClientsPage onNavigate={navigate} />;
      case "contact":   return <ContactPage />;
      default:          return <Home onNavigate={navigate} />;
    }
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Navigation currentPage={currentPage} onNavigate={navigate} />
          {renderPage()}
          <Footer onNavigate={navigate} />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
