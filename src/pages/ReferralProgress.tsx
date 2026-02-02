// ReferralProgress.tsx
import { useState } from "react"
import { Search, CheckCircle, AlertCircle } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { getAffiliateByEmail, requestPayout } from "../lib/supabaseAdmin"

interface AffiliateData {
  id?: string
  full_name: string
  email: string
  ref_code: string
  referral_count: number
  has_paid_payout?: boolean
  last_paid_at?: string | null
  has_requested_payout?: boolean
  last_requested_at?: string | null
} 



const ReferralProgress = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestMsg, setRequestMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await getAffiliateByEmail(email)
      if (!data) {
        setError("No affiliate found with this email address")
        setAffiliate(null)
      } else {
        setAffiliate(data)
      }
    } catch {
      setError("An error occurred while fetching your referral data")
      setAffiliate(null)
    } finally {
      setLoading(false)
    }
  }

  const handleRequestPayout = async () => {
    if (!affiliate) return
    setRequestLoading(true)
    setRequestMsg(null)
    try {
      // Tiered payout: 5+ => 20,000 ; 10+ => 40,000
      const amount = affiliate.referral_count >= 10 ? 40000 : 20000
      const reason = `Requested by affiliate after ${affiliate.referral_count} referral${affiliate.referral_count === 1 ? '' : 's'}`
      const inserted = await requestPayout({ affiliateId: affiliate.id!, amount, reason })
      setAffiliate(prev => prev ? { ...prev, has_requested_payout: true, last_requested_at: inserted?.created_at || new Date().toISOString() } : prev)
      setRequestMsg('Payout requested.')
    } catch (e) {
      setRequestMsg('Failed to request payout.')
    } finally {
      setRequestLoading(false)
    }
  }

  const getProgressMessage = (referralCount: number) => {
    if (referralCount >= 10) {
      return {
        title: "🎉 Outstanding Achievement!",
        message: "You have reached 10+ referrals. You are eligible for our maximum rewards."
      }
    } else if (referralCount >= 5) {
      return {
        title: "🌟 Great Progress!",
        message: "You have reached 5+ referrals and are eligible for payout. Keep going."
      }
    } else {
      const remaining = 5 - referralCount
      return {
        title: "🚀 Keep Going!",
        message: `You need ${remaining} more referral${remaining === 1 ? "" : "s"} to hit your first payout.`
      }
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          {!affiliate && !error && (
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Welcome, Affiliate
              </h1>
              <p className="text-gray-600">
                Enter your email to view your referral progress and rewards.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your affiliate email"
                className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <span className="animate-spin">⌛</span> : <Search size={20} />}
                Check Progress
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-red-700 mb-2">Not Found</h2>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {affiliate && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome back, {affiliate.full_name}!
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Your Referral Code</div>
                  <div className="text-lg font-semibold break-words">{affiliate.ref_code}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Total Referrals</div>
                  <div className="text-lg font-semibold">{affiliate.referral_count}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Payment Status</div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      affiliate.has_paid_payout ? 'bg-green-500' : affiliate.has_requested_payout ? 'bg-blue-500' : 'bg-yellow-500'
                    }`} />
                    <span className="text-lg font-semibold">
                      {affiliate.has_paid_payout ? 'Paid' : affiliate.has_requested_payout ? 'Requested' : 'Unpaid'}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Last Payment Date</div>
                  <div className="text-lg font-semibold">
                    {affiliate.last_paid_at ? new Date(affiliate.last_paid_at).toLocaleDateString() : (affiliate.last_requested_at ? new Date(affiliate.last_requested_at).toLocaleDateString() : '—')}
                  </div>
                </div>
              </div>

              {affiliate.referral_count >= 5 && !affiliate.has_paid_payout && !affiliate.has_requested_payout && (
                <div className="text-center">
                  <button
                    onClick={handleRequestPayout}
                    disabled={requestLoading}
                    className="mt-4 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90"
                  >
                    {requestLoading ? 'Requesting...' : 'Request Payout'}
                  </button>
                  {requestMsg && <div className="text-sm text-green-600 mt-2">{requestMsg}</div>}
                </div>
              )}

              <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  {getProgressMessage(affiliate.referral_count).title}
                </h3>
                <p className="text-gray-600">
                  {getProgressMessage(affiliate.referral_count).message}
                </p>
              </div>

              <div className="relative pt-4">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{
                      width: `${Math.min((affiliate.referral_count / 10) * 100, 100)}%`
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>5</span>
                  <span>10+</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ReferralProgress
