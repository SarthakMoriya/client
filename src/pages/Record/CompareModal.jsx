import React, { useEffect, useState } from "react";
import { fetchSimilarCourseRecord } from "../../utils/fetchRecords";
import { useNavigate } from "react-router-dom";

const CompareModal = ({ name, id }) => {
    const navigate=useNavigate();
    const [records, setRecords] = useState([]);
  const fetchRecords = async () => {
    let { data: records } = await fetchSimilarCourseRecord(name);
    if (records.length <= 1) {
      alert("No records found with same course");
      return;
    }

    records = records.filter((rec) => rec._id !== id);
    setRecords(records);
  };
  useEffect(() => {
    fetchRecords();
  }, []);
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm  text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              NAME
            </th>
            <th scope="col" class="px-6 py-3">
              COMPARE
            </th>
          </tr>
        </thead>
        <tbody>
          {records.length &&
            records?.map((rec) => (
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {rec.studentName}
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <button
                    className="border rounded-lg py-2 px-3 hover:bg-white hover:text-black"
                    onClick={() => {
                      navigate(`/record/compare/${id}/${rec._id}`);
                    }}
                  >
                    Compare
                  </button>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareModal;
