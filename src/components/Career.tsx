
import { ArrowRight } from "lucide-react";

const Career = () => {
  return (
    <section id="career" className="py-16">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto reveal">
          <h2 className="section-title">Volunteer Opportunities</h2>
          <p className="section-subtitle">
            Join our team and help shape the future of remote work while building valuable skills and experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 reveal">
          <div className="card hover:border hover:border-primary transition-all">
            <h3 className="text-2xl font-bold mb-4">Video Editors</h3>
            <p className="text-gray-600 mb-6">
              Help us create engaging educational content by editing course videos, testimonials, and promotional materials.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                <span className="text-gray-700">Experience with video editing software</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                <span className="text-gray-700">Creative storytelling ability</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                <span className="text-gray-700">Attention to detail</span>
              </li>
            </ul>
            <a 
              href="https://forms.gle/F9THLWYCPTXdg81Z8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Join Our Video Editor Team <ArrowRight className="ml-2" size={18} />
            </a>
          </div>
          
          <div className="card hover:border hover:border-primary transition-all">
            <h3 className="text-2xl font-bold mb-4">Graphics Designer</h3>
            <p className="text-gray-600 mb-6">
              Create visually compelling materials for our courses, social media, and marketing campaigns.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                <span className="text-gray-700">Proficiency in design tools (Canva, Adobe)</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                <span className="text-gray-700">Strong visual communication skills</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                <span className="text-gray-700">Understanding of brand identity</span>
              </li>
            </ul>
            <a 
              href="https://forms.gle/F9THLWYCPTXdg81Z8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Join Our Graphics Team <ArrowRight className="ml-2" size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
