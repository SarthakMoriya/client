import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { deleteRecord } from "../../api";
import user from "../../assets/user.png";
import RecordTable from "./RecordTable";

const GetRecord = () => {
  const [record, setRecord] = useState("");
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
    console.log(record)
    const data = {
      studentName: record.studentName,
      enrolledAt: record.dateEnrolled,
      teacherName: id,
      grade: "a",
      exams: record.exams,
    };

    await fetch("http://localhost:8000/records/downloadrecord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({data: data}),
    });
    console.log(data)
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  const handleEdit = (id) => {
    navigate("/record/edit/" + id);
  };
  return (
    <div className="bg-gray-900 min-h-[100vh] mt-5">
      {record?._id && (
        <div className="flex   border-2 ">
          <div className="flex m-2 w-[100%] h-[40vh] border ">
            <div className="image flex p-4 rounded-full text-white">
              <img src={record?.imageName ? `http://localhost:8000/assets/${record?.imageName}` : user} alt="" className="rounded-full" />
            </div>
            <div className="info flex flex-col  justify-center  text-white">
              <div className="mx-4 my-2 font-normal  text-3xl">
                Name: {record?.studentName}
              </div>
              <div className="mx-4 my-2 font-normal text-xl capitalize text-white">
                Course: {record?.studentCourse}
              </div>
              <div className="mx-4 my-2 font-normal text-xl text-white">
                Grade: {record?.grade || "Not Graded"}
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
            </div>
          </div>
        </div>
      )}

      <RecordTable
        exams={record?.exams}
        studentName={record?.studentName}
        studentCourseName={record?.studentCourse}
      />
    </div>
  );
};

export default GetRecord;
