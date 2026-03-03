// Newsletter

import { Mail } from "lucide-react";

interface NewsletterProps {
  className?: string;
}

const Newsletter = ({ className = "" }: NewsletterProps) => {
  return (
    <div className={`mx-auto max-w-md text-center space-y-4 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900">
        Subscribe to our Newsletter
      </h3>
      <p className="text-sm text-gray-600">
        Practical tips & insights, straight to your inbox.
      </p>
      <a
        href="https://substack.com/@remotetrybe"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition"
      >
        <Mail className="h-5 w-5" />
        <span>Join the RemoteTrybe Newsletter</span>
      </a>
    </div>
  );
};

export default Newsletter;