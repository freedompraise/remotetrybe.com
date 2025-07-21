// Returns all cohorts whose registrationEnd is in the future (registration is open)
export const getOpenCohorts = (): Cohort[] => {
  const now = new Date();
  return cohorts.filter(cohort => {
    const regEnd = new Date(cohort.registrationEnd);
    regEnd.setHours(23, 59, 59, 999); // registration open through the end of the day
    return regEnd >= now;
  }).sort((a, b) => new Date(a.registrationStart).getTime() - new Date(b.registrationStart).getTime());
};
export interface Cohort {
  id: string;
  name: string;
  registrationStart: string; // YYYY-MM-DD
  registrationEnd: string; // YYYY-MM-DD
  trainingStart: string; // YYYY-MM-DD
  trainingEnd: string; // YYYY-MM-DD
  whatsappLink: string; // This will now be an env var key
}

export const cohorts: Cohort[] = [
  {
    id: "cohort5",
    name: "Cohort 5",
    registrationStart: "2025-07-28",
    registrationEnd: "2025-09-07",
    trainingStart: "2025-09-12",
    trainingEnd: "2025-10-19",
    whatsappLink: import.meta.env.VITE_COHORT5_WA_LINK as string
  },
  {
    id: "cohort6",
    name: "Cohort 6",
    registrationStart: "2025-09-15",
    registrationEnd: "2025-11-02",
    trainingStart: "2025-11-07",
    trainingEnd: "2025-12-14",
    whatsappLink: import.meta.env.VITE_COHORT6_WA_LINK as string
  }
];

export const getActiveCohort = (): Cohort | undefined => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to start of the day

  // Find the first cohort whose training has not yet ended
  const relevantCohorts = cohorts.filter(cohort => new Date(cohort.trainingEnd) >= today)
                                  .sort((a, b) => new Date(a.registrationStart).getTime() - new Date(b.registrationStart).getTime());

  return relevantCohorts[0];
};

export const getCohortById = (id: string): Cohort | undefined => {
    return cohorts.find(cohort => cohort.id === id);
};