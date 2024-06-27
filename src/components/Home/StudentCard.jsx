import React from "react";
import userfallback from "../../assets/user.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api";
import { formatDateOnCard } from "../../utils/dateFormatter";

const StudentCard = ({ data, setRecords, records }) => {
  const navigate = useNavigate();
  const notify = (message, type = "error") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };
  const handleDeleteRecord = async () => {
    await fetch(`${BASE_URL}/records/deleterecord/${data?._id}`, {
      method: "DELETE",
    });
    notify("Record Deleted", "success");
    const newRecords = records?.filter((rec) => rec?._id !== data?._id);
    setRecords(newRecords);
    // dispatch(setRecords({records:newRecords}));
  };
  const user = useSelector((state) => state.auth.user);

  const handleDownloadCertificate = () => {
    if (data?.certificate === "") {
      alert("No Certificates Found");
    } else {
      window.open(`http://localhost:3000/record/certificate/${data?._id}`);
    }
  };
  return (
    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col w-[100%] md:w-[70%] lg:w-[45%] max-h-[50vh] h-[100%] shadow-2xl rounded-lg mr-4 mb-4 ml-4  bg-white px-4 py-6 border border-blue"
    >
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
      <div className="flex m-2 min-h-[80%] ">
        <div className="image flex items-center justify-center max-w-[50%] max-h-[100%] rounded-md">
          <img
            src={`${data?.imageName}`}
            alt="studentImage"
            className="max-w-[150px] max-h-[150px] object-cover"
          />
        </div>

        <div className="info flex flex-col  justify-center text-blue ">
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
            Date: {formatDateOnCard(data?.dateEnrolled)}
          </div>
        </div>
      </div>
      <div className="flex p-2 lg:flex-row flex-col ">
        <button
          type="button"
          className="text-white bg-secondary hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-2.5 py-2.5 text-center mb-2 sm:mr-2 w-[100%] rounded-lg  ease-in-out duration-500"
          onClick={() => {
            navigate(`/record/${data?._id}`);
          }}
        >
          View
        </button>
        {!user && (
          <button
            type="button"
            onClick={handleDownloadCertificate}
            className="text-white bg-secondary hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-2.5 py-2.5 text-center mb-2 sm:mr-2 w-[100%] rounded-lg  ease-in-out duration-500"
          >
            Download Certificate
          </button>
        )}
        {user && (
          <button
            type="button"
            onClick={handleDeleteRecord}
            className="text-white bg-secondary hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-2.5 py-2.5 text-center mb-2 sm:mr-2 w-[100%] rounded-lg  ease-in-out duration-500"
          >
            Delete
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default StudentCard;
