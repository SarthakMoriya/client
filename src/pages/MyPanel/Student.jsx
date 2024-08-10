import React from "react";
import { useNavigate } from "react-router-dom";
import viewicon from "../../assets/viewicon.png";
import editicon from "../../assets/edit.png";
import deleteicon from "../../assets/delete.png";
import { deleteRecord } from "../../api";

const Student = ({ student }) => {
  const navigate = useNavigate();
  return (
    <div className=" flex items-center border justify-between">
      <div className="sm:w-[50%] p-2 rounded-lg flex items-center cursor-pointer">
        <img
          src={student?.imageName}
          alt="stdImg"
          className="w-10 h-10 rounded-full"
        />
        <div className="p-2  font-semibold text-blue  ml-4">
          ID:{student?.studentId}
        </div>
        <div className="p-2 font-semibold text-blue  ml-4">
          Name:{student?.studentName}
        </div>
      </div>
      <div className="hidden sm:flex items-center sm:w-[42%] p-2">
        <button
          type="button"
          onClick={() => {
            navigate(`/record/${student?._id}`);
          }}
          className="text-white bg-secondary focus:outline-none focus:ring-4 focus:ring-blue font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-[95%] rounded-lg  ease-in-out duration-500"
        >
          View
        </button>
        <button
          type="button"
          onClick={() => {
            navigate(`/record/edit/${student?._id}`);
          }}
          className="text-white bg-blue focus:outline-none focus:ring-4 focus:ring-blue font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-[95%] rounded-lg  ease-in-out duration-500"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => {
            deleteRecord(student?._id, navigate);
          }}
          className="text-white bg-secondary focus:outline-none focus:ring-4 focus:ring-blue font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-[95%] rounded-lg  ease-in-out duration-500"
        >
          Delete
        </button>
      </div>
      {/* MOBILE BUTTONS */}
      <div className="sm:hidden flex items-center sm:w-[42%] p-2 ">
        <img
          type="button"
          onClick={() => {
            navigate(`/record/${student?._id}`);
          }}
          className="w-6 h-6 mx-1"
          alt="view"
          src={viewicon}
        />
        <img
          type="button"
          onClick={() => {
            navigate(`/record/edit/${student?._id}`);
          }}
          className="w-6 h-6 mx-1"
          src={editicon}
          alt="edit"
        />
        <img
          type="button"
          onClick={() => {
            deleteRecord(student?._id, navigate);
          }}
          className="w-6 h-6 mx-1"
          src={deleteicon}
          alt="delete"
        />
      </div>
    </div>
  );
};

export default Student;
