
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Programs = () => {
  return (
    <section id="programs" className="py-16">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto reveal">
          <h2 className="section-title">Featured Programs</h2>
          <p className="section-subtitle">
            Comprehensive learning paths designed to help you master in-demand skills and secure high-paying remote opportunities.
          </p>
        </div>

        <div className="mt-12 reveal">
          <div className="bg-white border-2 border-primary rounded-2xl overflow-hidden shadow-lg">
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-dark mb-4">Virtual Assistant Masterclass</h3>
                  <p className="text-gray-600 mb-6">
                    Launch your VA career and earn in dollars in just 6 weeks. Master essential skills and join our community of successful virtual assistants.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-start">
                      <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Profile Optimization</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Mentorship & Accountability</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Portfolio Building</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Job Application Guide</span>
                    </div>
                  </div>
                </div>
                
                <Link to="/va-masterclass" className="btn-primary whitespace-nowrap">
                  Explore Course <ArrowRight className="ml-2" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div className="card reveal">
            <h4 className="text-xl font-semibold mb-4">Free Webinar</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Class Dates: <br/> <b>September 5</b> <br/> <b>October 25</b></span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Join the Telegram wait group:</span>
                <a
                  href="https://t.me/+48G2uFqTBC5hZDY0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center px-3 py-1.5 rounded-lg bg-[#229ED9] text-white font-semibold shadow hover:bg-[#1787b7] transition-colors text-sm"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <svg width="18" height="18" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <circle cx="120" cy="120" r="120" fill="#229ED9"/>
                    <path d="M180.5 72.5L157.5 177.5C155.5 185.5 150.5 187.5 143.5 183.5L110.5 159.5L94.5 174.5C92.5 176.5 91 178 87.5 178L89.5 144.5L157.5 82.5C160.5 79.5 157.5 78.5 153.5 81.5L75.5 134.5L42.5 124.5C35.5 122.5 35.5 117.5 44.5 114.5L170.5 70.5C177.5 68.5 182.5 72.5 180.5 72.5Z" fill="white"/>
                  </svg>
                  Telegram Group
                </a>
              </li>
            </ul>
          </div>
          
          <div className="card reveal">
            <h4 className="text-xl font-semibold mb-4">Mentorship & Accountability</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Weekly check-ins and feedback</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Personalized career plans</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Mentor-led live Q&A</span>
              </li>
            </ul>
          </div>
          
          <div className="card reveal">
            <h4 className="text-xl font-semibold mb-4">Portfolio Review Services</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Expert feedback on layout and content</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Improvement suggestions</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Template resources</span>
              </li>
            </ul>
          </div>
          
          <div className="card reveal">
            <h4 className="text-xl font-semibold mb-4">Job Application Guide</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Curated job opportunity lists</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Application tracker and sheets</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Pitch scripts and templates</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
