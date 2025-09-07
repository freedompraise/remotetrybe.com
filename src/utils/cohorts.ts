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
    id: "cohort5",
    name: "Cohort 5",
    registrationStart: "2025-07-28",
    registrationEnd: "2025-09-07",
    trainingStart: "2025-09-12",
    trainingEnd: "2025-10-19",
    whatsappLink: import.meta.env.VITE_COHORT5_WA_LINK as string,
    paystackProductUrl: 'https://paystack.com/buy/virtual-assistant-masterclass-by-remotetrybe---cohort-wyzsps'
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