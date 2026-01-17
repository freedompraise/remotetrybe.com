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
  created_at: string;
};

export type AffiliatePayout = {
  id: string;
  affiliate_id: string;
  amount: number;
  reason?: string;
  status: 'pending' | 'paid';
  paid_at?: string;
  created_at: string;
};

export type AffiliateInsert = Omit<Affiliate, 'id' | 'ref_code' | 'referral_count' | 'earnings' | 'created_at'>; 