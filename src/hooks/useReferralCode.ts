import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface ReferralCodeHook {
  referralCode: string | null;
  markReferralPending: () => void;
  clearReferralPending: () => void;
}

export const useReferralCode = (): ReferralCodeHook => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check URL params first
    const refFromUrl = searchParams.get('ref');
    if (refFromUrl) {
      setReferralCode(refFromUrl);
      localStorage.setItem('pendingReferralCode', refFromUrl);
      return;
    }

    // If no URL param, check localStorage
    const refFromStorage = localStorage.getItem('pendingReferralCode');
    if (refFromStorage) {
      setReferralCode(refFromStorage);
    }
  }, [searchParams]);

  const markReferralPending = (userName?: string) => {
    const refFromUrl = searchParams.get('ref');
    const refFromStorage = localStorage.getItem('pendingReferralCode');
    const code = refFromUrl || refFromStorage;

    if (code) {
      localStorage.setItem('referralPending', 'true');
      if (refFromUrl) {
        localStorage.setItem('pendingReferralCode', refFromUrl);
      }
    }
    if (userName) {
      localStorage.setItem('pendingUserName', userName);
    }
  };

  const clearReferralPending = () => {
    localStorage.removeItem('referralPending');
    localStorage.removeItem('pendingReferralCode');
    localStorage.removeItem('pendingUserName');
    setReferralCode(null);
  };

  return {
    referralCode,
    markReferralPending,
    clearReferralPending
  };
};