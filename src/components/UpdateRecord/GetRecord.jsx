import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteRecord } from "../../api";
import user from "../../assets/user.png";
import RecordTable from "./RecordTable";
import {
  gradeCalculator,
  overallPercentage,
} from "../../utils/gradeCalculator";

const GetRecord = () => {
  const [record, setRecord] = useState("");
  const [certificate, setCertificate] = useState("");
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
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDownload = async () => {
    console.log(record);
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
    setTimeout(() => {
      window.open(`http://localhost:8000/pdfs/${id}.png`);
    }, 2000);
  };
  const notify = (message, type = "error") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
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
          // notify("Image uploaded successfully","success")
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
    notify("Downloading Certificate ","success");
    setTimeout(() => {
      window.open(`http://localhost:3000/record/certificate/${id}`);
    }, 5000);
  };
  useEffect(() => {
    fetchRecord();
  }, []);

  const handleEdit = (id) => {
    navigate("/record/edit/" + id);
  };
  return (
    <div className="bg-gray-900 min-h-[100vh] mt-5">
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
        <div className="flex   border-2 ">
          <div className="flex m-2 w-[100%] h-[40vh] border ">
            <div className="image flex p-4 rounded-full text-white">
              <img
                src={
                  record?.imageName
                    ? `http://localhost:8000/assets/${record?.imageName}`
                    : user
                }
                alt=""
                className="rounded-full"
              />
            </div>
            <div className="info flex flex-col  justify-center  text-white">
              <div className="mx-4 my-2 font-normal  text-3xl">
                Name: {record?.studentName}
              </div>
              <div className="mx-4 my-2 font-normal text-xl capitalize text-white">
                Course: {record?.studentCourse}
              </div>
              <div className="mx-4 my-2 font-normal text-xl text-white">
                Grade: {gradeCalculator(record?.exams)}
              </div>
              <div className="mx-4 my-2 font-normal text-xl text-white">
                Overall Percentage: {overallPercentage(record)}
              </div>
            </div>
            <div className="text-white  mt-2">
              <button
                type="button"
                onClick={() => {
                  handleEdit(record?._id);
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2  rounded-lg  ease-in-out duration-500"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteRecord(record?._id);
                }}
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
              >
                Delete
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="text-white mx-2 bg-blue-800 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
              >
                Download
              </button>
              {record?.certificate === "" ? (
                <>
                  <input
                    type="file"
                    onClick={(e) => {
                      setCertificate(e.target.files[0]);
                    }}
                    className="text-white mx-2 bg-blue-800 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
                  />
                  <button
                    type="button"
                    onClick={handleCertificate}
                    className="text-white mx-2 bg-blue-800 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
                  >
                    Upload Certificate
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCertificateDownload}
                  className="text-white mx-2 bg-blue-800 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
                >
                  View Certificate
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {record?.exams?.length && (
        <RecordTable
          exams={record?.exams}
          studentName={record?.studentName}
          studentCourseName={record?.studentCourse}
        />
      )}
      {!record?.exams?.length && (
        <p className="text-center text-white text-3xl font-bold">
          {" "}
          No Exams Found Please Add using Edit button
        </p>
      )}
      {/* MAIN EXAM DETAILS */}
      {record?.mainExamMT > 0 && (
        <div className="w-full items-center justify-center border mt-7">
          <div className="flex items-center justify-center uppercase">
            <div className="bg-blue-900 text-gray-100 text-center px-2 py-4 w-[30%] border ">
              Main Exam : {record?.mainExamName}
            </div>
            <div className="bg-blue-900 text-gray-100 text-center px-2 py-4 w-[30%] border">
              Marks Obtained : {record?.mainExamMO}
            </div>
            <div className="bg-blue-900 text-gray-100 text-center px-2 py-4 w-[30%] border">
              Marks Total : {record?.mainExamMT}
            </div>
            <div className="bg-blue-900 text-gray-100 text-center px-2 py-4 w-[30%] border">
              Grade :{" "}
              {gradeCalculator([
                { mt: record?.mainExamMT, mo: record?.mainExamMO },
              ])}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetRecord;
