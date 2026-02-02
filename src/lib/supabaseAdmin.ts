import { supabase } from './supabase';

let affiliateCache = [];
let affiliateCacheLoaded = false;

async function loadAllAffiliates() {
  if (affiliateCacheLoaded) return affiliateCache;
  const { data, error } = await supabase.from('affiliates').select('*');
  if (error) throw error;
  
  // Prefetch payout statuses for affiliates (paid + requested)
  const { data: payouts } = await supabase
    .from('affiliate_payouts')
    .select('affiliate_id, status, paid_at, created_at')
    .in('status', ['paid', 'requested']);

  const paidDates = {};
  const requestedDates = {};
  const hasRequested = {};

  (payouts || []).forEach(p => {
    if (p.status === 'paid' && p.paid_at && !paidDates[p.affiliate_id]) {
      paidDates[p.affiliate_id] = p.paid_at;
    }
    if (p.status === 'requested' && p.created_at && !requestedDates[p.affiliate_id]) {
      requestedDates[p.affiliate_id] = p.created_at;
      hasRequested[p.affiliate_id] = true;
    }
  });
  
  affiliateCache = (data || []).map(a => ({
    ...a,
    last_paid_at: paidDates[a.id] || null,
    has_paid_payout: !!paidDates[a.id],
    has_requested_payout: !!hasRequested[a.id],
    last_requested_at: requestedDates[a.id] || null,
  }));
  affiliateCacheLoaded = true;
  return affiliateCache;
}

export function clearAffiliatesCache() {
  affiliateCache = [];
  affiliateCacheLoaded = false;
}

export async function getAffiliates({ page = 1, pageSize = 20, search = '', sortBy = 'joined', sortOrder = 'desc' } = {}) {
  await loadAllAffiliates();
  let filtered = affiliateCache;
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(a => a.full_name.toLowerCase().includes(s));
  }
  
  // Sort
  filtered.sort((a, b) => {
    let aVal, bVal;
    
    if (sortBy === 'joined') {
      aVal = new Date(a.created_at).getTime();
      bVal = new Date(b.created_at).getTime();
    } else if (sortBy === 'referrals') {
      aVal = a.referral_count || 0;
      bVal = b.referral_count || 0;
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
  
  const count = filtered.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = filtered.slice(start, end);
  return { data, count };
}

export async function getAffiliateById(id) {
  await loadAllAffiliates();
  return affiliateCache.find(a => a.id === id) || null;
}

export async function getAffiliateMetrics() {
  await loadAllAffiliates();
  const totalAffiliates = affiliateCache.length;
  const totalReferrals = affiliateCache.reduce((sum, a) => sum + (a.referral_count || 0), 0);
  const totalEligible = affiliateCache.filter(a => a.referral_count >= 5).length;
  return { totalAffiliates, totalReferrals, totalEligible };
}

export async function getEligibleUnpaidAffiliates() {
  await loadAllAffiliates();
  // Return affiliates who haven't been paid yet (may include requested)
  return affiliateCache.filter(a => !a.has_paid_payout);
}

export async function getRequestedAffiliates() {
  await loadAllAffiliates();
  // Return affiliates who have requested payouts and are not paid yet
  return affiliateCache.filter(a => !!a.has_requested_payout && !a.has_paid_payout);
}

export async function getAffiliatePayouts(affiliateId) {
  const { data, error } = await supabase
    .from('affiliate_payouts')
    .select('*')
    .eq('affiliate_id', affiliateId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function markPayoutAsPaid(payoutId) {
  const { error } = await supabase
    .from('affiliate_payouts')
    .update({ status: 'paid', paid_at: new Date().toISOString() })
    .eq('id', payoutId);
  if (error) throw error;
  return true;
}

export async function logNewPayout({ affiliateId, amount, reason }) {
  const { error } = await supabase
    .from('affiliate_payouts')
    .insert([{ affiliate_id: affiliateId, amount, reason, status: 'pending' }]);
  if (error) throw error;
  return true;
}

export async function requestPayout({ affiliateId, amount, reason }) {
  const { data: inserted, error } = await supabase
    .from('affiliate_payouts')
    .insert([{ affiliate_id: affiliateId, amount, reason, status: 'requested' }])
    .select()
    .single();
  if (error) throw error;
  // Clear cache so subsequent reads reflect the new request
  clearAffiliatesCache();
  return inserted;
}

export async function findOrCreateAffiliate(formData) {
  await loadAllAffiliates();
  const existingAffiliate = affiliateCache.find(a => a.email === formData.email);
  if (existingAffiliate) {
    return { ref_code: existingAffiliate.ref_code, alreadyExists: true };
  }
  const slug = formData.full_name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const random = Math.random().toString(36).substring(2, 6);
  const ref_code = `${slug}${random}`;
  const { error } = await supabase
    .from('affiliates')
    .insert([{ ...formData, ref_code }]);
  if (error) throw error;
  clearAffiliatesCache();
  return { ref_code, alreadyExists: false };
}

export async function tallyAffiliateReferral({ referralCode, userName }) {
  const { error } = await supabase.rpc('tally_affiliate_referral', {
    p_referral_code: referralCode,
    p_new_user_name: userName || 'Paystack Product Payment User',
  });
  if (error) throw error;
  clearAffiliatesCache();
  return true;
}

export async function getAffiliateByEmail(email: string) {
  const { data: affiliate, error: affiliateError } = await supabase
    .from('affiliates')
    .select('*')
    .ilike('email', email)
    .single();

  if (affiliateError) throw affiliateError;
  if (!affiliate) return null;

  // Get payout information for this affiliate (paid + requested)
  const { data: payouts } = await supabase
    .from('affiliate_payouts')
    .select('status, paid_at, created_at')
    .eq('affiliate_id', affiliate.id)
    .in('status', ['paid', 'requested'])
    .order('paid_at', { ascending: false });

  const has_paid_payout = (payouts && payouts.some(p => p.status === 'paid'));
  const last_paid_at = has_paid_payout 
    ? (payouts.find(p => p.status === 'paid' && p.paid_at)?.paid_at || null)
    : null;

  const has_requested_payout = (payouts && payouts.some(p => p.status === 'requested'));
  const last_requested_at = has_requested_payout
    ? (payouts.find(p => p.status === 'requested' && p.created_at)?.created_at || null)
    : null;

  return {
    ...affiliate,
    has_paid_payout,
    last_paid_at,
    has_requested_payout,
    last_requested_at,
  };
}
