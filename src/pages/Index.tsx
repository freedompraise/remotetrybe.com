import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Programs from "../components/Programs";
import Testimonials from "../components/Testimonials";
import Career from "../components/Career";
import Team from "../components/Team";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import { getOpenCohorts, Cohort } from "../utils/cohorts";
import { formatDate } from "../utils/dateUtils";

const Index = () => {

  const [openCohorts, setOpenCohorts] = useState<Cohort[]>([]);

  useEffect(() => {
    setOpenCohorts(getOpenCohorts());
  }, []);

  // Show the soonest closing open cohort for homepage highlight
  const soonestCohort = openCohorts[0];

  const ctaText = soonestCohort
    ? `Registration is open for ${soonestCohort.name}. It closes on ${formatDate(soonestCohort.registrationEnd)}.`
    : "Ready to transform your career? Contact us to learn about upcoming opportunities.";

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <Testimonials />
        <Team />
        <Career />
        <CTA text={ctaText} link={soonestCohort && new Date(soonestCohort.registrationEnd) > new Date() ? "/va-masterclass#pricing" : "/va-masterclass"} />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
};

export default Index;
