
import { CheckCircle } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-16 bg-cream">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto reveal">
          <h2 className="section-title">About Remote Trybe</h2>
          <p className="section-subtitle">
            Empowering individuals with the skills and support they need to build thriving remote careers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 reveal">
          <div className="card">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              Remote Trybe is a leading online platform empowering individuals to build thriving remote careers.
            </p>
          </div>
          
          <div className="card">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Expertise</h3>
            <p className="text-gray-600">
              Founded by top-rated freelancer Odosa Egharevba, we specialize in training aspirants in high-demand digital fields.
            </p>
          </div>
          
          <div className="card">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Programs</h3>
            <p className="text-gray-600">
              We offer intensive, practical programs in Virtual Assistance, Customer Support, Project Management, and Social Media Management.
            </p>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center reveal">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-3xl font-bold text-primary mb-2">400+</h3>
            <p className="text-gray-600">Trained Professionals</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-3xl font-bold text-primary mb-2">Multiple</h3>
            <p className="text-gray-600">Job Offers</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-3xl font-bold text-primary mb-2">6+</h3>
            <p className="text-gray-600">Specialized Programs</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-3xl font-bold text-primary mb-2">24/7</h3>
            <p className="text-gray-600">Community Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
