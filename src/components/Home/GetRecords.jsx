import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import SearchBar from "./SearchBar";
import { BASE_URL } from "../../api";

const GetRecords = () => {
  const [records, setRecords] = useState([]);

  const getRecords = async (searchResults) => {
    if (searchResults.length > 0) {
      setRecords(searchResults);
    } else {
      const data = await fetch(BASE_URL+"/records/getrecords");
      const res = await data.json();
      setRecords(res);
    }
  };
  useEffect(() => {
    getRecords([]);
  }, []);
  return (
    <div className="w-[100%] md:w-[70%] bg-[#e6e6e6]">
      <div className="mb-4 mt-4">
        <SearchBar searchRecords={getRecords} />
      </div>
      <div className="flex flex-wrap md:justify-center justify-normal">
        {records.length === 0 && (
          <div className="text-3xl text-center text-white w-full">
            NO RECORDS{" "}
          </div>
        )}
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
      </div>
    </div>
  );
};

export default GetRecords;
