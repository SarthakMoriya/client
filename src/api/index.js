const BASE_URL = "http://localhost:8000";

export const deleteRecord = async (id) => {
  await fetch(`${BASE_URL}/records/deleterecord/${id}`, {
    method: "DELETE",
  });
};

export const  getRecords = async () => {
  const data = await fetch("http://localhost:8000/records/getrecords");
  const res = await data.json();
  console.log("RECORDS: " + res)
  return res;
};