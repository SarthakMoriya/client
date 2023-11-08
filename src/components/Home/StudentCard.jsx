import React from "react";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentCard = ({ data, setRecords, records }) => {
  const dispatch = useDispatch();
  const notify = (message, type = "error") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };
  const handleDeleteRecord = async () => {
    await fetch(`http://localhost:8000/records/deleterecord/${data?._id}`, {
      method: "DELETE",
    });
    notify("Record Deleted", "success");
      const newRecords = records?.filter((rec) => rec?._id !== data?._id);
      setRecords(newRecords);
      dispatch(setRecords({records:newRecords}));
  };
  return (
    <div className="flex flex-col w-[45%] shadow-2xl rounded-lg mr-4 mb-4 ml-4  bg-gray-800 px-4 py-6 border border-blue-500 min-h-[50%]">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex m-2">
        <div className="image flex items-center justify-center  w-[50%] border-2 border-blue-400 rounded-md">
          <img
            src={
              data?.imageName
                ? `http://localhost:8000/assets/${data.imageName}`
                : user
            }
            alt="studentImage"
            className="rounded-full"
          />
        </div>
        <div className="info flex flex-col  justify-center text-white ">
          <div className="mx-4 my-2 font-semibold text-md">
            Id: {data?.studentId}
          </div>
          <div className="mx-4 my-2 font-bold text-md capitalize font-sans whitespace-nowrap">
            Name: {data?.studentName}
          </div>
          <div className="mx-4 my-2 font-semibold text-md capitalize whitespace-nowrap">
            Course: {data?.studentCourse}
          </div>
          <div className="mx-4 my-2 font-semibold text-md">
            Date:{" "}
            {new Date(data?.dateEnrolled).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }) || "A"}
          </div>
        </div>
      </div>
      <div className="flex p-2">
        <Link to={`/record/${data?._id}`} className="w-[50%]">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-[95%] rounded-lg  ease-in-out duration-500"
          >
            View
          </button>
        </Link>
        <button
          type="button"
          onClick={handleDeleteRecord}
          className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2  w-[50%]  ease-in-out duration-500 rounded-lg "
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
