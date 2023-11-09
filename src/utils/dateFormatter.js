export const convertDateFormat = (inputDateString) => {
  const inputDate = new Date(inputDateString);

  const day = String(inputDate.getUTCDate()).padStart(2, "0");
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0");
  const year = inputDate.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export const convertBackToISODateString = (inputDateString) => {
  const [day, month, year] = inputDateString.split("/").map(Number);
  const dateObject = new Date(Date.UTC(year, month - 1, day)); // Month is 0-based in JavaScript Date object

  return dateObject.toISOString().split("T")[0];
};
