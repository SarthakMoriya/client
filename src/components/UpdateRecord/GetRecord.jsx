import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteRecord } from "../../api";
import userfallback from "../../assets/user.png";
import RecordTable from "./RecordTable";
import {
  gradeCalculator,
  overallGrade,
  overallPercentage,
} from "../../utils/gradeCalculator";
import { notify } from "../../utils/notification";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import BarChart from "../Charts/BarChart";
import PerformanceChart from "../Charts/PerformanceChart";
import GrowthChart from "../Charts/GrowthChart";

const GetRecord = () => {
  const [record, setRecord] = useState("");
  const [certificate, setCertificate] = useState("");
  const [isUpdatingCertificate, setIsUpdatingCertificate] = useState(false);
  const [error, setError] = useState("");
  const user = useSelector((state) => state?.auth?.user);
  const { id } = useParams();
  const navigate = useNavigate();

  //Function to fetch particular Record as per Id in URL
  const fetchRecord = async () => {
    try {
      const res = await fetch(`http://localhost:8000/records/getrecord/${id}`);
      if (res.ok) {
        const { data } = await res.json();
        setRecord(data); //Sets the complete record data to state --> record
      } else {
        setError(res);
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const uplodaData = async () => {
    const data = {
      studentName: record.studentName,
      enrolledAt: record.dateEnrolled,
      teacherName: id,
      grade: "a",
      exams: record.exams,
      id,
    };

    await fetch("http://localhost:8000/records/downloadrecord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: data }),
    });
    notify("Downloading Record in 5 seconds", "success");
    setTimeout(() => {
      window.open(`http://localhost:8000/pdfs/${id}.png`);
    }, 5000);
  };

  const handleCertificate = async () => {
    if (certificate) {
      await fetch(`http://localhost:8000/records/certificate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, certificate: certificate.name }),
      });

      //
      const imageForm = new FormData();
      imageForm.append("image", certificate);

      try {
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: imageForm,
        });

        if (response.ok) {
          console.log("Image uploaded successfully");
          notify("Certificate uploaded successfully", "success");
          setIsUpdatingCertificate(false);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          console.error("Error uploading image");
        }
      } catch (error) {
        console.error("Error uploading image", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  const handleCertificateDownload = () => {
    notify("Downloading Certificate ", "success");
    setTimeout(() => {
      window.open(`http://localhost:3000/record/certificate/${id}`);
    }, 5000);
  };

  const handleUpdateCertificate = () => {
    setIsUpdatingCertificate(true);
  };
  const handleDownloadRecord = () => {
    notify("Redirecting to download Page", "success");
    setTimeout(() => {
      window.open(`http://localhost:8000/pdfs/${id}.png`);
    }, 5000);
  };
  useEffect(() => {
    fetchRecord();
  }, []);

  const handleEdit = (id) => {
    navigate("/record/edit/" + id);
  };

  const averageData = {
    category: "Average Percentage",
    value: 80,
  };

  const individualData = {
    category: "Your Percentage",
    value: 75,
  };

  return (
    <>
      {error && (
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-screen flex items-center justify-center text-5xl font-extrabold text-center bg-gray-100"
        >
          NO RESULT FOUND WITH ID {id}
        </motion.div>
      )}
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-white text-black min-h-[100vh] mt-5"
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
        {record?._id && (
          <motion.div className="flex  ">
            <motion.div className="flex m-2 w-[100%] h-[40vh]  ">
              {/* STUDENT IMAGE */}
              <motion.div className="image flex p-4  text-white w-[30%]">
                <img
                  src={
                    record?.imageName
                      ? `http://localhost:8000/assets/${record?.imageName}`
                      : userfallback
                  }
                  alt=""
                  className="w-full rounded-lg -2 "
                />
              </motion.div>
              <div className=" flex flex-col w-[70%] ">
                {/* STUDENT DETAILS */}
                <motion.div className="info flex flex-col  justify-center  text-black">
                  <motion.div className="mx-4 my-2 font-normal  text-3xl">
                    Name: {record?.studentName}
                  </motion.div>
                  <motion.div className="mx-4 my-2 font-normal text-xl capitalize ">
                    Course: {record?.studentCourse}
                  </motion.div>
                  <motion.div className="mx-4 my-2 font-normal text-xl ">
                    Grade:{" "}
                    {isNaN(overallGrade(record))
                      ? overallGrade(record)
                      : "Not Graded"}
                  </motion.div>
                  <motion.div className="mx-4 my-2 font-normal text-xl ">
                    Percentage:{" "}
                    {isNaN(overallPercentage(record))
                      ? "Not Graded"
                      : Math.floor(overallPercentage(record)) + "%"}
                  </motion.div>
                </motion.div>
                {/* BUTTONS TO DELETE VIEW ... */}
                <motion.div className="text-white  mt-2 ">
                  {user && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          handleEdit(record?._id);
                        }}
                        className="w-[20%] text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteRecord(record?._id, navigate);
                        }}
                        className="w-[20%] text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {user && (
                    <button
                      type="button"
                      onClick={uplodaData}
                      className="w-[20%] text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
                    >
                      Upload Data
                    </button>
                  )}
                  {!user && (
                    <button
                      type="button"
                      onClick={handleDownloadRecord}
                      className="w-[20%] text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
                    >
                      Download Record
                    </button>
                  )}

                  {user && record?.certificate === "" ? (
                    <>
                      <input
                        type="file"
                        onChange={(e) => {
                          setCertificate(e.target.files[0]);
                          console.log(certificate);
                        }}
                        className="w-[20%] text-white mx-2 bg-secondary hover:bg-blue0 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
                      />
                      <button
                        type="button"
                        onClick={handleCertificate}
                        className="w-[20%] text-white mx-2 bg-secondary hover:bg-blue focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
                      >
                        Upload Certificate
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleCertificateDownload}
                      className="w-[20%] text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg  "
                    >
                      View Certificate
                    </button>
                  )}
                  {user && record?.certificate !== "" && (
                    <button
                      onClick={handleUpdateCertificate}
                      className="w-[20%] text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg  "
                    >
                      Update Certificate
                    </button>
                  )}
                  {isUpdatingCertificate && (
                    <>
                      <input
                        type="file"
                        onChange={(e) => {
                          setCertificate(e.target.files[0]);
                          console.log(certificate);
                        }}
                        className="w-[20%] text-white mx-2 bg-secondary hover:bg-blue0 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
                      />
                      <button
                        type="button"
                        onClick={handleCertificate}
                        className="w-[20%] text-white mx-2 bg-secondary hover:bg-blue focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
                      >
                        Upload Certificate
                      </button>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
        {record?.exams?.length && (
          <RecordTable
            exams={record?.exams}
            studentName={record?.studentName}
            studentCourseName={record?.studentCourse}
          />
        )}
        {!record?.exams?.length && (
          <p className="text-center text-white text-3xl font-bold my-4  p-4">
            {" "}
            No Tests Found Please Add using Edit button
          </p>
        )}
        {/* MAIN EXAM DETAILS */}
        {record?.mainExamMT > 0 && (
          <motion.div
            whileInView={{ scale: [0, 1], opacity: [0, 1] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full items-center justify-center  "
          >
            <motion.div className="flex items-center justify-center uppercase text-black border-b-4 border-l-4 border-r-4">
              <motion.div className="bg-blue-900  text-center px-2 py-4 w-[30%]  ">
                Main Exam : {record?.mainExamName}
              </motion.div>
              <motion.div className="bg-blue-900  text-center px-2 py-4 w-[30%] ">
                Marks Obtained : {record?.mainExamMO}
              </motion.div>
              <motion.div className="bg-blue-900  text-center px-2 py-4 w-[30%] ">
                Marks Total : {record?.mainExamMT}
              </motion.div>
              <motion.div className="bg-blue-900  text-center px-2 py-4 w-[30%] ">
                Grade :{" "}
                {gradeCalculator([
                  { mt: record?.mainExamMT, mo: record?.mainExamMO },
                ])}
              </motion.div>
              <motion.div className="bg-blue-900  text-center px-2 py-4 w-[30%] ">
                Percentage :
                {Math.floor((record?.mainExamMO / record.mainExamMT) * 100)}%
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        {!record?.mainExamMT > 0 && (
          <p className="text-center text-white text-3xl font-bold my-4  p-4">
            No Main Exam Found Please Add using Edit button
          </p>
        )}
        <div className="flex flex-wrap gap-5">
          {console.log(record.exams)}
          <BarChart data={record?.exams} />
          <PerformanceChart
            averageData={averageData}
            individualData={individualData}
          />
          <GrowthChart examData={record?.exams} />
        </div>
      </motion.div>
    </>
  );
};

export default GetRecord;
