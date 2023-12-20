const BASE_URL = "http://localhost:8000";

export const deleteRecord = async (id, navigate) => {
  await fetch(`${BASE_URL}/records/deleterecord/${id}`, {
    method: "DELETE",
  });
  navigate("/");
};

export const getRecords = async () => {
  const data = await fetch(BASE_URL + "/records/getrecords");
  const res = await data.json();
  return res;
};

export const viewRecord = async (navigate, id) => {
  navigate(`/record/${id}`);
  return;;
};
export const editRecord = async (navigate, id) => {
  navigate(`/record/edit/${id}`);
  return;;
};

