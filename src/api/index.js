const BASE_URL = "http://localhost:8000";

export const deleteRecord = async (id,navigate) => {
  await fetch(`${BASE_URL}/records/deleterecord/${id}`, {
    method: "DELETE",
  });
  navigate('/')
};

export const  getRecords = async () => {
  const data = await fetch(BASE_URL+"/getrecords");
  const res = await data.json();
  return res;
};