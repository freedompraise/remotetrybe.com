import { useEffect, useState } from "react";
import { ChevronDown, Check, ArrowRight, Calendar, Clock, Users, Share2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import PaymentModal from "../components/PaymentModal";
import AffiliateModal from "../components/AffiliateModal";
import VATestimonials from "../components/VAMasterclass/VATestimonials";
import VAHero from "../components/VAMasterclass/VAHero";
import VAFAQ from "../components/VAMasterclass/VAFAQ";
import VACurriculum from "../components/VAMasterclass/VACurriculum";
import { Cohort, cohorts, getCohortById } from "../utils/cohorts";
import { formatDate, formatDateRange } from "../utils/dateUtils";
import { useReferralCode } from "../hooks/useReferralCode";

const VAMasterclass = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);
  const [selectedCohortId, setSelectedCohortId] = useState<string | undefined>(undefined);
  const [upcomingCohorts, setUpcomingCohorts] = useState<Cohort[]>([]);
  const [selectedCohortDetails, setSelectedCohortDetails] = useState<Cohort | undefined>(undefined);
  const referralCode = useReferralCode();

  // Change page title when component mounts and get upcoming cohorts
  useEffect(() => {
    document.title = "Virtual Assistant Masterclass | RemoteTrybe";
    // Filter cohorts whose training hasn't ended yet
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const relevant = cohorts.filter(cohort => new Date(cohort.trainingEnd) >= today)
                              .sort((a, b) => new Date(a.trainingStart).getTime() - new Date(b.trainingStart).getTime());
    setUpcomingCohorts(relevant);
    // Set initial selected cohort to the first one if available
    if (relevant.length > 0) {
        setSelectedCohortId(relevant[0].id);
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
      setShowPaymentModal(true);
    } else {
      // Should not happen if button is disabled when no cohort is selected
      console.log("No cohort selected.");
    }
  };

  const isRegistrationOpenForSelectedCohort = selectedCohortDetails && new Date() <= new Date(selectedCohortDetails.registrationEnd);

  // Find the first upcoming cohort to display in Hero/CTA if needed
  const firstUpcomingCohort = upcomingCohorts.length > 0 ? upcomingCohorts[0] : undefined;
  const isRegistrationOpenForFirstCohort = firstUpcomingCohort && new Date() <= new Date(firstUpcomingCohort.registrationEnd);

  // Modules data for the curriculum section
  const modules = [
    {
      title: "Foundation & Setup",
      description: "Establish your professional online presence and technical foundation",
      points: [
        "Optimize your Upwork and LinkedIn profiles for maximum visibility",
        "Set up dollar account and TIN for international payments",
        "Master essential tools: MS Office and Google Workspace"
      ]
    },
    {
      title: "VA Core Skills",
      description: "Develop fundamental virtual assistant capabilities",
      points: [
        "Email and calendar management techniques for efficiency",
        "Document formatting, handling, and organization systems",
        "Meeting scheduling and project management approaches"
      ]
    },
    {
      title: "Advanced Support Skills",
      description: "Elevate your service offerings with specialized knowledge",
      points: [
        "CRM management and data entry best practices",
        "Travel arrangement and expense tracking systems",
        "Time management and productivity optimization"
      ]
    },
    {
      title: "Client Acquisition",
      description: "Build your portfolio and land high-quality clients",
      points: [
        "Create compelling portfolio samples and professional CV",
        "Master job platform strategies and proposal writing",
        "Develop interview skills and pricing strategies"
      ]
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How much does the program cost?",
      answer: "The Virtual Assistant Masterclass costs ₦32,000 or $23. We offer flexible payment options and early-bird discounts for select cohorts."
    },
    {
      question: "Do I need prior experience to enroll?",
      answer: "No prior experience is required. Our curriculum is designed to take you from beginner to job-ready, regardless of your starting point."
    },
    {
      question: "Will I receive certification after completion?",
      answer: "Yes, upon successful completion of all modules and the final project, you will receive an official RemoteTrybe certification."
    },
    {
      question: "Do I require a laptop to participate?",
      answer: "For a start, a smartphone is sufficient to join the live classes and access course materials. However, a laptop is recommended for completing assignments and projects effectively."
    },
    {
      question: "Is there ongoing support after the program ends?",
      answer: "Absolutely! You'll have lifetime access to our 400+ VA community with ongoing mentorship and resources."
    }
  ];

  // Testimonial videos data
  const testimonialVideos = [
    {
      id: 1,
      title: "Success Story: From Beginner to Earning $25/hr",
      src: "https://youtu.be/iCBzkVCedr4"
    },
    {
      id: 2,
      title: "How I Landed My First International Client",
      src: "https://drive.google.com/file/d/1du8J0evGHRLw5gAO_rdWwjIAF5QN6bqr"
    },
    {
      id: 3,
      title: "My Journey to Financial Freedom with Remote Work",
      src: "https://youtu.be/7OJ0pFXgcRc"
    },
    {
      id: 4,
      title: "Building a Sustainable VA Career",
      src: "https://youtu.be/Y3Xyi1-S0l4"
    },
    {
      id: 5,
      title: "Blessing's Review",
      src: "https://youtu.be/0UosFFrkRPk?si=E47dGUpqDOVNEEnt"
    },
    {
      id: 6,
      title: "Toyosi's Review",
      src:"https://youtube.com/shorts/UIAFpnXmKuI?si=w5A1ccSRFoN2quy9"
    }
  ];

  return (
    <>
      <Navbar />      <main>
        <VAHero 
          onEnrollClick={() => handleEnrollClick()}
          registrationStartDate={firstUpcomingCohort?.registrationStart}
        />

        {/* Course Overview & Benefits */}
        <section className="py-16" id="overview">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto reveal">
              <h2 className="section-title">Course Overview & Benefits</h2>
              <p className="section-subtitle">
                A comprehensive program designed to equip you with in-demand virtual assistant skills that command premium rates in the global marketplace.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <div className="card reveal">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Live Interactive Sessions</h3>
                <p className="text-gray-600">
                  Learn directly from expert instructors with real-time Q&A and personalized feedback on your progress.
                </p>
              </div>
              
              
              <div className="card reveal">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Check className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-world Assignments</h3>
                <p className="text-gray-600">
                  Practice with practical tasks that simulate actual client work, with detailed feedback loops.
                </p>
              </div>

              <div className="card reveal">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Clock className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexible Learning Schedule</h3>
                <p className="text-gray-600">
                  Classes held Fridays to Sundays, allowing you to balance learning with your current commitments.
                </p>
              </div>
              
              <div className="card reveal">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Support</h3>
                <p className="text-gray-600">
                  Join our 400+ community of VAs for networking, job opportunities, and ongoing mentorship.
                </p>
              </div>
            </div>
          </div>
        </section>
          <VACurriculum modules={modules} />
        
        {/* Instructor Bio */}
        <section className="py-16" id="instructor">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center reveal">
              <div className="md:col-span-1">
                <img 
                  src="/lovable-uploads/26d6d984-5c88-4d41-a698-0bcba915bf39.png" 
                  alt="Odosa Egharevba" 
                  className="rounded-2xl shadow-lg w-full max-w-sm mx-auto" 
                />
              </div>
              
              <div className="md:col-span-2">
                <h2 className="section-title">Meet Your Instructor</h2>
                <h3 className="text-2xl font-bold mb-4">Odosa Egharevba</h3>
                <p className="text-gray-700 mb-6">
                  Odosa Egharevba is a top-rated Upwork freelancer with earnings of over $30K on Upwork
                  She has 32,000+ LinkedIn followers and has hosted live sessions for more than 5,000 viewers.
                </p>
                <p className="text-gray-700 mb-8">
                  With years of experience in training virtual assistants, Odosa has helped hundreds of professionals 
                  transform their careers and secure high-paying remote opportunities. Her practical, results-driven 
                  approach ensures students build real-world skills that clients value.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://linkedin.com/in/odosa-egharevba-68634a248" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0077B5] text-white px-4 py-2 rounded-lg inline-flex items-center hover:bg-opacity-90 transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                  <a 
                    href="https://upwork.com/freelancers/~015fbfcd69b6c4a7b8" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#6FDA44] text-white px-4 py-2 rounded-lg inline-flex items-center hover:bg-opacity-90 transition-colors"
                  >
                    Upwork Profile
                  </a>
                </div>
              </div>
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
                             {new Date() <= new Date(selectedCohortDetails.registrationEnd) ? (
                               <h4 className="font-bold mb-2">Registration closes: {formatDate(selectedCohortDetails.registrationEnd)}</h4>
                             ) : (
                               <h4 className="font-bold mb-2 text-red-600">Registration closed. Training starts: {formatDate(selectedCohortDetails.trainingStart)}</h4>
                             )}
                             
                             <p className="text-gray-600">
                               Training dates: {formatDateRange(selectedCohortDetails.trainingStart, selectedCohortDetails.trainingEnd)}
                             </p>
                           </div>

                           {/* Include key features here as well, maybe condensed or linked */}
                            <ul className="space-y-4">
                               <li className="flex items-start">
                                 <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                                 <span className="text-gray-700">Live interactive training sessions (Fri-Sun)</span>
                               </li>
                               <li className="flex items-start">
                                 <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                                 <span className="text-gray-700">Lifetime access to our community</span>
                               </li>
                               {/* ... add other key features ... */}
                             </ul>

                       </div>
                    )}

                    {!selectedCohortDetails && upcomingCohorts.length > 0 && (
                         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                            <p className="font-bold">Please select a cohort</p>
                            <p className="text-sm">Choose an upcoming cohort from the dropdown above to see details and enroll.</p>
                         </div>
                    )}

                    <div className="flex justify-center mb-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary">₦32,000</div>
                            <div className="text-gray-500">or $23 USD</div>
                          </div>
                    </div>
                    
                    <button 
                      className="btn-primary w-full text-lg py-4"
                      onClick={handleEnrollClick}
                      disabled={!selectedCohortDetails || !isRegistrationOpenForSelectedCohort} // Disable if no cohort selected or registration closed
                    >
                      {isRegistrationOpenForSelectedCohort ? "Enroll Now" : "Registration Closed"}
                    </button>
                    
                    <p className="text-center text-sm text-gray-500 mt-4">
                      Payment processed securely through Paystack
                    </p>
                  </div>
                </div>
              ) : (
                 <div className="col-span-1 text-center">
                   <h4 className="text-xl font-bold text-gray-700">No upcoming cohorts scheduled at this time. Please check back later!</h4>
                 </div>
              )}
            </div>
          </div>
        </section>
        
        
           <VATestimonials testimonialVideos={testimonialVideos} />
        <VAFAQ faqs={faqs} />

          {/* Affiliate CTA Section */}
          <section className="py-16 bg-cream">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Earn While Making a Difference</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join our affiliate program and earn 5% commission for every successful enrollment you refer.
                Share the opportunity with your network and start earning passive income today!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">Easy Earnings</h3>
                  <p className="text-gray-600 text-sm">5% commission for every successful enrollment</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">Big Rewards</h3>
                  <p className="text-gray-600 text-sm">Earn up to ₦20,000 for 10 successful referrals</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">Get Paid</h3>
                  <p className="text-gray-600 text-sm">Eligible for payout after 5 successful referrals</p>
                </div>
              </div>
              <button
                onClick={() => setShowAffiliateModal(true)}
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                <Share2 size={20} />
                Become an Affiliate
              </button>
            </div>
          </div>
        </section>

        
        {/* Final CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto text-center reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your VA Career?</h2>
            {firstUpcomingCohort && (
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                {isRegistrationOpenForFirstCohort ? 
                 `Join our ${firstUpcomingCohort.name} cohort, with registration closing on ${formatDate(firstUpcomingCohort.registrationEnd)}.` :
                 `Registration for our next cohort (${firstUpcomingCohort.name}) is now closed. Training starts on ${formatDate(firstUpcomingCohort.trainingStart)}.`
                }
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
        
        {/* Floating "Enroll Now" Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <button 
            className="btn-primary shadow-lg"
            onClick={() => handleEnrollClick()}
          >
            Enroll Now
          </button>
        </div>
        
        {/* WhatsApp Chat Icon */}
        <div className="fixed bottom-6 left-6 z-40">
          <a 
            href="https://wa.me/2349060038374" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M20.5025 3.50378C18.2486 1.24993 15.2522 0 12.0445 0C5.46358 0 0.0945549 5.36903 0.0945549 11.9499C0.0945549 14.0577 0.668112 16.1154 1.76317 17.9232L0 24L6.21919 22.2693C7.96316 23.2694 9.9844 23.7923 12.0445 23.7923C18.6254 23.7923 23.9944 18.4232 23.9944 11.8424C23.9944 8.63471 22.7564 5.63824 20.5025 3.50378ZM12.0445 21.792C10.2466 21.792 8.5026 21.2691 6.97555 20.3305L6.61857 20.1155L2.86177 21.1385L3.88479 17.4617L3.6698 17.0847C2.64678 15.5001 2.09498 13.7424 2.09498 11.9499C2.09498 6.42319 6.51778 1.9924 12.0445 1.9924C14.7293 1.9924 17.2216 3.02705 19.0509 4.83951C20.8803 6.65196 22.025 9.16494 22.025 11.8424C22.025 17.3691 17.6022 21.792 12.0445 21.792ZM17.4965 14.4347C17.1826 14.2774 15.7143 13.5461 15.4433 13.4461C15.1722 13.3461 14.9727 13.2961 14.7733 13.5961C14.5738 13.896 13.9936 14.5772 13.8156 14.7772C13.6377 14.9772 13.4812 14.9988 13.1673 14.8418C12.8534 14.6851 11.8874 14.3868 10.7493 13.3669C9.85848 12.5631 9.25667 11.5759 9.07872 11.276C8.90077 10.976 9.05173 10.8143 9.19583 10.6609C9.32843 10.5236 9.48069 10.313 9.63166 10.13C9.78262 9.94705 9.82402 9.8113 9.92682 9.61135C10.0296 9.41139 9.98822 9.22885 9.91252 9.07258C9.83681 8.91632 9.24931 7.44671 9.00012 6.8336C8.75964 6.22048 8.51868 6.3122 8.33211 6.3122C8.14555 6.3122 7.93748 6.29054 7.73802 6.29054C7.52994 6.29054 7.21735 6.36624 6.94631 6.6662C6.67527 6.96615 5.90244 7.69747 5.90244 9.16708C5.90244 10.6367 6.96774 12.0563 7.1187 12.2563C7.26966 12.4562 9.23501 15.5176 12.2236 16.7799C15.
              2122 18.0422 15.2122 17.6346 15.754 17.5914C16.2957 17.5482 17.4965 16.86 17.7457 16.1445C18.0163 15.3999 18.0163 14.7866 17.9406 14.6736C17.865 14.5607 17.6655 14.4991 17.4965 14.4347Z" fill="white"/>
            </svg>
          </a>
        </div>

        {/* Payment Modal */}
        <PaymentModal 
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={3200000} // ₦32,000 in kobo (smallest currency unit)
          cohortId={selectedCohortId} // Pass the selected cohort ID
          referralCode={referralCode} // Pass the referral code if present
        />

        {/* Affiliate Modal */}
        <AffiliateModal
          isOpen={showAffiliateModal}
          onClose={() => setShowAffiliateModal(false)}
        />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
};

export default VAMasterclass;
