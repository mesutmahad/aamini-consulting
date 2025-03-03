import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./pages/services";
import Pricing from "./pages/pricing";
import Contact from "./pages/contact";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import WhyChooseUs from "./components/why-choose-us";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";

function AppContent() {
  const location = useLocation();
  const hideFooter = ["/login", "/admin"].includes(location.pathname);

  return (
    <div className="bg-[#f9f9f9] dark:bg-gray-900 transition-colors duration-200">
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <WhyChooseUs />
              <Services />
            </main>
          }
        />
        <Route path="/src/pages/HomePage.jsx" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
