import { supabase } from './supabase';

let affiliateCache = [];
let affiliateCacheLoaded = false;

async function loadAllAffiliates() {
  if (affiliateCacheLoaded) return affiliateCache;
  const { data, error } = await supabase.from('affiliates').select('*');
  if (error) throw error;
  affiliateCache = data || [];
  affiliateCacheLoaded = true;
  return affiliateCache;
}

export function clearAffiliatesCache() {
  affiliateCache = [];
  affiliateCacheLoaded = false;
}

export async function getAffiliates({ page = 1, pageSize = 20, search = '' } = {}) {
  await loadAllAffiliates();
  let filtered = affiliateCache;
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(a => a.full_name.toLowerCase().includes(s));
  }
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
  return affiliateCache.filter(a => a.referral_count >= 5);
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
  const { data, error } = await supabase
    .from('affiliates')
    .select('*')
    .ilike('email', email)
    .single();

  if (error) throw error;
  return data;
}
