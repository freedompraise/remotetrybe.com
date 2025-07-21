// PaymentModal.tsx

import { useState, useEffect } from "react";
import { getOpenCohorts } from "../utils/cohorts";
import { useToast } from "../components/ui/use-toast";
import { X } from "lucide-react";
import { usePaystackPayment } from "react-paystack";
import { tallyAffiliateReferral } from '../lib/supabaseAdmin';
import { useNavigate } from "react-router-dom";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  cohortId?: string;
  referralCode?: string | null;
}

interface PaymentData {
  email: string;
  name: string;
  phone: string;
}

const PaymentModal = ({ isOpen, onClose, amount, cohortId, referralCode }: PaymentModalProps) => {
  const [formData, setFormData] = useState<PaymentData>({
    email: "",
    name: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [isForeign, setIsForeign] = useState(false);
  const [selarRedirected, setSelarRedirected] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  // Coupon logic
  const now = new Date();
  const couponStart = new Date(now.getFullYear(), now.getMonth(), 21, 0, 1, 0, 0); // 21st, 00:01
  const couponEnd = new Date(now.getFullYear(), now.getMonth() + 1, 4, 23, 59, 59, 999); // 4th of next month, 23:59
  const isCouponValid = coupon.trim().toUpperCase() === "EARLYREG" && now >= couponStart && now <= couponEnd;
  const baseAmount = amount;
  const discountedAmount = isCouponValid ? Math.round(baseAmount * 0.85) : baseAmount;

  useEffect(() => {
    setDiscount(isCouponValid ? Math.round(baseAmount * 0.15) : 0);
  }, [coupon, amount, isCouponValid, baseAmount]);

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: discountedAmount,
    publicKey,
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: formData.name,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: formData.phone,
        },
        ...(cohortId ? [{
          display_name: "Cohort ID",
          variable_name: "cohort_id",
          value: cohortId,
        }] : []),
        ...(referralCode ? [{
          display_name: "Referral Code",
          variable_name: "referral_code",
          value: referralCode,
        }] : []),
        ...(isCouponValid ? [{
          display_name: "Coupon Code",
          variable_name: "coupon_code",
          value: coupon.trim().toUpperCase(),
        }] : []),
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.name || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email) || !formData.email.includes("gmail.com")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid Gmail address",
        variant: "destructive",
      });
      return;
    }

    if (isForeign) {
      // Already handled by effect below
      return;
    }

    setIsProcessing(true);

    initializePayment({
      onSuccess: async (response: any) => {
        setIsProcessing(false);
        let tallyFailed = false;
        if (referralCode) {
          try {
            await tallyAffiliateReferral({ referralCode, newUserName: formData.name });
          } catch (err) {
            tallyFailed = true;
            toast({
              title: "Affiliate Notification Failed",
              description: "We could not notify your affiliate. Please contact support if this was unexpected.",
              variant: "destructive",
            });
          }
        }
        onClose(); // Close the modal before navigating
        const redirectUrl = `/thank-you?ref=${response.reference}${cohortId ? `&cohortId=${cohortId}` : ''}${tallyFailed ? '&tally=fail' : ''}`;
        navigate(redirectUrl);
      },
      onClose: () => {
        setIsProcessing(false);
        toast({
          title: "Payment cancelled",
          description: "You can try again when you're ready",
          variant: "destructive",
        });
      },
    });
  };

  // Effect: If isForeign is selected, open Selar and disable form
  useEffect(() => {
    if (isForeign && !selarRedirected) {
      const queryParams = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        ...(referralCode && typeof referralCode === 'string' && referralCode.trim() ? { referral: referralCode } : {}),
        ...(cohortId ? { cohortId } : {}),
      });
      setSelarRedirected(true);
      window.open(`https://selar.com/remotetrybe?${queryParams.toString()}`, "_blank");
    }
    if (!isForeign) {
      setSelarRedirected(false);
    }
  }, [isForeign, formData, referralCode, cohortId, selarRedirected]);

  if (!isOpen) return null;

  // Show open cohorts and their registration end dates (filter again for safety)
  const openCohorts = getOpenCohorts().filter(cohort => {
    const regEnd = new Date(cohort.registrationEnd);
    regEnd.setHours(23, 59, 59, 999);
    const now = new Date();
    return regEnd >= now;
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
            <p className="text-red-600 mb-6 font-semibold">Registration closed. Please check back for future cohorts.</p>
          ) : (
            <div className="mb-6">
              <p className="text-gray-700 font-medium mb-2">Registration is open for:</p>
              <ul className="mb-2">
                {openCohorts.map(cohort => (
                  <li key={cohort.id} className="text-gray-800 text-sm">
                    <span className="font-semibold">{cohort.name}</span> (closes {cohort.registrationEnd})
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gmail Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="your.email@gmail.com"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                We only accept Gmail addresses for course materials
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Your WhatsApp number"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                You'll be added to our WhatsApp group with this number
              </p>
            </div>

            {referralCode && typeof referralCode === 'string' && referralCode.trim() && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Referral Code
                </label>
                <input
                  type="text"
                  value={referralCode}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">
                  You were referred by one of our affiliates
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coupon Code (optional)
              </label>
              <input
                type="text"
                name="coupon"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter coupon code"
                autoComplete="off"
                disabled={isForeign}
              />
              {coupon && (
                <p
                  className={`text-xs mt-1 break-words overflow-x-auto max-w-full ${isCouponValid ? 'text-green-600' : 'text-red-600'}`}
                  style={{ wordBreak: 'break-word' }}
                >
                  {isCouponValid ? `Coupon applied! You get 15% off.` : 'Invalid or expired coupon.'}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are you paying from outside Nigeria?
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
                <p className="text-xs text-yellow-700 mt-2">International payment will open in a new tab. Please complete your payment on Selar.</p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors overflow-x-auto break-words"
                style={{ wordBreak: 'break-word' }}
                disabled={isProcessing || isForeign}
              >
                {isForeign ? "Redirecting to International Payment..." : isProcessing ? "Processing..." : `Pay ₦${(discountedAmount / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              </button>
              <p className="text-xs text-center text-gray-500 mt-2 break-words overflow-x-auto max-w-full" style={{ wordBreak: 'break-word' }}>
                {isForeign ? "Secure international checkout via Selar" : "Payment secured by Paystack"}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
