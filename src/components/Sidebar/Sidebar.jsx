import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import user from "../../assets/user.png";


const Sidebar = () => {
  const navigate = useNavigate();
  const { records } = useSelector((state) => state.record);
  const handleRecordClick = (id) => {
    navigate(`/record/${id}`);
  };
  return (
    <div className="w-[30%] border-2">
      {records?.map((record) => {
        return (
          <div
            className=" flex items-center border"
            key={record?._id}
            onClick={() => {
              handleRecordClick(record?._id);
            }}
          >
            <div className="w-[50%] p-2 rounded-lg flex items-center cursor-pointer">
              <img src={user} alt="" className="w-10 h-10 rounded-full" />
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
    </div>
  );
};

export default Sidebar;
