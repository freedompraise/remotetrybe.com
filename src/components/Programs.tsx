
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
            <h4 className="text-xl font-semibold mb-4">Upwork Profile Optimization</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Keyword-rich title and overview</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Targeted niche positioning</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600">Skills + portfolio alignment</span>
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
