import React from "react";
import { useNavigate } from "react-router-dom";

const Student = ({ student }) => {
  const navigate = useNavigate();
  const handleRecordClick = () => {
    navigate(`/record/${student._id}`);
  };
  return (
    <div
      className=" flex items-center border"
      onClick={() => {
        handleRecordClick(student?._id);
      }}
    >
      <div className="w-[50%] p-2 rounded-lg flex items-center cursor-pointer">
        <img
          src={
            student?.imageName
              ? `http://localhost:8000/assets/${student?.imageName}`
              : ""
          }
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div className=" p-2 font-semibold text-white capitalize ml-4">
          ID:{student?.studentId}
        </div>
        <div className=" p-2 font-semibold text-white capitalize ml-4">
          Name:{student?.studentName}
        </div>
      </div>
      <div className="flex items-center w-[50%] p-2">
        <button
          type="button"
          onClick={() => {
            handleRecordClick(student?._id);
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-[95%] rounded-lg  ease-in-out duration-500"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default Student;