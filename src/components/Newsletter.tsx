import { Mail } from "lucide-react";

interface NewsletterProps {
  className?: string;
}

const Newsletter = ({ className = "" }: NewsletterProps) => {
  const handleClick = () => {
    window.open("https://substack.com/", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/80 transition ${className}`}
    >
      <Mail className="h-4 w-4" />
      <span>Subscribe to our Newsletter</span>
    </button>
  );
};

export default Newsletter;
