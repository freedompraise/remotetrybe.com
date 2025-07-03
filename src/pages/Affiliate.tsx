// Affiliate.tsx

import { useState, useEffect } from "react";
import { Check, UserPlus } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AffiliateModal from "../components/AffiliateModal";
import ScrollReveal from "../components/ScrollReveal";
import { getAffiliates } from '../lib/supabaseAdmin';

const Affiliate = () => {
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Affiliate Program | RemoteTrybe";
    // Fetch all affiliates once
    getAffiliates({ page: 1, pageSize: 10000 }).then(({ data }) => {
      setAffiliates(data);
      setLoading(false);
    });
    console.log("affiliates", affiliates);
  }, []);

  // Compute metrics locally
  const totalAffiliates = affiliates.length;
  const totalReferrals = affiliates.reduce((sum, a) => sum + (a.referral_count || 0), 0);
  const totalEligible = affiliates.filter(a => a.referral_count >= 5).length;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section
          className="relative pt-28 pb-16 md:pt-32 md:pb-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/affiliate-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50 z-0" />
          <div className="relative z-10 container mx-auto">
            <div className="text-center max-w-4xl mx-auto text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Earn While Making a Difference
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Help others discover opportunities at RemoteTrybe and earn while doing it.
              </p>
              {/* Example metrics display */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="bg-white/20 rounded-lg px-6 py-3 text-center">
                  <div className="text-2xl font-bold">{loading ? '...' : totalAffiliates}</div>
                  <div className="text-xs">Total Affiliates</div>
                </div>
                <div className="bg-white/20 rounded-lg px-6 py-3 text-center">
                  <div className="text-2xl font-bold">{loading ? '...' : totalReferrals}</div>
                  <div className="text-xs">Total Referrals</div>
                </div>
                <div className="bg-white/20 rounded-lg px-6 py-3 text-center">
                  <div className="text-2xl font-bold">{loading ? '...' : totalEligible}</div>
                  <div className="text-xs">Eligible for Payout</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Become an Affiliate?</h2>
              <p className="text-gray-600">
                Partner with us and create a sustainable income stream while helping others achieve their dreams of becoming high-value virtual assistants and freelancers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Easy Earnings</h3>
                <p className="text-gray-600 text-sm">
                  5% commission for every successful enrollment.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Big Rewards</h3>
                <p className="text-gray-600 text-sm">
                  Earn up to ₦20,000 for 10 successful referrals.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Get Paid</h3>
                <p className="text-gray-600 text-sm">
                  Eligible for payout after 5 successful referrals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 bg-cream text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Start Earning?</h3>
          <button
            onClick={() => setShowAffiliateModal(true)}
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            <UserPlus size={20} />
            Join the Affiliate Program
          </button>
        </section>

        <AffiliateModal
          isOpen={showAffiliateModal}
          onClose={() => setShowAffiliateModal(false)}
        />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
};

export default Affiliate;
