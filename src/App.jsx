import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./pages/services";
import Pricing from "./pages/pricing";
import Contact from "./pages/contact";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import WhyChooseUs from "./components/why-choose-us";

export default function App() {
  return (
    // <div className=" pt-20">
    //    <Hero />
    //     <Services />
    //     <Pricing />

    // <Router>

    //     <Nav />
    //     <Routes>
    //       <Route path="/src/pages/HomePage.jsx" element={<HomePage />} />
    //       <Route path="/services" element={<Services />} />
    //       <Route path="/pricing" element={<Pricing />} />
    //       <Route path="/contact" element={<Contact />} />
    //       <Route path="/about" element={<AboutPage />} />
    //     </Routes>

    //   <Footer />
    //   </Router>
    // </div>

    <div className="bg-[#f9f9f9]">
      <Router>
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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
