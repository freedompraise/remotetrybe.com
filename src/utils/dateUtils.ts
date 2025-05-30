export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatDateRange = (start: string, end: string) => {
  const startMonth = new Date(start).toLocaleDateString(undefined, { month: 'long' });
  const endMonth = new Date(end).toLocaleDateString(undefined, { month: 'long' });
  const startDay = new Date(start).toLocaleDateString(undefined, { day: 'numeric' });
  const endDay = new Date(end).toLocaleDateString(undefined, { day: 'numeric' });
  const startYear = new Date(start).getFullYear();
  const endYear = new Date(end).getFullYear();

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