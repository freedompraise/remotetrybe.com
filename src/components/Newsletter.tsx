// Newsletter

import {
  Mail,
  CheckCircle,
  Users,
  Target,
  Briefcase,
} from "lucide-react";

interface NewsletterProps {
  className?: string;
}

const Newsletter = ({ className = "" }: NewsletterProps) => {
  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className={`py-16 bg-cream ${className}`}
    >
      <div className="container mx-auto max-w-3xl">
        <div className="text-center reveal">
          <div className="mx-auto mb-5 inline-flex items-center justify-center rounded-full bg-primary/10 p-2.5">
            <Mail className="h-5 w-5 text-primary" aria-hidden />
          </div>

          <h2 id="newsletter-heading" className="section-title">
            Join 1,000+ Aspiring VAs Getting Real Remote Opportunities
          </h2>

          <p className="section-subtitle mx-auto mb-0">
            Real systems, job strategies, and insights helping people
            break into global remote work and start earning.
          </p>
        </div>

        <div className="mt-10 space-y-3 text-sm text-muted-foreground sm:mx-auto sm:max-w-xl">
          <div className="flex items-start gap-3">
            <Briefcase
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden
            />
            <p className="text-left text-foreground/90">
              Curated remote opportunities and client leads
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Target
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden
            />
            <p className="text-left text-foreground/90">
              Step-by-step strategies to land your first client
            </p>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden
            />
            <p className="text-left text-foreground/90">
              Systems, templates, and workflows used by real VAs
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Users
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden
            />
            <p className="text-left text-foreground/90">
              Insights from a growing community of 1,000+ members
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://substack.com/@remotetrybe"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex w-full max-w-md items-center justify-center gap-2 py-3.5 sm:mx-auto"
          >
            <Mail className="h-5 w-5 shrink-0" aria-hidden />
            <span>Get Access to the Newsletter</span>
          </a>

          <p className="mt-4 text-xs text-muted-foreground">
            Join 1,000+ others. No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
