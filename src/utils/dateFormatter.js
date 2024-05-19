export const getMaxDate = () => {
  let year = new Date().getFullYear();
  console.log(year);
  let month = new Date().getMonth() + 1;
  console.log(month);
  let day =
    new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate();
  console.log(day);
  console.log(`"${year}-${month}-${day}"`);
  console.log(month);
  return `${year}-${month}-${day}`;
};

export const formatDate = (isoDate) => {
  // Create a Date object from the ISO 8601 date string
  const date = new Date(isoDate);

  // Define options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the date to a readable string
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

export const formatDateOnCard = (dateString) => {
  // Create a Date object from the date string
  const date = new Date(dateString);

  // Define options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the date to a readable string
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};
