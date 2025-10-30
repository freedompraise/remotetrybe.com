import { Check, Users, Clock } from "lucide-react";
import { FC } from "react";

// Define types for the props based on their structure in constants/vaMasterclass
interface Skill {
  icon: FC<any>;
  title: string;
  description: string;
}

interface SoftwareTool {
  icon: FC<any>;
  name: string;
}

interface BonusResource {
    icon: FC<any>;
    title: string;
    description: string;
}

interface CourseInfoProps {
  skills: Skill[];
  softwareTools: SoftwareTool[];
  handsOnSkills: string[];
  bonusResources: BonusResource[];
}

const CourseInfo: FC<CourseInfoProps> = ({ skills, softwareTools, handsOnSkills, bonusResources }) => {
  return (
    <>
      {/* Skills Section */}
      <section className="py-16 bg-white" id="skills">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto reveal">
            <h2 className="section-title">Discover the Skills You'll Acquire</h2>
            <p className="section-subtitle">
              Master essential skills that will set you apart in the virtual assistant industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {skills.map((skill, index) => (
              <div key={index} className="card reveal">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <skill.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
                <p className="text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                Join our 1000+ community of VAs for networking, job opportunities, and ongoing mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>
      
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
              <h4 className="section-title">Meet Your Instructor</h4>
              <h1 className="text-2xl font-bold mb-4">Odosa Egharevba</h1>
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
                  href="https://youtube.com/@odosaegharevba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#6FDA44] text-white px-4 py-2 rounded-lg inline-flex items-center hover:bg-opacity-90 transition-colors"
                >
                  YouTube Channel
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Software and Skills Section */}
        <section className="py-16 bg-cream" id="tools">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto reveal">
              <h2 className="section-title">Software You'll Master</h2>
              <p className="section-subtitle">
                Gain proficiency in essential tools used by successful virtual assistants
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
              {softwareTools.map((tool, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm reveal">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tool.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-center">{tool.name}</h3>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <div className="text-center max-w-3xl mx-auto reveal">
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
          </div>
        </section>

        {/* Bonus Resources Section */}
        <section className="py-16 bg-white" id="bonus">
            <div className="container mx-auto">
              <div className="text-center max-w-3xl mx-auto reveal">
                <h2 className="section-title">Bonus Resources Included</h2>
                <p className="section-subtitle">
                  Additional resources to accelerate your success as a virtual assistant
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {bonusResources.map((bonus, index) => (
                  <div key={index} className="card reveal">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <bonus.icon className="text-primary" size={28} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{bonus.title}</h3>
                    <p className="text-gray-600">{bonus.description}</p>
                  </div>
                ))}
              </div>
            </div>
        </section>
    </>
  );
}

export default CourseInfo; 