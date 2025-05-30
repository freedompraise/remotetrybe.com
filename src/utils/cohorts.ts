export interface Cohort {
  id: string;
  name: string;
  registrationStart: string; // YYYY-MM-DD
  registrationEnd: string; // YYYY-MM-DD
  trainingStart: string; // YYYY-MM-DD
  trainingEnd: string; // YYYY-MM-DD
  whatsappLink: string;
}

export const cohorts: Cohort[] = [
  {
    id: "cohort4",
    name: "Cohort 4",
    registrationStart: "2025-06-02",
    registrationEnd: "2025-07-20",
    trainingStart: "2025-07-25",
    trainingEnd: "2025-08-31",
    whatsappLink: "https://chat.whatsapp.com/KsP9fOrAE8H8DxPYWD6h3Q"
  },
  {
    id: "cohort5",
    name: "Cohort 5",
    registrationStart: "2025-07-28",
    registrationEnd: "2025-09-07",
    trainingStart: "2025-09-12",
    trainingEnd: "2025-10-19",
    whatsappLink: "https://chat.whatsapp.com/Jlq6S7IjTCb9YYzbe9BWYG"
  },
  {
    id: "cohort6",
    name: "Cohort 6",
    registrationStart: "2025-09-15",
    registrationEnd: "2025-11-02",
    trainingStart: "2025-11-07",
    trainingEnd: "2025-12-14",
    whatsappLink: "https://chat.whatsapp.com/CeEXpZBXY24GyMS7wWZP9I"
  }
];

export const getActiveCohort = (): Cohort | undefined => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to start of the day

  // Find the first cohort whose training has not yet ended
  const relevantCohorts = cohorts.filter(cohort => new Date(cohort.trainingEnd) >= today)
                                  .sort((a, b) => new Date(a.registrationStart).getTime() - new Date(b.registrationStart).getTime());

  // Return the first relevant cohort found, or undefined if all cohorts' training has ended
  return relevantCohorts[0];
};

export const getCohortById = (id: string): Cohort | undefined => {
    return cohorts.find(cohort => cohort.id === id);
};