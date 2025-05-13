
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Programs from "../components/Programs";
import Testimonials from "../components/Testimonials";
import Volunteer from "../components/Volunteer";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

const Index = () => {
  // Change page title when component mounts
  useEffect(() => {
    document.title = "RemoteTrybe - Expert Training for Executive Support";
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <Testimonials />
        <Volunteer />
        <CTA />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
};

export default Index;
