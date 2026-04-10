import { lazy, Suspense, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Programs from "../components/Programs";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import { getOpenCohorts, Cohort } from "../utils/cohorts";
import { formatDate } from "../utils/dateUtils";

const HomeBelowFold = lazy(() => import("../components/home/HomeBelowFold"));

const Index = () => {
  const [openCohorts] = useState<Cohort[]>(() => getOpenCohorts());

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
        <Suspense
          fallback={
            <div className="min-h-[28rem] bg-cream/30" aria-hidden />
          }
        >
          <HomeBelowFold />
        </Suspense>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
};

export default Index;
