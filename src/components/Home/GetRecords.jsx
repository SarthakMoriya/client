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
      const res = await data.json();
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
        {records?.map((rec) => {
          return (
            <>
              <StudentCard key={rec?._id} data={rec} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default GetRecords;
