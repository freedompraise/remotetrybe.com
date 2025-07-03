import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { findOrCreateAffiliate } from '../lib/supabaseAdmin';
import { AffiliateInsert } from '../types/supabase';

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AffiliateModal = ({ isOpen, onClose }: AffiliateModalProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [formData, setFormData] = useState<AffiliateInsert>({
    full_name: '',
    email: '',
    phone: '',
    bank_name: '',
    account_number: ''
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await findOrCreateAffiliate(formData);
      setRefCode(result.ref_code);
      setStep('success');
      toast({
        title: result.alreadyExists ? 'Info' : 'Success!',
        description: result.alreadyExists
          ? 'You are already an affiliate! Here is your link.'
          : 'Successfully registered as an affiliate!',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to register. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const url = `https://www.remotetrybe.com/va-masterclass?ref=${refCode}`;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied!',
      description: 'Referral link copied to clipboard!',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {step === 'form' ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Become an Affiliate</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bank_name"
                  required
                  value={formData.bank_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  name="account_number"
                  required
                  value={formData.account_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Become an Affiliate'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Welcome to RemoteTrybe Affiliates!</h2>
            <p className="text-gray-600 mb-6">
              Share your unique referral link and start earning 5% commission for each successful enrollment.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-500 mb-2">Your Referral Link:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm break-all">
                  https://www.remotetrybe.com/va-masterclass?ref={refCode}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">
                Join our Affiliate WhatsApp Community to:
                <ul className="text-left list-disc pl-5 mt-2">
                  <li>Get marketing tips and strategies</li>
                  <li>Connect with other successful affiliates</li>
                  <li>Stay updated on promotions and campaigns</li>
                </ul>
              </p>
              <a
                href={import.meta.env.VITE_AFFILIATE_WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                Join WhatsApp Community
              </a>
            </div>
            
            <button
              onClick={onClose}
              className="text-primary font-medium hover:underline"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliateModal; 