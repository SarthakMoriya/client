import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import SearchBar from "./SearchBar";

const GetRecords = () => {
  const [records, setRecords] = useState([]);

  const getRecords = async (searchResults) => {
    if (searchResults.length > 0) {
      setRecords(searchResults);
    } else {
      const data = await fetch("http://localhost:8000/records/getrecords");
      const res = await data.json()
      setRecords(res);
    }
  };
  useEffect(() => {
    getRecords([]);
  }, []);
  return (
    <div className="w-[70%]">
      <h1>All Records</h1>
      <div className="mb-4">
        <SearchBar searchRecords={getRecords} />
      </div>
      <div className="flex  flex-wrap">
        {records?.length > 0 &&
          records?.map((rec) => {
            return (
              <>
                <StudentCard
                  key={rec?._id}
                  data={rec}
                  setRecords={setRecords}
                  records={records}
                />
              </>
            );
          })}
          {records.length===0 && <div className="text-3xl text-center text-white w-full">NO RECORDS </div>}
      </div>
    </div>
  );
};

export default GetRecords;
