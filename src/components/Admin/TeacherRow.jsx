import React from "react";
import pic from "../../assets/user.png";
import { useSelector } from "react-redux";
const TeacherRow = ({ acc }) => {
  const { token } = useSelector((state) => state.auth);
  const handleApprove = async () => {
    await fetch(`http://localhost:8000/auth/admin/approveaccounts/${acc._id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.reload();
  };
  const handleDelete = async ({ acc }) => {
    await fetch(
      `http://localhost:8000/auth/admin/deleteunapproveaccount/${acc._id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.reload();
  };
  return (
    <div className=" flex items-center border bg-white">
      <div className="w-[50%] p-2 rounded-lg flex items-center cursor-pointer">
        <img
          src={acc.picturePath}
          className="w-10 h-10 rounded-full"
          alt="pic"
        />
        <div className=" p-2 font-semibold text-blue capitalize ml-4">
          Name:{acc?.username}
        </div>
        <div className=" p-2 font-semibold text-blue  ml-4">
          email:{acc?.email}
        </div>
      </div>
      <div className="flex items-center w-[50%] p-2">
        <button
          type="button"
          onClick={handleApprove}
          className="text-white bg-blue hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium w-48  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2  rounded-lg  ease-in-out duration-500"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="text-white bg-secondary hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium w-48 text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2  rounded-lg  ease-in-out duration-500"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default TeacherRow;
