/**
 * Centralized configuration for RemoteTrybe constants
 * Update values here to reflect changes across the entire application
 */

export const AFFILIATE_CONFIG = {
  // Referral thresholds
  MIN_REFERRALS_FOR_PAYOUT: 3, // Eligible for payout after 3 successful referrals
  REFERRALS_FOR_MAX_REWARD: 10,

  // Payout amounts (in Naira)
  PAYOUT_TIER_1: 20000, // For 5+ referrals
  PAYOUT_TIER_2: 40000, // For 10+ referrals

  // Commission rate
  COMMISSION_PERCENTAGE: 20,
};

export const BUSINESS_METRICS = {
  STUDENTS_GRADUATED: 2000,
};

/**
 * Helper functions for affiliate calculations
 */
export function getAffiliatePayoutAmount(referralCount: number): number {
  if (referralCount >= AFFILIATE_CONFIG.REFERRALS_FOR_MAX_REWARD) {
    return AFFILIATE_CONFIG.PAYOUT_TIER_2;
  } else if (referralCount >= AFFILIATE_CONFIG.MIN_REFERRALS_FOR_PAYOUT) {
    return AFFILIATE_CONFIG.PAYOUT_TIER_1;
  }
  return 0;
}

export function isAffiliateEligible(referralCount: number): boolean {
  return referralCount >= AFFILIATE_CONFIG.MIN_REFERRALS_FOR_PAYOUT;
}

export function getReferralsNeededForPayout(currentReferrals: number): number {
  return Math.max(0, AFFILIATE_CONFIG.MIN_REFERRALS_FOR_PAYOUT - currentReferrals);
}
