import { Check, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import PaymentModal from "../components/PaymentModal";
import VATestimonials from "../components/VAMasterclass/VATestimonials";
import VAHero from "../components/VAMasterclass/VAHero";
import VAFAQ from "../components/VAMasterclass/VAFAQ";
import PricingAndEnrollment from "../components/VAMasterclass/PricingAndEnrollment";
import { Cohort, getCohortById, getOpenCohorts } from "../utils/cohorts";
import { formatDate } from "../utils/dateUtils";
import { useReferralCode } from "../hooks/useReferralCode";
import { faqs, testimonialVideos, skills, softwareTools, handsOnSkills, bonusResources } from "../constants/vaMasterclass";
import { VA_MASTERCLASS_CONFIG } from "../config/constants";

const VAMasterclass = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCohortId, setSelectedCohortId] = useState<string | undefined>(undefined);
  const [upcomingCohorts, setUpcomingCohorts] = useState<Cohort[]>([]);
  const [selectedCohortDetails, setSelectedCohortDetails] = useState<Cohort | undefined>(undefined);
  const { referralCode, markReferralPending } = useReferralCode();

  useEffect(() => {
    document.title = "Virtual Assistant Masterclass | RemoteTrybe";
    const openCohorts = getOpenCohorts();
    setUpcomingCohorts(openCohorts);
    if (openCohorts.length > 0) {
      setSelectedCohortId(openCohorts[0].id);
    }
  }, []);

  useEffect(() => {
    if (selectedCohortId) {
      setSelectedCohortDetails(getCohortById(selectedCohortId));
    } else {
      setSelectedCohortDetails(undefined);
    }
  }, [selectedCohortId]);

  const handleEnrollClick = () => {
    if (selectedCohortId) {
      if (referralCode) {
        markReferralPending();
      }
      setShowPaymentModal(true);
    }
  };

  const isRegistrationOpenForSelectedCohort = selectedCohortDetails
    ? getOpenCohorts().some((c) => c.id === selectedCohortDetails.id)
    : false;

  const firstUpcomingCohort = upcomingCohorts.length > 0 ? upcomingCohorts[0] : undefined;
  const isRegistrationOpenForFirstCohort = firstUpcomingCohort
    ? getOpenCohorts().some((c) => c.id === firstUpcomingCohort.id)
    : false;

  return (
    <>
      <Navbar />
      <main>
        <VAHero
          onEnrollClick={() => handleEnrollClick()}
          registrationStartDate={firstUpcomingCohort?.registrationStart}
        />

        <section className="py-16 bg-white" id="skills">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <h2 className="section-title">What You'll Learn</h2>
              <p className="section-subtitle">Master the exact skills that lead to high-paying remote positions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
              {skills.map((skill, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <div className="mb-3">
                    <skill.icon className="text-primary" size={28} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{skill.title}</h3>
                  <p className="text-gray-600 text-sm">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-cream" id="tools">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <h2 className="section-title">Tools & Platforms You'll Master</h2>
              <p className="section-subtitle">From project management to AI—learn the software that remote businesses use daily</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 reveal">
              {softwareTools.map((tool, index) => (
                <div key={index} className="bg-white p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <tool.icon className="text-primary mx-auto" size={24} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{tool.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white" id="bonuses">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <h2 className="section-title">Bonus Resources Included</h2>
              <p className="section-subtitle">Get more than just a course—get the complete toolkit for success</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
              {bonusResources.map((resource, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10">
                      <resource.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{resource.title}</h3>
                    <p className="text-gray-600">{resource.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="py-16 bg-white" id="hands-on-skills">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <h2 className="section-title">Hands-on Skills You'll Gain</h2>
              <p className="section-subtitle">
                Practical skills that will make you a valuable asset to any business
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {handsOnSkills.map((skill, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm reveal">
                  <div className="flex items-center gap-3">
                    <Check className="text-primary" size={20} />
                    <span className="font-medium">{skill}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingAndEnrollment
          upcomingCohorts={upcomingCohorts}
          selectedCohortId={selectedCohortId}
          selectedCohortDetails={selectedCohortDetails}
          isRegistrationOpenForSelectedCohort={isRegistrationOpenForSelectedCohort}
          onCohortChange={setSelectedCohortId}
          onEnrollClick={handleEnrollClick}
        />

        <VATestimonials testimonialVideos={testimonialVideos} />

        <section className="py-16 bg-cream" id="faq">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Have questions? We have answers.</p>
            </div>
            <VAFAQ faqs={faqs} />
          </div>
        </section>

        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto text-center reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your VA Career?</h2>
            {firstUpcomingCohort && (
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                {isRegistrationOpenForFirstCohort
                  ? `Join our ${firstUpcomingCohort.name} cohort, with registration closing on ${formatDate(firstUpcomingCohort.registrationEnd)}.`
                  : `Registration for our next cohort (${firstUpcomingCohort.name}) is now closed. Training starts on ${formatDate(firstUpcomingCohort.trainingStart)}.`}
              </p>
            )}
            <a
              href="#pricing"
              className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all inline-flex items-center"
            >
              Secure Your Spot Now <ArrowRight className="ml-2" size={18} />
            </a>
          </div>
        </section>

        <div className="fixed bottom-6 right-6 z-40">
          <button className="btn-primary shadow-lg" onClick={() => handleEnrollClick()}>
            Enroll Now
          </button>
        </div>

        <div className="fixed bottom-6 left-6 z-40">
          <a
            href="https://wa.me/2349060038374"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.5025 3.50378C18.2486 1.24993 15.2522 0 12.0445 0C5.46358 0 0.0945549 5.36903 0.0945549 11.9499C0.0945549 14.0577 0.668112 16.1154 1.76317 17.9232L0 24L6.21919 22.2693C7.96316 23.2694 9.9844 23.7923 12.0445 23.7923C18.6254 23.7923 23.9944 18.4232 23.9944 11.8424C23.9944 8.63471 22.7564 5.63824 20.5025 3.50378ZM12.0445 21.792C10.2466 21.792 8.5026 21.2691 6.97555 20.3305L6.61857 20.1155L2.86177 21.1385L3.88479 17.4617L3.6698 17.0847C2.64678 15.5001 2.09498 13.7424 2.09498 11.9499C2.09498 6.42319 6.51778 1.9924 12.0445 1.9924C14.7293 1.9924 17.2216 3.02705 19.0509 4.83951C20.8803 6.65196 22.025 9.16494 22.025 11.8424C22.025 17.3691 17.6022 21.792 12.0445 21.792ZM17.4965 14.4347C17.1826 14.2774 15.7143 13.5461 15.4433 13.4461C15.1722 13.3461 14.9727 13.2961 14.7733 13.5961C14.5738 13.896 13.9936 14.5772 13.8156 14.7772C13.6377 14.9772 13.4812 14.9988 13.1673 14.8418C12.8534 14.6851 11.8874 14.3868 10.7493 13.3669C9.85848 12.5631 9.25667 11.5759 9.07872 11.276C8.90077 10.976 9.05173 10.8143 9.19583 10.6609C9.32843 10.5236 9.48069 10.313 9.63166 10.13C9.78262 9.94705 9.82402 9.8113 9.92682 9.61135C10.0296 9.41139 9.98822 9.22885 9.91252 9.07258C9.83681 8.91632 9.24931 7.44671 9.00012 6.8336C8.75964 6.22048 8.51868 6.3122 8.33211 6.3122C8.14555 6.3122 7.93748 6.29054 7.73802 6.29054C7.52994 6.29054 7.21735 6.36624 6.94631 6.6662C6.67527 6.96615 5.90244 7.69747 5.90244 9.16708C5.90244 10.6367 6.96774 12.0563 7.1187 12.2563C7.26966 12.4562 9.23501 15.5176 12.2236 16.7799C15.2122 18.0422 15.2122 17.6346 15.754 17.5914C16.2957 17.5482 17.4965 16.86 17.7457 16.1445C18.0163 15.3999 18.0163 14.7866 17.9406 14.6736C17.865 14.5607 17.6655 14.4991 17.4965 14.4347Z"
                fill="white"
              />
            </svg>
          </a>
        </div>

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={VA_MASTERCLASS_CONFIG.PRICE_KOBO}
          cohortId={selectedCohortId}
          referralCode={referralCode}
        />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
};

export default VAMasterclass;
