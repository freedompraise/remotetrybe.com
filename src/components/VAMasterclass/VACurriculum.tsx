import { Check } from "lucide-react";

interface Module {
  title: string;
  description: string;
  points: string[];
}

interface VACurriculumProps {
  modules: Module[];
}

const VACurriculum = ({ modules }: VACurriculumProps) => {
  return (
    <section className="py-16 bg-cream" id="curriculum">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto reveal">
          <h2 className="section-title">Curriculum & Learning Outcomes</h2>
          <p className="section-subtitle">
            Our structured program takes you from foundations to advanced skills with practical applications at every step.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {modules.map((module, index) => (
            <div key={index} className="card reveal">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                Module {index + 1}
              </span>
              <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
              <p className="text-gray-600 mb-6">{module.description}</p>
              <ul className="space-y-4">
                {module.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white p-8 rounded-2xl shadow-md reveal">
          <h3 className="text-2xl font-bold mb-4">Course Activities & Time Commitment</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
              <div>
                <span className="font-medium">Live Classes:</span>
                <span className="text-gray-700"> Fridays to Sundays, 4-7 PM (9 hours weekly)</span>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
              <div>
                <span className="font-medium">Weekly Assignments:</span>
                <span className="text-gray-700"> Practical tasks with graded instructor feedback</span>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
              <div>
                <span className="font-medium">Final Project:</span>
                <span className="text-gray-700"> Creation of two professional portfolios as graduation requirement</span>
              </div>
            </li>
      
            <li className="flex items-start">
              <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
              <div>
                <span className="font-medium">Total Program:</span>
                <span className="text-gray-700"> 6 weeks intensive training + lifetime community access</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VACurriculum;
