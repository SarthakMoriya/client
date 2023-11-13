import React from "react";
import pic from "../../assets/user.png";
const TeacherRow = ({ acc }) => {
  const handleApprove = async () => {
    await fetch(`http://localhost:8000/auth/admin/approveaccounts/${acc._id}`);
    window.location.reload();
  };
  const handleDelete = async ({acc}) => {
    await fetch(`http://localhost:8000/auth/admin/deleteunapproveaccount/${acc._id}`);
    window.location.reload();
  };
  return (
    <div className=" flex items-center border">
      <div className="w-[50%] p-2 rounded-lg flex items-center cursor-pointer">
        <img
          src={
            acc.picturePath
              ? `http://localhost:8000/assets/${acc?.picturePath}`
              : pic
          }
          className="w-10 h-10 rounded-full"
          alt="pic"
        />
        <div className=" p-2 font-semibold text-white capitalize ml-4">
          Name:{acc?.username}
        </div>
        <div className=" p-2 font-semibold text-white capitalize ml-4">
          Email:{acc?.email}
        </div>
      </div>
      <div className="flex items-center w-[50%] p-2">
        <button
          type="button"
          onClick={handleApprove}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-[95%] rounded-lg  ease-in-out duration-500"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-[95%] rounded-lg  ease-in-out duration-500"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default TeacherRow;
