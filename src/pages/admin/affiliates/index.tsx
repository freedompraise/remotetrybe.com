import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAffiliateMetrics,
  getAffiliates,
  getEligibleUnpaidAffiliates,
} from '../../../lib/supabaseAdmin';

export default function AdminAffiliatesPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showEligibleUnpaid, setShowEligibleUnpaid] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAffiliateMetrics().then(setMetrics);
    if (showEligibleUnpaid) {
      getEligibleUnpaidAffiliates().then((data) => {
        setAffiliates(data);
        setCount(data.length);
        setLoading(false);
      });
    } else {
      getAffiliates({ page, pageSize, search }).then(({ data, count }) => {
        setAffiliates(data);
        setCount(count);
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [page, pageSize, search, showEligibleUnpaid]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Affiliates</h2>
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total Affiliates" value={metrics.totalAffiliates} />
          <MetricCard label="Total Referrals" value={metrics.totalReferrals} />
          <MetricCard label="Eligible for Payout" value={metrics.totalEligible} />
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search affiliates by name..."
          className="border px-3 py-2 rounded-lg w-full md:w-64"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          disabled={showEligibleUnpaid}
        />
        <button
          className={`px-4 py-2 rounded-lg font-medium border ${showEligibleUnpaid ? 'bg-primary text-white' : 'bg-white text-gray-800'}`}
          onClick={() => setShowEligibleUnpaid(v => !v)}
        >
          {showEligibleUnpaid ? 'Show All' : 'Show Eligible (Unpaid)'}
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Referrals</th>
              <th className="p-3 text-left">Joined</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-4 text-center">Loading...</td></tr>
            ) : affiliates.length === 0 ? (
              <tr><td colSpan={6} className="p-4 text-center">No affiliates found.</td></tr>
            ) : affiliates.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{a.full_name}</td>
                <td className="p-3">{a.email}</td>
                <td className="p-3">{a.phone}</td>
                <td className="p-3">{a.referral_count}</td>
                <td className="p-3">{new Date(a.created_at).toLocaleDateString()}</td>
                <td className="p-3">
                  <Link
                    to={`/admin/affiliates/${a.id}`}
                    className="text-primary hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!showEligibleUnpaid && (
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            className="px-3 py-1 rounded border disabled:opacity-50"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>Page {page}</span>
          <button
            className="px-3 py-1 rounded border disabled:opacity-50"
            onClick={() => setPage(p => p + 1)}
            disabled={affiliates.length < pageSize}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  );
} 