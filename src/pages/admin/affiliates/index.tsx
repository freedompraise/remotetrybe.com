import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAffiliateMetrics,
  getAffiliates,
} from '../../../lib/supabaseAdmin';

type AffiliateFilter = 'all' | 'unpaid' | 'requested';
type AffiliateRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  referral_count: number;
  has_paid_payout: boolean;
  has_requested_payout: boolean;
  last_paid_at: string | null;
  last_requested_at: string | null;
};

type AffiliateMetrics = {
  totalAffiliates: number;
  totalReferrals: number;
  totalEligible: number;
  totalRequested: number;
};

export default function AdminAffiliatesPage() {
  const [metrics, setMetrics] = useState<AffiliateMetrics | null>(null);
  const [affiliates, setAffiliates] = useState<AffiliateRow[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'joined' | 'referrals'>('joined');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState<AffiliateFilter>('all');

  useEffect(() => {
    let cancelled = false;

    const loadAffiliates = async () => {
      setLoading(true);
      setError('');

      try {
        const [metricsResult, affiliatesResult] = await Promise.all([
          getAffiliateMetrics(),
          getAffiliates({
            page,
            pageSize,
            search,
            sortBy,
            sortOrder,
            statusFilter: activeFilter,
          }),
        ]);

        if (cancelled) return;

        setMetrics(metricsResult);
        setAffiliates(affiliatesResult.data);
        setCount(affiliatesResult.count);
      } catch (err) {
        if (cancelled) return;

        setMetrics(null);
        setAffiliates([]);
        setCount(0);
        setError('Failed to load affiliates.');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAffiliates();

    return () => {
      cancelled = true;
    };
  }, [page, pageSize, search, sortBy, sortOrder, activeFilter]);

  const emptyMessage =
    activeFilter === 'requested'
      ? 'No requested payouts found.'
      : activeFilter === 'unpaid'
        ? 'No unpaid affiliates found.'
        : 'No affiliates found.';

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Affiliates</h2>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total Affiliates" value={metrics.totalAffiliates} />
          <MetricCard label="Total Referrals" value={metrics.totalReferrals} />
          <MetricCard label="Eligible for Payout" value={metrics.totalEligible} />
          <MetricCard label="Requested Payouts" value={metrics.totalRequested} />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, phone, or ref code..."
          className="border px-3 py-2 rounded-lg w-full md:w-64"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={e => {
                setSortBy(e.target.value as 'joined' | 'referrals');
                setPage(1);
              }}
              className="border px-3 py-2 rounded-lg bg-white disabled:opacity-50"
            >
              <option value="joined">Sort by: Joined</option>
              <option value="referrals">Sort by: Referrals</option>
            </select>
            <button
              onClick={() => {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                setPage(1);
              }}
              className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50"
              title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortOrder === 'asc' ? 'Asc' : 'Desc'}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg font-medium border ${
                activeFilter === 'unpaid'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-800'
              }`}
              onClick={() => {
                setActiveFilter(v => (v === 'unpaid' ? 'all' : 'unpaid'));
                setPage(1);
              }}
            >
              {activeFilter === 'unpaid' ? 'Show All' : 'Show Unpaid'}
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium border ${
                activeFilter === 'requested'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-800'
              }`}
              onClick={() => {
                setActiveFilter(v => (v === 'requested' ? 'all' : 'requested'));
                setPage(1);
              }}
            >
              {activeFilter === 'requested' ? 'Show All' : 'Show Requested'}
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Referrals</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Last Paid</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : affiliates.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              affiliates.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{a.full_name}</td>
                  <td className="p-3">{a.email}</td>
                  <td className="p-3">{a.phone}</td>
                  <td className="p-3">{a.referral_count}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        a.has_paid_payout
                          ? 'bg-green-100 text-green-800'
                          : a.has_requested_payout
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {a.has_paid_payout
                        ? 'Paid'
                        : a.has_requested_payout
                          ? 'Requested'
                          : 'Unpaid'}
                    </span>
                  </td>
                  <td className="p-3">
                    {a.last_paid_at
                      ? new Date(a.last_paid_at).toLocaleDateString()
                      : a.last_requested_at
                        ? new Date(a.last_requested_at).toLocaleDateString()
                        : '-'}
                  </td>
                  <td className="p-3">
                    <Link
                      to={`/admin/affiliates/${a.id}`}
                      className="text-primary hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {count > pageSize && (
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
            disabled={page * pageSize >= count}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}
