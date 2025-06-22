const parseDateAsLocal = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  // Months are 0-indexed in JS Date constructor (0 for Jan, 11 for Dec)
  return new Date(year, month - 1, day);
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  return parseDateAsLocal(dateString).toLocaleDateString(undefined, options);
};

export const formatDateRange = (start: string, end: string) => {
  const startDate = parseDateAsLocal(start);
  const endDate = parseDateAsLocal(end);

  const startMonth = startDate.toLocaleDateString(undefined, { month: 'long' });
  const endMonth = endDate.toLocaleDateString(undefined, { month: 'long' });
  const startDay = startDate.toLocaleDateString(undefined, { day: 'numeric' });
  const endDay = endDate.toLocaleDateString(undefined, { day: 'numeric' });
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${startYear}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
    }
  } else {
    return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
  }
}; 