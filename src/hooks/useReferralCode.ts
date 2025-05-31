import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useReferralCode = () => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check URL params first
    const refFromUrl = searchParams.get('ref');
    if (refFromUrl) {
      setReferralCode(refFromUrl);
      localStorage.setItem('referralCode', refFromUrl);
      return;
    }

    // If no URL param, check localStorage
    const refFromStorage = localStorage.getItem('referralCode');
    if (refFromStorage) {
      setReferralCode(refFromStorage);
    }
  }, [searchParams]);

  return referralCode;
}; 