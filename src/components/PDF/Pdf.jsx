import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { deleteRecord } from "../../api";
import user from "../../assets/user.png";
import RecordTable from "../UpdateRecord/RecordTable";
import { gradeCalculator } from "../../utils/gradeCalculator";

const Pdf = () => {
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
    console.log(record);
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
      body: JSON.stringify({ data: data }),
    });
    console.log(data);
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  const handleEdit = (id) => {
    navigate("/record/edit/" + id);
  };
  return (
    <div className="absolute w-screen top-[0px]">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b-4 border-b-blue-900  w-full z-10">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="WebCooks"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              WebCooks
            </span>
          </Link>
        </div>
      </nav>
      <div className="bg-gray-900 min-h-[100vh] ">
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
    </div>
  );
};

export default Pdf;
