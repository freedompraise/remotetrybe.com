import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import VideoPlayer from "../VideoPlayer";

interface VAHeroProps {
  onEnrollClick: () => void;
}

const VAHero = ({ onEnrollClick }: VAHeroProps) => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-cream" id="hero">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
              Virtual Assistant Masterclass
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Launch your VA career and earn in dollars in 6 weeks. Join over 400 successful graduates.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <Calendar className="text-primary mr-2" size={20} />
                <span className="text-gray-700">Starts July 28th</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-primary mr-2" size={20} />
                <span className="text-gray-700">Fri-Sun, 4-6:30 PM WAT</span>
              </div>
              <div className="flex items-center">
                <Users className="text-primary mr-2" size={20} />
                <span className="text-gray-700">Limited Spots</span>
              </div>
            </div>
            <a href="#pricing" className="btn-primary" onClick={onEnrollClick}>
              Enroll Now <ArrowRight className="ml-2" size={18} />
            </a>
          </div>
          
          <VideoPlayer
            src="https://youtu.be/smGt67w3PyM"
            title="Course Overview"
            className="animate-fade-in"
            lazy={true}
          />
        </div>
      </div>
    </section>
  );
};

export default VAHero;
