import { useEffect } from "react";
import { Linkedin, Youtube, X, Mail, ExternalLink, Award, Users, UserCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

const stats = [
  { icon: Award, value: "Top Rated Plus", label: "Ranking on Upwork", description: "Top 3% of performers" },
  { icon: Users, value: "1,000+", label: "Successful Graduates", description: "Lives transformed" },
  { icon: UserCheck, value: "40K+", label: "LinkedIn Followers", description: "Growing community" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/odosa-egharevba-68634a248",
    icon: Linkedin,
    label: "LinkedIn",
    description: "Connect professionally",
    color: "hover:border-[#0077B5]/40 hover:bg-[#0077B5]/5",
    iconColor: "text-[#0077B5]",
  },
  {
    href: "https://youtube.com/@odosaegharevba",
    icon: Youtube,
    label: "YouTube",
    description: "Watch tutorials & insights",
    color: "hover:border-[#FF0000]/40 hover:bg-[#FF0000]/5",
    iconColor: "text-[#FF0000]",
  },
  {
    href: "https://x.com/odosaabi",
    icon: X,
    label: "X (Twitter)",
    description: "Follow for updates",
    color: "hover:border-foreground/20 hover:bg-foreground/5",
    iconColor: "text-foreground",
  },
];

const OdosaEgharevba = () => {
  useEffect(() => {
    document.title = "Odosa Egharevba - Virtual Assistant Coach & RemoteTrybe Founder";
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-cream overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.03] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.04] translate-y-1/2 -translate-x-1/3" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
              {/* Portrait */}
              <div className="w-full md:w-5/12 flex-shrink-0">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl rotate-2" />
                  <img
                    src="/images/founder.webp"
                    alt="Odosa Egharevba"
                    width={800}
                    height={1000}
                    decoding="async"
                    {...({ fetchpriority: "high" } as Record<string, string>)}
                    className="relative rounded-2xl shadow-xl w-full h-auto aspect-[4/5] object-cover"
                  />
                </div>
              </div>

              {/* Name & Title */}
              <div className="w-full md:w-7/12 text-center md:text-left">
                <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
                  Founder · Educator · Mentor
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                  Odosa Egharevba
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                  Virtual Assistant Coach &amp; RemoteTrybe Founder
                </p>
                <p className="text-lg text-muted-foreground/80 max-w-lg mb-8 leading-relaxed">
                  Bridging the gap between talent and opportunity by equipping the next generation with high-demand virtual assistant and digital skills.
                </p>

                {/* Subtle social icons */}
                <div className="flex justify-center md:justify-start gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={`p-2.5 rounded-full border border-border bg-background/60 backdrop-blur-sm transition-all duration-300 ${link.color}`}
                    >
                      <link.icon size={18} className={link.iconColor} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom curve */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
              <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 55 1440 60V60H0Z" fill="hsl(var(--background))" />
            </svg>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group relative bg-card border border-border rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon size={24} />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground/60">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About / Bio Section */}
        <section className="py-16 md:py-24 bg-cream relative overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full bg-primary/[0.03] translate-x-1/2 -translate-y-1/2" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-border" />
                <h2 className="text-sm font-medium tracking-widest uppercase text-primary">
                  About
                </h2>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
                <p>
                  Odosa Egharevba is a Top-Rated Plus freelancer, educator, and the visionary founder of RemoteTrybe. Based in Lagos, Nigeria, she has carved a prominent niche in the global digital economy as an expert Virtual Assistant and Project Manager. With a professional background rooted in operational efficiency and executive support, Odosa has transitioned from a successful independent career into a dedicated mentor for thousands of aspiring digital professionals.
                </p>
                <p>
                  As the driving force behind RemoteTrybe, Odosa focuses on transforming lives through the "VA Masterclass," a comprehensive training program designed to move individuals from technical curiosity to career readiness. Her expertise spans administrative operations, project management tools like Asana and Trello, and strategic client communication. Today, she is recognized not only for her technical proficiency but also for her commitment to building a sustainable ecosystem where African talent can thrive on the global stage.
                </p>
                <p>
                  Her path was not just about personal success, but about recognizing the vast, untapped potential of individuals who lacked the roadmap to enter the digital space. Motivated by a desire to democratize access to global opportunities, Odosa founded RemoteTrybe with a clear mission: to create a structured, supportive environment where anyone with a laptop and a willing spirit could learn the skills necessary to work for international clients from anywhere in the world.
                </p>
              </div>

              {/* Philosophy quote */}
              <blockquote className="mt-12 border-l-4 border-primary/30 pl-6 py-2">
                <p className="text-lg italic text-muted-foreground leading-relaxed">
                  "The digital economy is the ultimate equalizer, provided one has the right guidance and a commitment to continuous learning. The goal is not just to teach a skill, but to foster the confidence and professional integrity required to build a sustainable, global career from any corner of the globe."
                </p>
                <footer className="mt-3 text-sm font-medium text-foreground">
                  — Odosa Egharevba
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Client Testimonials
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  What clients and partners have to say about working with Odosa.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 5].map((num) => (
                  <div
                    key={num}
                    className="group bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/15"
                  >
                    <img
                      src={`/images/testimonial-${num}.jpeg`}
                      alt={`Client Testimonial ${num}`}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* External Links Section */}
        <section className="py-16 md:py-20 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Connect with Odosa
                </h2>
                <p className="text-muted-foreground">
                  Follow along for insights on remote work, productivity, and digital careers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-4 p-5 bg-card border border-border rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${link.color}`}
                  >
                    <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-primary/5 ${link.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      <link.icon size={22} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-foreground text-sm">{link.label}</div>
                      <div className="text-xs text-muted-foreground">{link.description}</div>
                    </div>
                    <ExternalLink size={14} className="ml-auto flex-shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Contact Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-muted-foreground mb-4 text-sm">
                For speaking engagements, media inquiries, or collaboration opportunities
              </p>
              <a
                href="mailto:odosa@remotetrybe.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors border-b border-primary/20 hover:border-primary/40 pb-0.5"
              >
                <Mail size={16} />
                odosa@remotetrybe.com
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
            name: "Odosa Egharevba",
            jobTitle: ["Virtual Assistant Coach", "RemoteTrybe Founder"],
            description:
              "Founder of RemoteTrybe, top-rated Upwork freelancer, and virtual assistant coach with 1000+ successful graduates.",
            url: "https://remotetrybe.com/founder",
            sameAs: [
              "https://www.linkedin.com/in/odosa-egharevba-68634a248",
              "https://youtube.com/@odosaegharevba",
              "https://x.com/odosaabi",
            ],
            alumniOf: {
              "@type": "Organization",
              name: "RemoteTrybe",
              foundingDate: "2022",
              founders: [{ "@type": "Person", name: "Odosa Egharevba" }],
            },
          }),
        }}
      />
    </>
  );
};

export default OdosaEgharevba;
