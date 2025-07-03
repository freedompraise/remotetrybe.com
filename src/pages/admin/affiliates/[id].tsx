import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getAffiliateById,
  getAffiliatePayouts,
  markPayoutAsPaid,
  logNewPayout,
} from '../../../lib/supabaseAdmin';

export default function AffiliateProfilePage() {
  const { id } = useParams();
  const [affiliate, setAffiliate] = useState<any>(null);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [logPayoutOpen, setLogPayoutOpen] = useState(false);
  const [logAmount, setLogAmount] = useState(20000);
  const [logReason, setLogReason] = useState('Crossed 5 referrals');
  const [logLoading, setLogLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      getAffiliateById(id),
      getAffiliatePayouts(id),
    ])
      .then(([a, p]) => {
        setAffiliate(a);
        setPayouts(p);
        setLoading(false);
      })
      .catch((e) => {
        setError('Failed to load affiliate');
        setLoading(false);
      });
  }, [id]);

  const handleMarkPaid = async (payoutId: string) => {
    setActionMsg('');
    try {
      await markPayoutAsPaid(payoutId);
      setPayouts((prev) =>
        prev.map((p) =>
          p.id === payoutId ? { ...p, status: 'paid', paid_at: new Date().toISOString() } : p
        )
      );
      setActionMsg('Payout marked as paid.');
    } catch (e) {
      setActionMsg('Failed to mark as paid.');
    }
  };

  const handleLogPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLogLoading(true);
    setActionMsg('');
    try {
      await logNewPayout({ affiliateId: id!, amount: logAmount, reason: logReason });
      setPayouts((prev) => [
        {
          id: Math.random().toString(36),
          affiliate_id: id,
          amount: logAmount,
          reason: logReason,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setLogPayoutOpen(false);
      setActionMsg('New payout logged.');
    } catch (e) {
      setActionMsg('Failed to log payout.');
    } finally {
      setLogLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error || !affiliate) return <div className="text-red-500">{error || 'Affiliate not found.'}</div>;

  const eligible = affiliate.referral_count >= 5;
  const totalEarnings = payouts.filter(p => p.status === 'paid').reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Affiliate Profile</h2>
      <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="text-lg font-semibold mb-1">{affiliate.full_name}</div>
          <div className="text-gray-600 mb-1">{affiliate.email} | {affiliate.phone}</div>
          <div className="text-gray-600 mb-1">Bank: {affiliate.bank_name} | Acct: {affiliate.account_number}</div>
          <div className="text-xs text-gray-400">Joined: {new Date(affiliate.created_at).toLocaleDateString()}</div>
        </div>
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-xl font-bold">{affiliate.referral_count}</div>
            <div className="text-xs text-gray-500">Referrals</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">₦{totalEarnings.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total Earnings</div>
          </div>
          <div className="text-center">
            <div className={`text-sm font-bold ${eligible ? 'text-green-600' : 'text-gray-400'}`}>{eligible ? 'Eligible' : 'Not Eligible'}</div>
            <div className="text-xs text-gray-500">Status</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90"
          onClick={() => setLogPayoutOpen((v) => !v)}
        >
          {logPayoutOpen ? 'Cancel' : 'Log New Payout'}
        </button>
        {actionMsg && <span className="text-sm text-green-600">{actionMsg}</span>}
      </div>
      {logPayoutOpen && (
        <form onSubmit={handleLogPayout} className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="number"
            min={0}
            className="border px-3 py-2 rounded-lg w-32"
            value={logAmount}
            onChange={e => setLogAmount(Number(e.target.value))}
            required
            placeholder="Amount"
          />
          <input
            type="text"
            className="border px-3 py-2 rounded-lg flex-1"
            value={logReason}
            onChange={e => setLogReason(e.target.value)}
            required
            placeholder="Reason"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
            disabled={logLoading}
          >
            {logLoading ? 'Logging...' : 'Log Payout'}
          </button>
        </form>
      )}
      <h3 className="text-lg font-semibold mb-2">Payouts</h3>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Paid At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payouts.length === 0 ? (
              <tr><td colSpan={6} className="p-4 text-center">No payouts found.</td></tr>
            ) : payouts.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">₦{p.amount?.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${p.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
                </td>
                <td className="p-3">{p.reason}</td>
                <td className="p-3">{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="p-3">{p.paid_at ? new Date(p.paid_at).toLocaleDateString() : '-'}</td>
                <td className="p-3">
                  {p.status === 'pending' && (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs"
                      onClick={() => handleMarkPaid(p.id)}
                    >
                      Mark as Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 