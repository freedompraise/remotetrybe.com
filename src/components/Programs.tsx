
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
            <h4 className="text-xl font-semibold mb-4">Upwork Free Webinar</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Class Dates: <br/> <b>September 5</b> <br/> <b>October 25</b></span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Join the WhatsApp wait group:</span>
                <a
                  href="https://chat.whatsapp.com/IwT31O4hxRtHBH0Ph7xybI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-semibold shadow hover:bg-[#1ebe57] transition-colors text-sm"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.5025 3.50378C18.2486 1.24993 15.2522 0 12.0445 0C5.46358 0 0.0945549 5.36903 0.0945549 11.9499C0.0945549 14.0577 0.668112 16.1154 1.76317 17.9232L0 24L6.21919 22.2693C7.96316 23.2694 9.9844 23.7923 12.0445 23.7923C18.6254 23.7923 23.9944 18.4232 23.9944 11.8424C23.9944 8.63471 22.7564 5.63824 20.5025 3.50378ZM12.0445 21.792C10.2466 21.792 8.5026 21.2691 6.97555 20.3305L6.61857 20.1155L2.86177 21.1385L3.88479 17.4617L3.6698 17.0847C2.64678 15.5001 2.09498 13.7424 2.09498 11.9499C2.09498 6.42319 6.51778 1.9924 12.0445 1.9924C14.7293 1.9924 17.2216 3.02705 19.0509 4.83951C20.8803 6.65196 22.025 9.16494 22.025 11.8424C22.025 17.3691 17.6022 21.792 12.0445 21.792ZM17.4965 14.4347C17.1826 14.2774 15.7143 13.5461 15.4433 13.4461C15.1722 13.3461 14.9727 13.2961 14.7733 13.5961C14.5738 13.896 13.9936 14.5772 13.8156 14.7772C13.6377 14.9772 13.4812 14.9988 13.1673 14.8418C12.8534 14.6851 11.8874 14.3868 10.7493 13.3669C9.85848 12.5631 9.25667 11.5759 9.07872 11.276C8.90077 10.976 9.05173 10.8143 9.19583 10.6609C9.32843 10.5236 9.48069 10.313 9.63166 10.13C9.78262 9.94705 9.82402 9.8113 9.92682 9.61135C10.0296 9.41139 9.98822 9.22885 9.91252 9.07258C9.83681 8.91632 9.24931 7.44671 9.00012 6.8336C8.75964 6.22048 8.51868 6.3122 8.33211 6.3122C8.14555 6.3122 7.93748 6.29054 7.73802 6.29054C7.52994 6.29054 7.21735 6.36624 6.94631 6.6662C6.67527 6.96615 5.90244 7.69747 5.90244 9.16708C5.90244 10.6367 6.96774 12.0563 7.1187 12.2563C7.26966 12.4562 9.23501 15.5176 12.2236 16.7799C15.2122 18.0422 15.2122 17.6346 15.754 17.5914C16.2957 17.5482 17.4965 16.86 17.7457 16.1445C18.0163 15.3999 18.0163 14.7866 17.9406 14.6736C17.865 14.5607 17.6655 14.4991 17.4965 14.4347Z" fill="white"/>
                  </svg>
                  WhatsApp Group
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
