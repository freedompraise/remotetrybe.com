// PaymentModal.tsx

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import { getOpenCohorts } from "../utils/cohorts";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  cohortId?: string;
  referralCode?: string | null;
}

const PaymentModal = ({ isOpen, onClose, amount, cohortId, referralCode }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isForeign, setIsForeign] = useState(false);
  const [selarRedirected, setSelarRedirected] = useState(false);
  const { toast } = useToast();

  const baseAmount = amount;

  const handleSubmit = () => {
    setIsProcessing(true);

    if (isForeign) {
      const queryParams = new URLSearchParams({
        ...(referralCode ? { referral: referralCode } : {}),
        ...(cohortId ? { cohortId } : {}),
      });
      window.open(`https://selar.com/remotetrybe?${queryParams}`, "_blank");
      return;
    }

    const openCohorts = getOpenCohorts();
    const cohort = openCohorts.find(c => c.id === cohortId);
    if (!cohort || !cohort.paystackProductUrl) {
      setIsProcessing(false);
      toast({
        title: "Payment error",
        description: "Could not find payment link for this cohort. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    const url = new URL(cohort.paystackProductUrl);
    if (referralCode) url.searchParams.set("ref", referralCode);
    if (cohortId) url.searchParams.set("cohortId", cohortId);

    window.location.href = url.toString();
  };

  useEffect(() => {
    if (isForeign && !selarRedirected) {
      setSelarRedirected(true);
    }
    if (!isForeign) {
      setSelarRedirected(false);
    }
  }, [isForeign, selarRedirected]);

  if (!isOpen) return null;

  const openCohorts = getOpenCohorts().filter(c => {
    const regEnd = new Date(c.registrationEnd);
    regEnd.setHours(23, 59, 59, 999);
    return regEnd >= new Date();
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl relative max-h-[90vh] flex flex-col">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="p-6 overflow-y-auto flex-1">
          <h2 className="text-2xl font-bold mb-4">Enroll in VA Masterclass</h2>

          {openCohorts.length === 0 ? (
            <p className="text-red-600 mb-6 font-semibold">
              Registration closed. Please check back for future cohorts.
            </p>
          ) : (
            <div className="mb-6">
              <p className="text-gray-700 font-medium mb-2">Registration open for:</p>
              <ul className="mb-2">
                {openCohorts.map(c => (
                  <li key={c.id} className="text-gray-800 text-sm">
                    <span className="font-semibold">{c.name}</span> (ends {c.registrationEnd})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
            <ul className="text-yellow-700 text-sm space-y-2 list-disc list-inside">
              <li>
                You will get your WhatsApp group link and course materials via email after payment.
              </li>
              <li className="font-semibold text-red-700">
                Use your Gmail address only. You’ll be added to a Google Workspace account with it.
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paying from outside Nigeria?
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setIsForeign(false)}
                className={`px-3 py-2 rounded-lg border ${
                  !isForeign ? "bg-primary text-white" : "bg-white text-gray-800"
                }`}
                disabled={isProcessing}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setIsForeign(true)}
                className={`px-3 py-2 rounded-lg border ${
                  isForeign ? "bg-primary text-white" : "bg-white text-gray-800"
                }`}
                disabled={isProcessing}
              >
                Yes
              </button>
            </div>
            {isForeign && (
              <p className="text-xs text-yellow-700 mt-2">
                International payment opens in a new tab. Complete on Selar.
              </p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              disabled={isProcessing}
            >
              {isForeign
                ? "Redirecting to International Payment..."
                : isProcessing
                ? "Processing..."
                : `Pay ₦${(baseAmount / 100).toLocaleString()}`}
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">
              {isForeign ? "Powered by Selar" : "Secured by Paystack"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
