const BASE_URL = "http://localhost:8000";

export const deleteRecord = async (id) => {
  await fetch(`${BASE_URL}/records/deleterecord/${id}`, {
    method: "DELETE",
  });
};
