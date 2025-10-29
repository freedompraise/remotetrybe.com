// Returns all cohorts whose registrationEnd is in the future (registration is open)
export const getOpenCohorts = (): Cohort[] => {
  const now = new Date();
  // Set time to 00:00:00 to compare dates only, not time
  now.setHours(0, 0, 0, 0); 
  return cohorts.filter(cohort => {
    const regEnd = new Date(cohort.registrationEnd);
    // The end date is inclusive, so we compare against the start of the next day
    return regEnd >= now;
  }).sort((a, b) => new Date(a.registrationStart).getTime() - new Date(b.registrationStart).getTime());
};
// Returns a cohort by its ID, or undefined if not found
export const getCohortById = (id: string): Cohort | undefined => {
  return cohorts.find(cohort => cohort.id === id);
};
export interface Cohort {
  id: string;
  name: string;
  registrationStart: string; // YYYY-MM-DD
  registrationEnd: string; // YYYY-MM-DD
  trainingStart: string; // YYYY-MM-DD
  trainingEnd: string; // YYYY-MM-DD
  whatsappLink: string; // This will now be an env var key
  paystackProductUrl?: string;
}

export const cohorts: Cohort[] = [
  {
    id: "cohort9",
    name: "Cohort 9",
    registrationStart: "2026-03-16",
    registrationEnd: "2026-05-17",
    trainingStart: "2026-05-22",
    trainingEnd: "2026-06-21",
    whatsappLink: import.meta.env.VITE_COHORT9_WA_LINK as string,
    paystackProductUrl: "https://paystack.com/buy/copy-2-of-virtual-assistant-masterclass-by-remotetryb-qmnnqw"
  },
  {
    id: "cohort8",
    name: "Cohort 8",
    registrationStart: "2026-01-19",
    registrationEnd: "2026-03-15",
    trainingStart: "2026-03-20",
    trainingEnd: "2026-04-26",
    whatsappLink: import.meta.env.VITE_COHORT8_WA_LINK as string,
    paystackProductUrl: "https://paystack.com/buy/virtual-assistant-masterclass-by-remotetrybe---cohort-efpiah"
  },
  {
    id: "cohort7",
    name: "Cohort 7",
    registrationStart: "2025-11-03",
    registrationEnd: "2026-01-18",
    trainingStart: "2026-01-23",
    trainingEnd: "2026-03-08",
    whatsappLink: import.meta.env.VITE_COHORT7_WA_LINK as string,
    paystackProductUrl: "https://paystack.com/buy/virtual-assistant-masterclass-by-remotetrybe---cohort-rwlkos"
  },
  {
    id: "cohort6",
    name: "Cohort 6",
    registrationStart: "2025-09-15",
    registrationEnd: "2025-11-02",
    trainingStart: "2025-11-07",
    trainingEnd: "2025-12-14",
    whatsappLink: import.meta.env.VITE_COHORT6_WA_LINK as string,
    paystackProductUrl: 'https://paystack.com/buy/virtual-assistant-masterclass-by-remotetrybe---cohort-infwgj'
  }
];