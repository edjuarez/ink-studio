import { Outlet, Routes, Route } from "react-router-dom";
import "./App.css";

// PAGES
import Home from "./pages/Home";
import Contact from "./pages/ContactPage";

// COMPONENTS
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import ArtistPage from "./pages/ArtistPage";
import DesignsGalleryPage from "./pages/DesignsGalleryPage";
import ScrollToTop from "./components/ScrollToTop";
import PrintsGalleryPage from "./pages/PrintsPage";
import PortfolioGalleryPage from "./pages/PortfolioGalleryPage";
import NotFoundPage from "./pages/NotFoundPage";

// ADMIN
import { AdminAuthProvider } from "./context/AdminAuthProvider";
import {
  ProtectedAdminRoute,
  PublicAdminRoute,
} from "./components/admin/AdminRoutes";
import LoginPage from "./pages/admin/LoginPage";
import TattoosAdminPage from "./pages/admin/TattoosAdminPage";
import DesignsAdminPage from "./pages/admin/DesignsAdminPage";
import PrintsAdminPage from "./pages/admin/PrintsAdminPage";

function PublicLayout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />

      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <ScrollToTop />

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/artista" element={<ArtistPage />} />
          <Route path="/diseños" element={<DesignsGalleryPage />} />
          <Route path="/prints" element={<PrintsGalleryPage />} />
          <Route path="/portfolio" element={<PortfolioGalleryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route
          path="/admin/login"
          element={
            <PublicAdminRoute>
              <LoginPage />
            </PublicAdminRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <TattoosAdminPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/tatuajes"
          element={
            <ProtectedAdminRoute>
              <TattoosAdminPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/disenos"
          element={
            <ProtectedAdminRoute>
              <DesignsAdminPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/prints"
          element={
            <ProtectedAdminRoute>
              <PrintsAdminPage />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </AdminAuthProvider>
  );
}

export default App;