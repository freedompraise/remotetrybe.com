import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle, Link, XCircle, Copy } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCohortById, Cohort } from "../utils/cohorts";
import { useToast } from "../components/ui/use-toast";

const ThankYou = () => {
  const location = useLocation();
  const [transactionReference, setTransactionReference] = useState<string | null>(null);
  const [cohort, setCohort] = useState<Cohort | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const supportWhatsappLink = "https://wa.me/2349060038374";
  const { toast } = useToast();

  const handleCopyWhatsappLink = () => {
    if (cohort?.whatsappLink) {
      navigator.clipboard.writeText(cohort.whatsappLink);
      toast({
        title: 'Copied!',
        description: 'WhatsApp group link copied to clipboard!',
      });
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ref = queryParams.get('ref');
    const cohortId = queryParams.get('cohortId');

    if (ref) {
      setTransactionReference(ref);
      if (cohortId) {
        const foundCohort = getCohortById(cohortId);
        setCohort(foundCohort);
      }
    } else {
      setTransactionReference(null); // Explicitly set to null if no ref
      setCohort(undefined); // Also reset cohort if no ref
    }
    setIsLoading(false);
  }, [location.search]);

  // Helper to format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {transactionReference && cohort ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="text-green-500 w-16 h-16 mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Payment Successful!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for enrolling in the Virtual Assistant Masterclass.
                Your transaction reference is: <strong>{transactionReference}</strong>.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Your enrollment in <strong>{cohort.name}</strong> is confirmed.
                Your training starts on <strong>{formatDate(cohort.trainingStart)}</strong>.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 w-full">
                <h2 className="text-xl font-semibold text-green-800 mb-3">Join the Community!</h2>
                <p className="text-green-700 mb-4">
                  Click the link below to join the official WhatsApp group for your cohort.
                  It's highly recommended to join immediately to get updates and connect with fellow students!
                </p>
                <a
                  href={cohort.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Join {cohort.name} WhatsApp Group

                  <Link className="ml-2" size={20} />
                </a>

                {/* Troubleshooting note for WhatsApp link */}
                <div className="mt-4 text-left">
                  <p className="text-sm">
                    <strong>Having trouble joining?</strong> If the button above doesn't work, copy and paste this link into your browser or WhatsApp app:
                  </p>
                  <div className="mt-1 p-2 bg-green-100 rounded break-all flex items-center text-green-800 text-sm">
                    <span className="flex-1 select-all">{cohort.whatsappLink}</span>
                    <button
                      onClick={handleCopyWhatsappLink}
                      className="ml-2 p-1 hover:bg-green-200 rounded transition-colors"
                      title="Copy link to clipboard"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-md text-gray-500 mt-4">
                You will also receive an email shortly with more details.
                If you have any questions, feel free to contact support via WhatsApp:
                <a 
                  href={supportWhatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-600 hover:underline ml-1"
                >
                  {supportWhatsappLink.replace('https://wa.me/', '')}
                </a>
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <XCircle className="text-red-500 w-16 h-16 mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Payment Status Unknown
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We could not confirm your payment status.
                If you believe your payment was successful or have any questions, please contact support via WhatsApp:
              </p>
              <a 
                href={supportWhatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path fillRule="evenodd" clipRule="evenodd" d="M20.5025 3.50378C18.2486 1.24993 15.2522 0 12.0445 0C5.46358 0 0.0945549 5.36903 0.0945549 11.9499C0.0945549 14.0577 0.668112 16.1154 1.76317 17.9232L0 24L6.21919 22.2693C7.96316 23.2694 9.9844 23.7923 12.0445 23.7923C18.6254 23.7923 23.9944 18.4232 23.9944 11.8424C23.9944 8.63471 22.7564 5.63824 20.5025 3.50378ZM12.0445 21.792C10.2466 21.792 8.5026 21.2691 6.97555 20.3305L6.61857 20.1155L2.86177 21.1385L3.88479 17.4617L3.6698 17.0847C2.64678 15.5001 2.09498 13.7424 2.09498 11.9499C2.09498 6.42319 6.51778 1.9924 12.0445 1.9924C14.7293 1.9924 17.2216 3.02705 19.0509 4.83951C20.8803 6.65196 22.025 9.16494 22.025 11.8424C22.025 17.3691 17.6022 21.792 12.0445 21.792ZM17.4965 14.4347C17.1826 14.2774 15.7143 13.5461 15.4433 13.4461C15.1722 13.3461 14.9727 13.2961 14.7733 13.5961C14.5738 13.896 13.9936 14.5772 13.8156 14.7772C13.6377 14.9772 13.4812 14.9988 13.1673 14.8418C12.8534 14.6851 11.8874 14.3868 10.7493 13.3669C9.85848 12.5631 9.25667 11.5759 9.07872 11.276C8.90077 10.976 9.05173 10.8143 9.19583 10.6609C9.32843 10.5236 9.48069 10.313 9.63166 10.13C9.78262 9.94705 9.82402 9.8113 9.92682 9.61135C10.0296 9.41139 9.98822 9.22885 9.91252 9.07258C9.83681 8.91632 9.24931 7.44671 9.00012 6.8336C8.75964 6.22048 8.51868 6.3122 8.33211 6.3122C8.14555 6.3122 7.93748 6.29054 7.73802 6.29054C7.52994 6.29054 7.21735 6.36624 6.94631 6.6662C6.67527 6.96615 5.90244 7.69747 5.90244 9.16708C5.90244 10.6367 6.96774 12.0563 7.1187 12.2563C7.26966 12.4562 9.23501 15.5176 12.2236 16.7799C15.
              2122 18.0422 15.2122 17.6346 15.754 17.5914C16.2957 17.5482 17.4965 16.86 17.7457 16.1445C18.0163 15.3999 18.0163 14.7866 17.9406 14.6736C17.865 14.5607 17.6655 14.4991 17.4965 14.4347Z" fill="white"/>
                </svg>
                Contact Support
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ThankYou; 