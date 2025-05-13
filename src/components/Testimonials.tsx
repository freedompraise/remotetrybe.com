
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonialData = [
  {
    id: 1,
    name: "Folarin Simon",
    role: "High Achieving Executive Assistant",
    image: "/lovable-uploads/3660db86-d964-44f2-b291-d46d604356b0.png",
    quote: "My VA journey hasn't been one without challenges, even after being coached by the best. You still have to put in the extra work, hone your skill, become better and remain consistent - This I have learnt first hand in the past few weeks."
  },
  {
    id: 2,
    name: "Ijeoma Ezenwa",
    role: "Virtual Assistant for CEOs and Startup Founders",
    image: "/lovable-uploads/2426120c-5f9e-4e15-986b-68cce0ca9293.png",
    quote: "Remote Trybe Academy will melt, remold, and humble you. No jokes! But trust me, the growth is worth it. I'm so proud of this new version of me."
  },
  {
    id: 3,
    name: "Miriam Okpalaeke",
    role: "Administrative Virtual Assistant",
    image: "/lovable-uploads/a588deb7-10f0-44b8-9a94-5607a4dfeb1d.png",
    quote: "One of the best decisions I've made this year and I'm so proud of myself for taking these small but meaningful steps. It's amazing how little changes can lead to big growth!"
  },
  {
    id: 4,
    name: "Blessing Anebi",
    role: "Professional Customer Service Officer",
    image: "/lovable-uploads/3539bd27-aa51-4840-812a-3d6217305a68.png",
    quote: "I believe in proactive growth, so every year I commit to upskilling! This year, I'm upskilling as a Virtual Assistant with Remote Trybe under the expert guidance of Odosa Egharevba."
  },
  {
    id: 5,
    name: "Chioma Ile",
    role: "Executive Assistant at Corban Medicals",
    image: "/lovable-uploads/9cd24fcf-d528-429b-bee5-a441a26d4cf3.png",
    quote: "Investing in Skills, Elevating My Career! At the beginning of every year, I make a conscious decision to invest in my skills—because growth is intentional!"
  },
  {
    id: 6,
    name: "Taiwo Oluwagbemi",
    role: "Virtual Assistant & Project Manager Associate",
    image: "/lovable-uploads/23deb4a8-c641-47ca-943d-33b77c9d0f58.png",
    quote: "Today I want to express my deepest gratitude to my amazing coach Odosa Egharevba for her game-changing advice: 'Create a portfolio that showcases your best work.'"
  },
  {
    id: 7,
    name: "Joy Chukwudebelu",
    role: "Virtual Assistant & Travel Consultant",
    image: "/lovable-uploads/089254ba-edc8-4e34-b471-f1d9a6311228.png",
    quote: "I've officially started my 30-day visibility challenge as part of the task assigned to us as Remote Trybe first cohort student. This challenge was assigned to us by our incredible coach, Odosa Egharevba."
  },
  {
    id: 8,
    name: "Blessing Umanah",
    role: "Virtual Assistant Executive at Digital Marketing Hub",
    image: "/lovable-uploads/1f0d58eb-b7f0-4437-b9a0-02868b37fe52.png",
    quote: "We are officially stepping into week 4 in Remote Trybe. Odosa Egharevba has been guiding and drilling us intensively, and I must say, it's truly worth it."
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === Math.ceil(testimonialData.length / 2) - 1 ? 0 : prev + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.ceil(testimonialData.length / 2) - 1 : prev - 1
    );
  };

  return (
    <section id="testimonials" className="py-16 bg-cream">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto reveal">
          <h2 className="section-title">Success Stories</h2>
          <p className="section-subtitle">
            Hear from our community of graduates who have transformed their careers through our training programs.
          </p>
        </div>
        
        <div className="relative mt-12 reveal">
          <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4">
            <button 
              onClick={prevSlide}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={24} className="text-primary" />
            </button>
            <button 
              onClick={nextSlide}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight size={24} className="text-primary" />
            </button>
          </div>
          
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-6" 
                 style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.5s ease' }}>
              {testimonialData.map((testimonial) => (
                <div key={testimonial.id} className="card">
                  <div className="flex items-start space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <div className="flex mt-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-4">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile view: show one testimonial at a time */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-6">
              {testimonialData.map((testimonial) => (
                <div key={testimonial.id} className="card min-w-[85%] snap-center">
                  <div className="flex items-start space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <div className="flex mt-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-4">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 md:hidden">
            <button 
              onClick={prevSlide}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors mx-2"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={24} className="text-primary" />
            </button>
            <button 
              onClick={nextSlide}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors mx-2"
              aria-label="Next testimonials"
            >
              <ChevronRight size={24} className="text-primary" />
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {[...Array(Math.ceil(testimonialData.length / 2))].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
