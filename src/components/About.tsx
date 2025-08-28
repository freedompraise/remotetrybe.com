// About.tsx
import { CheckCircle, Users, Briefcase, BookOpen, Clock } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-16 bg-cream">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto reveal">
          <h2 className="section-title">About Remote Trybe</h2>
          <h3 className="section-subtitle">
            Led by our{" "}
            <a
              href="/odosa-egharevba"
              className="text-primary font-semibold hover:underline"
            >
              founder
            </a>
            , we help everyday people turn their potential into profitable freelance brands through proven, skill-focused training.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 reveal">
          <div className="card">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To equip individuals with marketable digital skills, a strong freelance presence, and the confidence to earn globally.
            </p>
          </div>

          <div className="card">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Briefcase className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Expertise</h3>
            <p className="text-gray-600">
              From setting up Upwork profiles to mastering client communication and remote workflows—we cover what schools don’t.
            </p>
          </div>

          <div className="card">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <BookOpen className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Programs</h3>
            <p className="text-gray-600">
              Practical and mentor-led. We cover Virtual Assistance, Upwork optimization, content marketing, and client onboarding.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center reveal">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-center mb-4">
              <Users className="text-primary" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-primary mb-2">600+</h3>
            <p className="text-gray-600">Trained Professionals</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-center mb-4">
              <Briefcase className="text-primary" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-primary mb-2">Multiple Job Offers</h3>
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
