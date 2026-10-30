/**
 * Centralized configuration for RemoteTrybe constants
 * Update values here to reflect changes across the entire application
 */

const MASTERCLASS_PRICE_NGN = 32000;

export const AFFILIATE_CONFIG = {
  // Referral thresholds
  FIRST_TIER_REFERRALS: 3,
  SECOND_TIER_REFERRALS: 6,
  MIN_REFERRALS_FOR_PAYOUT: 3,
  REFERRALS_FOR_MAX_REWARD: 6,

  // Commission rates
  FIRST_TIER_COMMISSION_PERCENTAGE: 5,
  SECOND_TIER_COMMISSION_PERCENTAGE: 20,
  COMMISSION_PERCENTAGE: 5,

  // Payout amounts (in Naira)
  PAYOUT_TIER_1: Math.round(MASTERCLASS_PRICE_NGN * 3 * 0.05),
  PAYOUT_TIER_2: Math.round(MASTERCLASS_PRICE_NGN * ((3 * 0.05) + (3 * 0.20))),
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
  PRICE_NGN: MASTERCLASS_PRICE_NGN, // Nigerian Naira
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
  TWITTER: "https://x.com/odosaar?s=11",
  TIKTOK: "https://www.tiktok.com/@odosar?_r=1&_t=ZS-97YvOIViXqf",
  LINKTREE: "https://linktr.ee/odosaa",
};

/**
 * Helper functions for affiliate calculations
 */
export function getAffiliatePayoutAmount(referralCount: number): number {
  const eligibleReferrals = Math.min(
    Math.max(referralCount, 0),
    AFFILIATE_CONFIG.REFERRALS_FOR_MAX_REWARD
  );

  if (eligibleReferrals < AFFILIATE_CONFIG.FIRST_TIER_REFERRALS) {
    return 0;
  }

  const firstTierEarnings = AFFILIATE_CONFIG.FIRST_TIER_REFERRALS * MASTERCLASS_PRICE_NGN * 0.05;
  const secondTierEarnings = Math.max(
    0,
    eligibleReferrals - AFFILIATE_CONFIG.FIRST_TIER_REFERRALS
  ) * MASTERCLASS_PRICE_NGN * 0.2;

  return Math.round(firstTierEarnings + secondTierEarnings);
}

export function isAffiliateEligible(referralCount: number): boolean {
  return referralCount >= AFFILIATE_CONFIG.MIN_REFERRALS_FOR_PAYOUT;
}

export function getReferralsNeededForPayout(currentReferrals: number): number {
  return Math.max(0, AFFILIATE_CONFIG.MIN_REFERRALS_FOR_PAYOUT - currentReferrals);
}
