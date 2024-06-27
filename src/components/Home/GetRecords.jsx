import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import SearchBar from "./SearchBar";
import { BASE_URL } from "../../api";
import { setRecords } from "../../state";

const GetRecords = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const getRecords = async (searchResults) => {
    if (searchResults.length > 0) {
      setData(searchResults);
    } else {
      const data = await fetch(BASE_URL + "/records/getrecords");
      const res = await data.json();
      dispatch(setRecords({ records: res }));
      setData(res);
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
        {data.length === 0 && (
          <div className="text-3xl text-center text-white w-full">
            NO RECORDS{" "}
          </div>
        )}
        {data?.length > 0 &&
          data?.map((rec) => {
            return (
              <StudentCard
                key={rec?._id}
                data={rec}
                setRecords={setData}
                records={data}
              />
            );
          })}
      </div>
    </div>
  );
};

export default GetRecords;
