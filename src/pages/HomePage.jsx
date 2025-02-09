import Hero from "../components/Hero";
import Nav from "../components/Nav";
import Services from "./services";
import Pricing from "./pricing";
import Footer from "../components/Footer";
import { useEffect } from "react";

export default function HomePage() {
   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Pricing />
      <Footer />

    </>
  );
}
