import VideoPlayer from "../VideoPlayer";

interface TestimonialVideo {
  id: number;
  title: string;
  src: string;
}

interface VATestimonialsProps {
  testimonialVideos: TestimonialVideo[];
}

const VATestimonials = ({ testimonialVideos }: VATestimonialsProps) => {
  return (
    <section className="py-16" id="testimonials">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto reveal">
          <h2 className="section-title">Student Success Stories</h2>
          <p className="section-subtitle">
            Hear from graduates who have transformed their careers through our Virtual Assistant Masterclass.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {testimonialVideos.map(video => (
            <div key={video.id} className="card reveal">
              <VideoPlayer
                src={video.src}
                title={video.title}
              />
              <h3 className="font-bold mt-4">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VATestimonials;
