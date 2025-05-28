import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle, Link, XCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ThankYou = () => {
  const location = useLocation();
  const [transactionReference, setTransactionReference] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ref = queryParams.get('ref');
    if (ref) {
      setTransactionReference(ref);
    } else {
      setTransactionReference(null); // Explicitly set to null if no ref
    }
  }, [location.search]);

  const whatsappLink = "https://chat.whatsapp.com/KsP9fOrAE8H8DxPYWD6h3Q"; // Provided WhatsApp link

  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {transactionReference ? (
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
                Your enrollment is confirmed.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 w-full">
                <h2 className="text-xl font-semibold text-green-800 mb-3">Join the Community!</h2>
                <p className="text-green-700 mb-4">
                  Click the link below to join the official WhatsApp group for the July Cohort.
                  It's highly recommended to join immediately to get updates and connect with fellow students!
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Join WhatsApp Group
                  <Link className="ml-2" size={20} />
                </a>
              </div>

              <p className="text-md text-gray-500 mt-4">
                You will also receive an email shortly with more details.
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
                If you believe your payment was successful, please contact support with your payment details.
              </p>
              {/* Optionally add a link to a contact page or support email */}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ThankYou; 