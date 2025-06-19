// PaymentModal.tsx

import { useState } from "react";
import { useToast } from "../components/ui/use-toast";
import { X } from "lucide-react";
import { usePaystackPayment } from "react-paystack";
import { supabase } from '../lib/supabase';

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

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount,
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
      const queryParams = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        ...(referralCode && { referral: referralCode }),
        ...(cohortId && { cohortId }),
      });

      window.open(`https://selar.com/remotetrybe?${queryParams.toString()}`, "_blank");
      return;
    }

    setIsProcessing(true);

    initializePayment({
      onSuccess: async (response: any) => {
        setIsProcessing(false);
        if (referralCode) {
          await supabase.rpc('tally_affiliate_referral', {
            p_referral_code: referralCode,
            p_new_user_name: formData.name,
});
        }

        const redirectUrl = `/thank-you?ref=${response.reference}${cohortId ? `&cohortId=${cohortId}` : ''}`;
        window.location.href = redirectUrl;
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl relative">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Enroll in VA Masterclass</h2>
          <p className="text-gray-600 mb-6">
            Please provide your details to complete your enrollment
          </p>

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

            {referralCode && (
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
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                disabled={isProcessing}
              >
                {isForeign ? "Proceed to International Payment" : isProcessing ? "Processing..." : "Pay ₦32,000"}
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
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
