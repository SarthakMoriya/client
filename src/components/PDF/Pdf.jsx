import React, { useEffect, useState } from "react";
import { Link,  useParams } from "react-router-dom";

import user from "../../assets/user.png";
import RecordTable from "../Record/RecordTable";
import { gradeCalculator } from "../../utils/gradeCalculator";

const Pdf = () => {
  const [record, setRecord] = useState("");
  const { id } = useParams();
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
  useEffect(() => {
    fetchRecord();
  }, []);


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
      <div className=" min-h-[100vh] ">
        {record?._id && (
          <div className="flex   border-2 ">
            <div className="flex m-2 w-[100%] h-[40vh] border ">
              <div className="image flex p-4 rounded-full text-blue">
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
              <div className="info flex flex-col  justify-center  text-blue">
                <div className="mx-4 my-2 font-normal  text-3xl">
                  Name: {record?.studentName}
                </div>
                <div className="mx-4 my-2 font-normal text-xl capitalize text-blue">
                  Course: {record?.studentCourse}
                </div>
                <div className="mx-4 my-2 font-normal text-xl text-blue">
                  Grade: {gradeCalculator(record?.exams)}
                </div>
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
        {record?.mainExamMT > 0 && (
          <div className="w-full items-center justify-center border mt-7">
            <div className="flex items-center justify-center uppercase">
              <div className="bg-blue text-gray-100 text-center px-2 py-4 w-[30%] border ">
                Main Exam : {record?.mainExamName}
              </div>
              <div className="bg-blue text-gray-100 text-center px-2 py-4 w-[30%] border">
                Marks Obtained : {record?.mainExamMO}
              </div>
              <div className="bg-blue text-gray-100 text-center px-2 py-4 w-[30%] border">
                Marks Total : {record?.mainExamMT}
              </div>
              <div className="bg-blue text-gray-100 text-center px-2 py-4 w-[30%] border">
                Grade :{" "}
                {gradeCalculator([
                  { mt: record?.mainExamMT, mo: record?.mainExamMO },
                ])}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pdf;
