/**
 * Centralized configuration for RemoteTrybe constants
 * Update values here to reflect changes across the entire application
 */

export const AFFILIATE_CONFIG = {
  // Referral thresholds
  MIN_REFERRALS_FOR_PAYOUT: 3, // Eligible for payout after 3 successful referrals
  REFERRALS_FOR_MAX_REWARD: 10,

  // Payout amounts (in Naira)
  PAYOUT_TIER_1: 20000, // For 3+ referrals
  PAYOUT_TIER_2: 40000, // For 10+ referrals

  // Commission rate
  COMMISSION_PERCENTAGE: 20,
};

export const BUSINESS_METRICS = {
  STUDENTS_GRADUATED: 2000,
  TRAINED_PROFESSIONALS: 1000, // Used in About section (may be outdated, should be 2000+)
  SPECIALIZED_PROGRAMS: 6,
  FOUNDER_UPWORK_RANKING: "Top Rated Plus",
  FOUNDER_UPWORK_PERCENTILE: "Top 3%",
  FOUNDER_LINKEDIN_FOLLOWERS: "50K+",
  PROGRAM_FOUNDING_YEAR: 2022,
};

export const VA_MASTERCLASS_CONFIG = {
  // Pricing
  PRICE_NGN: 32000, // Nigerian Naira
  PRICE_USD: 35,
  /** Paystack amount in kobo (smallest currency unit) */
  PRICE_KOBO: 3200000,

  // Program details
  COMMUNITY_SIZE: 800, // VA community members
};

export const FOUNDER_CONTACT = {
  EMAIL: "odosa@remotetrybe.com",
  LINKEDIN: "https://www.linkedin.com/in/odosa-egharevba-68634a248",
  YOUTUBE: "https://youtube.com/@odosaegharevba",
  TWITTER: "https://x.com/odosaabi",
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
