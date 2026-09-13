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

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>

      <Footer />

      <ScrollIndicator targetId="about" />

      <WhatsAppButton />
    </>
  );
}

export default App;