import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import SearchBar from "./SearchBar";
import { BASE_URL } from "../../api";
import { setRecords } from "../../state";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StudentCardSkeleton from "./StudentCardSkeleton";

let skeletons = [0, 1, 2, 3];

const GetRecords = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [skeletons, setSkeletons] = useState(true);

  const getRecords = async (searchResults) => {
    if (searchResults.length > 0) {
      setData(searchResults);
      setSkeletons(false);
    } else {
      const data = await fetch(BASE_URL + "/records/getrecords");
      const res = await data.json();
      console.log("-----------------");
      console.log(res);
      if (res.length > 0) {
        setSkeletons(false);
        dispatch(setRecords({ records: res }));
        setData(res);
      } else {
        setSkeletons(false);
      }
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
      <div className="flex items-center justify-normal flex-wrap mx-12 ">
        {skeletons && (
          <>
            <StudentCardSkeleton />
            <StudentCardSkeleton />
            <StudentCardSkeleton />
            <StudentCardSkeleton />
          </>
        )}
      </div>
    </div>
  );
};

export default GetRecords;
