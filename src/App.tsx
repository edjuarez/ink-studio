import { Routes, Route } from "react-router-dom";
import "./App.css";

// PAGES
import Home from "./pages/Home";
import Contact from "./pages/ContactPage";

// COMPONENTS
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollIndicator from "./components/ui/ScrollIndicator";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import ArtistPage from "./pages/ArtistPage";
import DesignsGalleryPage from "./pages/DesignsGalleryPage";
import ScrollToTop from "./components/ScrollToTop";
import PrintsGalleryPage from "./pages/PrintsPage";
import PortfolioGalleryPage from "./pages/PortfolioGalleryPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/artista" element={<ArtistPage />} />
        <Route path="/diseños" element={<DesignsGalleryPage />} />
        <Route path="/prints" element={<PrintsGalleryPage />} />
        <Route path="/portfolio" element={<PortfolioGalleryPage />} />
      </Routes>

      <Footer />

      <ScrollIndicator targetId="home" />

      <WhatsAppButton />
    </>
  );
}

export default App;