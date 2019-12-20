import moment from "moment";

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

export const createArrayOfDates = (startDate, stopDate) => {
  var dateArray = [];
  if (startDate === null || stopDate === null) {
    return dateArray;
  }
  var currentDate = moment(startDate);
  var endDate = moment(stopDate);
  while (currentDate <= endDate) {
    dateArray.push(moment(currentDate).format("MMMM Do YYYY"));
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
};
