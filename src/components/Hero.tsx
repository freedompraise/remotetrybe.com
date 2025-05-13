
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";

const Hero = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
              Your breakthrough starts here. Build skills that secure high-paying clients.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Join our Virtual Assistant Masterclass and start earning in dollars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/va-masterclass" className="btn-primary">
                Register for May Cohort <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link to="/#programs" className="btn-secondary">
                Explore Programs
              </Link>
            </div>
          </div>
          
          <VideoPlayer 
            src="https://drive.google.com/file/d/1JOUbOmyEDD9hfwrOPeOxwY-moxORbjml" 
            title="Gift's Success Story" 
            className="animate-fade-in" 
            lazy={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
