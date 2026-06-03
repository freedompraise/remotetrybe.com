import { ChevronDown, Check, ArrowRight, Calendar, Clock, Users } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import PaymentModal from "../components/PaymentModal";
import VATestimonials from "../components/VAMasterclass/VATestimonials";
import VAHero from "../components/VAMasterclass/VAHero";
import VAFAQ from "../components/VAMasterclass/VAFAQ";
import { Cohort, getCohortById, getOpenCohorts } from "../utils/cohorts";
import { formatDate, formatDateRange } from "../utils/dateUtils";
import { useReferralCode } from "../hooks/useReferralCode";
import { faqs, testimonialVideos, skills, softwareTools, handsOnSkills, bonusResources } from "../constants/vaMasterclass";
import { VA_MASTERCLASS_CONFIG } from "../config/constants";

const VAMasterclass = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [selectedCohortId, setSelectedCohortId] = useState<string | undefined>(undefined);
  const [upcomingCohorts, setUpcomingCohorts] = useState<Cohort[]>([]);
  const [selectedCohortDetails, setSelectedCohortDetails] = useState<Cohort | undefined>(undefined);
  const { referralCode, markReferralPending } = useReferralCode();

  // Change page title when component mounts and get upcoming cohorts
  useEffect(() => {
    document.title = "Virtual Assistant Masterclass | RemoteTrybe";
    const openCohorts = getOpenCohorts();
    setUpcomingCohorts(openCohorts);
    // Set initial selected cohort to the first one if available
    if (openCohorts.length > 0) {
        setSelectedCohortId(openCohorts[0].id);
    }
  }, []);

  // Update selected cohort details when selectedCohortId changes
  useEffect(() => {
    if (selectedCohortId) {
        const details = getCohortById(selectedCohortId);
        setSelectedCohortDetails(details);
    } else {
        setSelectedCohortDetails(undefined);
    }
  }, [selectedCohortId]);

  // Handle enrollment button clicks
  const handleEnrollClick = () => {
    if (selectedCohortId) {
      // Mark referral as pending before payment
      if (referralCode) {
        markReferralPending();
      }
      setShowPaymentModal(true);
    } else {
      // Should not happen if button is disabled when no cohort is selected
      console.log("No cohort selected.");
    }
  };

  const isRegistrationOpenForSelectedCohort = selectedCohortDetails ? getOpenCohorts().some(c => c.id === selectedCohortDetails.id) : false;

  // Find the first upcoming cohort to display in Hero/CTA if needed
  const firstUpcomingCohort = upcomingCohorts.length > 0 ? upcomingCohorts[0] : undefined;
  const isRegistrationOpenForFirstCohort = firstUpcomingCohort ? getOpenCohorts().some(c => c.id === firstUpcomingCohort.id) : false;

  return (
    <>
      <Navbar />
      <main>
        <VAHero
          onEnrollClick={() => handleEnrollClick()}
          registrationStartDate={firstUpcomingCohort?.registrationStart}
        />

        {/* Skills Section */}
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

        {/* Software Tools Section */}
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

        {/* Bonus Resources Section */}
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

        {/* Modules Section */}
        <section className="py-16 bg-cream" id="modules">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <h2 className="section-title">Structured Learning Path</h2>
              <p className="section-subtitle">Progress through carefully designed modules at your own pace</p>
            </div>
          </div>
        </section>

        {/* Hands-on Skills Section */}
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
   
   {/* Dynamic Pricing & Enrollment Section */}
<section id="pricing" className="py-16 bg-cream">
  <div className="container mx-auto">
    <div className="text-center max-w-3xl mx-auto reveal">
      <h2 className="section-title">Pricing & Enrollment</h2>
      <p className="section-subtitle">
        Choose the cohort that fits your schedule and start your journey.
      </p>
    </div>
    
    <div className="max-w-md mx-auto mt-12">
      {upcomingCohorts.length > 0 ? (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="bg-primary text-white py-6 px-8">
            <h3 className="text-2xl font-bold">Select Your Cohort</h3>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <label htmlFor="cohort-select" className="block text-sm font-medium text-gray-700 mb-2">Choose a Cohort:</label>
              <select 
                id="cohort-select"
                value={selectedCohortId || ''}
                onChange={(e) => setSelectedCohortId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {upcomingCohorts.map(cohort => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.name} (Training: {formatDate(cohort.trainingStart)} - {formatDate(cohort.trainingEnd)})
                  </option>
                ))}
              </select>
            </div>

            {selectedCohortDetails && (
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  {(() => {
                    const isOpen = getOpenCohorts().some(c => c.id === selectedCohortDetails.id);
                    if (isOpen) {
                      return <h4 className="font-bold mb-2">Registration closes: {formatDate(selectedCohortDetails.registrationEnd)}</h4>;
                    } else {
                      return <h4 className="font-bold mb-2 text-red-600">Registration is now closed for this cohort. Training starts: {formatDate(selectedCohortDetails.trainingStart)}</h4>;
                    }
                  })()}
                  
                  <p className="text-gray-600">
                    Training dates: {formatDateRange(selectedCohortDetails.trainingStart, selectedCohortDetails.trainingEnd)}
                  </p>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-700">Live interactive training sessions (Fri-Sun)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-700">Lifetime access to our community</span>
                  </li>
                </ul>
              </div>
            )}

            {!selectedCohortDetails && upcomingCohorts.length > 0 && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                <p className="font-bold">Please select a cohort</p>
                <p className="text-sm">Choose an upcoming cohort from the dropdown above to see details and enroll.</p>
              </div>
            )}

            <div className="flex justify-center mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">₦{VA_MASTERCLASS_CONFIG.PRICE_NGN.toLocaleString()}</div>
                <div className="text-gray-500">or ${VA_MASTERCLASS_CONFIG.PRICE_USD} USD</div>
              </div>
            </div>

            <button
              onClick={handleEnrollClick}
              disabled={!selectedCohortId}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Enroll Now
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-8 rounded-2xl text-center">
          <p className="text-gray-600 mb-2">No cohorts are currently available.</p>
          <p className="text-gray-500 text-sm">Please check back soon for upcoming training dates.</p>
        </div>
      )}
    </div>
  </div>
</section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <VATestimonials videos={testimonialVideos} />
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-cream" id="faq">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Have questions? We have answers.</p>
            </div>
            <VAFAQ faqs={faqs} />
          </div>
        </section>

        <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} cohortId={selectedCohortId} />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
};

export default VAMasterclass;