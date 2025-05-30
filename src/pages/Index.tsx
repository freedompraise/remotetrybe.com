import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Programs from "../components/Programs";
import Testimonials from "../components/Testimonials";
import Career from "../components/Career";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import { getActiveCohort, Cohort } from "../utils/cohorts";
import { formatDate } from "../utils/dateUtils";

const Index = () => {
  const [activeCohort, setActiveCohort] = useState<Cohort | undefined>(undefined);

  // Change page title and get active cohort when component mounts
  useEffect(() => {
    document.title = "RemoteTrybe - Expert Training for Executive Support";
    setActiveCohort(getActiveCohort());
  }, []);

  const isRegistrationOpen = activeCohort && new Date() >= new Date(activeCohort.registrationStart) && new Date() <= new Date(activeCohort.registrationEnd);

  // Pass dynamic data to CTA component
  const ctaText = activeCohort 
    ? isRegistrationOpen 
      ? `Ready to transform your career? Join our ${activeCohort.name} cohort, with registration ending on ${formatDate(activeCohort.registrationEnd)}.`
      : `Interested in our next cohort? Registration for ${activeCohort.name} opens on ${formatDate(activeCohort.registrationStart)}. Get ready!`
    : "Ready to transform your career? Contact us to learn about upcoming opportunities.";

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <Testimonials />
        <Career />
        <CTA text={ctaText} link={activeCohort && isRegistrationOpen ? "/va-masterclass#pricing" : "/va-masterclass"} />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
};

export default Index;
