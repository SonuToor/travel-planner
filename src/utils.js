const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const monthStringToNum = month => {
  if (MONTHS.indexOf(month.trim()) > -1) {
    return MONTHS.indexOf(month.trim());
  } else {
    return null;
  }
};
