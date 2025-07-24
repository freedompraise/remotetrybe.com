// PaymentModal.tsx

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import { getOpenCohorts } from "../utils/cohorts";
import { Link } from "react-router-dom";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  cohortId?: string;
  referralCode?: string | null;
}

const PaymentModal = ({ isOpen, onClose, amount, cohortId, referralCode }: PaymentModalProps) => {
  const [isForeign, setIsForeign] = useState(false);
  const { toast } = useToast();

  const openCohorts = getOpenCohorts().filter(c => {
    const regEnd = new Date(c.registrationEnd);
    regEnd.setHours(23, 59, 59, 999);
    return regEnd >= new Date();
  });

  if (!isOpen) return null;

  const baseAmount = amount;
  const selectedCohort = openCohorts.find(c => c.id === cohortId);

  let paymentLink: string | null = null;

  if (isForeign) {
    const params = new URLSearchParams();
    if (referralCode) params.set("referral", referralCode);
    if (cohortId) params.set("cohortId", cohortId);
    paymentLink = `https://selar.com/remotetrybe?${params.toString()}`;
  } else if (selectedCohort?.paystackProductUrl) {
    const url = new URL(selectedCohort.paystackProductUrl);
    if (referralCode) url.searchParams.set("ref", referralCode);
    if (cohortId) url.searchParams.set("cohortId", cohortId);
    paymentLink = url.toString();
  }

  const isPaymentReady = !!paymentLink;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl relative max-h-[90vh] flex flex-col">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
          onClick={onClose}
        >
          <X size={40} />
        </button>

        <div className="p-6 overflow-y-auto flex-1">
          <h2 className="text-2xl font-bold mb-4">Enroll in VA Masterclass</h2>

          {openCohorts.length === 0 ? (
            <p className="text-red-600 mb-6 font-semibold">
              Registration closed. Please check back for future cohorts.
            </p>
          ) : (
            <div className="mb-6">
              <p className="text-gray-700 font-medium mb-2">Available Cohorts:</p>
              <ul className="mb-2 space-y-1">
                {openCohorts.map(c => {
                  const date = new Date(c.registrationEnd);
                  const formattedDate = date.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  });
                  return (
                    <li key={c.id} className="text-gray-800 text-sm">
                      - {c.name} registration deadline: {formattedDate}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
            <p className="text-sm text-yellow-700">
              After payment, you'll receive a form to fill out. Once completed, you'll get access to the classroom link via email. Please use a Gmail account as your email.
            </p>
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
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setIsForeign(true)}
                className={`px-3 py-2 rounded-lg border ${
                  isForeign ? "bg-primary text-white" : "bg-white text-gray-800"
                }`}
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
            {isPaymentReady ? (
              <Link
                to={paymentLink}
                target={isForeign ? "_blank" : "_self"}
                className="w-full block bg-primary text-white text-center py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {isForeign
                  ? "Pay on Selar"
                  : `Pay ₦${(baseAmount / 100).toLocaleString()}`}
              </Link>
            ) : (
              <button
                type="button"
                className="w-full bg-gray-400 text-white py-3 rounded-lg font-medium cursor-not-allowed"
                disabled
              >
                Payment link unavailable
              </button>
            )}
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
