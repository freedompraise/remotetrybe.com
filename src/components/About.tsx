import { CheckCircle, Users, Briefcase, BookOpen, Clock } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-16 bg-cream">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto reveal">
          <h2 className="section-title">About Remote Trybe</h2>
          <h3 className="section-subtitle">
            Founded by <a 
              href="https://ng.linkedin.com/in/odosa-egharevba-68634a248/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary font-semibold"
            >
              Odosa Egharevba
            </a>, we empower individuals with high-income remote skills through our proven Virtual Assistant Masterclass.
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 reveal">
          <div className="card">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To transform 10,000 Africans into dollar-earning virtual assistants through Odosa Egharevba's proven VA training system.
            </p>
          </div>
          
          <div className="card">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Briefcase className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Expertise</h3>
            <p className="text-gray-600">
              Specializing in high-demand digital skills with a focus on Virtual Assistance, Upwork success, and remote career building.
            </p>
          </div>
          
          <div className="card">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <BookOpen className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Programs</h3>
            <p className="text-gray-600">
              Practical training in Virtual Assistance, Upwork Optimization, Social Media Management, and more - taught by Odosa Egharevba.
            </p>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center reveal">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-center mb-4">
              <Users className="text-primary" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-primary mb-2">400+</h3>
            <p className="text-gray-600">Trained Professionals</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-center mb-4">
              <Briefcase className="text-primary" size={32} />
            </div>
            <h3 className="ttext-3xl font-bold text-primary mb-2">Multiple Job Offers</h3>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-center mb-4">
              <BookOpen className="text-primary" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-primary mb-2">6+</h3>
            <p className="text-gray-600">Specialized Programs</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-center mb-4">
              <Clock className="text-primary" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-primary mb-2">24/7</h3>
            <p className="text-gray-600">Community Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;