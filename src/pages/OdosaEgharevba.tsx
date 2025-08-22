import { useEffect } from "react";
import { Linkedin, Youtube, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

const OdosaEgharevba = () => {
  useEffect(() => {
    document.title = "Odosa Egharevba - Virtual Assistant Coach & RemoteTrybe Founder";
  }, []);
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <img
                  src="/lovable-uploads/odosa_1.png"
                  alt="Odosa Egharevba"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Odosa Egharevba
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-6">
                  Virtual Assistant Coach & RemoteTrybe Founder
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  Empowering African youth with virtual assistant skills, transforming lives through digital opportunities.
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                  <a
                    href="https://www.linkedin.com/in/odosa-egharevba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0077B5] text-white p-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href="https://youtube.com/@odosaegharevba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FF0000] text-white p-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Youtube size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Journey */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Professional Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-lg bg-gray-50">
                  <div className="text-3xl font-bold text-primary mb-2">$30K+</div>
                  <div className="text-gray-600">Earnings on Upwork</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-gray-50">
                  <div className="text-3xl font-bold text-primary mb-2">600+</div>
                  <div className="text-gray-600">Successful Graduates</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-gray-50">
                  <div className="text-3xl font-bold text-primary mb-2">40K+</div>
                  <div className="text-gray-600">LinkedIn Followers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact & Philosophy */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Teaching Philosophy</h2>
              <div className="prose prose-lg mx-auto">
                <p>
                  As a Top-Rated Plus freelancer on Upwork and founder of RemoteTrybe, 
                  I've dedicated myself to empowering African youth with the skills needed 
                  to thrive in the digital economy. My teaching methodology focuses on 
                  practical, hands-on experience combined with mentorship that extends 
                  beyond the classroom.
                </p>
                <p>
                  Through RemoteTrybe's VA Masterclass, I've helped over 600 individuals 
                  transform their lives by mastering virtual assistant skills and building 
                  successful freelance careers. Our comprehensive curriculum covers everything 
                  from technical skills to client communication and business development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Client Testimonials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 5].map((num) => (
                  <div key={num} className="bg-gray-50 rounded-xl overflow-hidden">
                    <img
                      src={`/images/testimonial-${num}.jpeg`}
                      alt={`Client Testimonial ${num}`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                For speaking engagements, media inquiries, or collaboration opportunities
              </p>
              <a
                href="mailto:odosa.assistant@gmail.com"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <MessageCircle size={20} />
                Contact Me
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />

      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Odosa Egharevba",
            "jobTitle": ["Virtual Assistant Coach", "RemoteTrybe Founder"],
            "description": "Founder of RemoteTrybe, top-rated Upwork freelancer, and virtual assistant coach with 600+ successful graduates.",
            "url": "https://remotetrybe.com/founder",
            "sameAs": [
              "https://www.linkedin.com/in/odosa-egharevba",
              "https://youtube.com/@odosaegharevba"
            ],
            "alumniOf": {
              "@type": "Organization",
              "name": "RemoteTrybe",
              "foundingDate": "2022",
              "founders": [{
                "@type": "Person",
                "name": "Odosa Egharevba"
              }]
            }
          })
        }}
      />
    </>
  );
};

export default OdosaEgharevba;
