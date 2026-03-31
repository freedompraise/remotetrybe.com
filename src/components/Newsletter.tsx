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
    <div
      className={`mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm ${className}`}
    >
      <div className="space-y-5 text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
          <Mail className="h-6 w-6 text-primary" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900">
          Join 1,000+ Aspiring VAs Getting Real Remote Opportunities
        </h3>

        <p className="text-gray-600 max-w-md mx-auto">
          Not fluff. Real systems, job strategies, and insights helping people
          break into global remote work and start earning.
        </p>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-gray-700">
        <div className="flex items-start gap-3">
          <Briefcase className="h-5 w-5 text-primary mt-0.5" />
          <p>Curated remote opportunities and client leads</p>
        </div>

        <div className="flex items-start gap-3">
          <Target className="h-5 w-5 text-primary mt-0.5" />
          <p>Step-by-step strategies to land your first client</p>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
          <p>Systems, templates, and workflows used by real VAs</p>
        </div>

        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-primary mt-0.5" />
          <p>Insights from a growing community of 1,000+ members</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://substack.com/@remotetrybe"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-white shadow-md hover:bg-primary/90 transition"
        >
          <Mail className="h-5 w-5" />
          <span>Get Access to the Newsletter</span>
        </a>

        <p className="mt-3 text-xs text-gray-500">
          Join 1,000+ others. No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
