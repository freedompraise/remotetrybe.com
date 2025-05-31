export type Affiliate = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  bank_name: string;
  account_number: string;
  ref_code: string;
  referral_count: number;
  earnings: number;
  payout_status: 'not_eligible' | 'eligible' | 'paid';
  created_at: string;
};

export type AffiliateInsert = Omit<Affiliate, 'id' | 'ref_code' | 'referral_count' | 'earnings' | 'payout_status' | 'created_at'>; 