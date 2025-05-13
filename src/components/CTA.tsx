
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto text-center reveal">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Join our next cohort starting May 30th and start your journey toward a successful remote career.
        </p>
        <Link to="/va-masterclass" className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all inline-flex items-center">
          Enroll Now <ArrowRight className="ml-2" size={18} />
        </Link>
      </div>
    </section>
  );
};

export default CTA;
