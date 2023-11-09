import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import user from "../../assets/user.png";

const Sidebar = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  const fetchRecords=async()=>{
    const results=await fetch("http://localhost:8000/records/getrecords")
    const res=await results.json();
    setRecords(res);
  }
  useEffect(() => {
    fetchRecords();
  }, []);
  const handleRecordClick = (id) => {
    navigate(`/record/${id}`);
  };
  return (
    <div className="w-[30%] border-2">
      {records?.length > 0 &&
        records?.map((record) => {
          return (
            <div
              className=" flex items-center border"
              key={record?._id}
              onClick={() => {
                handleRecordClick(record?._id);
              }}
            >
              <div className="w-[50%] p-2 rounded-lg flex items-center cursor-pointer">
                <img
                  src={
                    record?.imageName
                      ? `http://localhost:8000/assets/${record?.imageName}`
                      : user
                  }
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div className=" p-2 font-semibold text-white capitalize ml-4">
                  ID:{record?.studentName}
                </div>
              </div>
              <div className="flex items-center w-[50%] p-2">
                <button
                  type="button"
                  onClick={() => {
                    handleRecordClick(record?._id);
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-[95%] rounded-lg  ease-in-out duration-500"
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
        {records?.length===0 && <div className="text-3xl text-center text-white w-full p-2">NO RECORDS </div>}
    </div>
  );
};

export default Sidebar;
