const BASE_URL = "http://localhost:8000";

export const deleteRecord = async (id) => {
  console.log(id);
  const res = await fetch(`${BASE_URL}/records/deleterecord/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
//   return data;
};
