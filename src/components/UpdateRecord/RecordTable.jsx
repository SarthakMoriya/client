import React from "react";
import ExamRow from "./ExamRow";

const RecordTable = ({ exams, studentName,studentCourseName}) => {
  console.log(exams)
  return (
    <div className="w-full items-center justify-center border mt-7">
      <div className="flex items-center uppercase">
        <div className="bg-gray-900 text-gray-100 text-center p-1 w-[20%] border ">
          Exam
        </div>
        <div className="bg-gray-900 text-gray-100 text-center p-1 w-[20%] border">
          Marks Obtained
        </div>
        <div className="bg-gray-900 text-gray-100 text-center p-1 w-[20%] border">
          Marks Total
        </div>
        <div className="bg-gray-900 text-gray-100 text-center p-1 w-[20%] border ">
          Grade
        </div>
        <div className="bg-gray-900 text-gray-100 text-center p-1 border w-[20%]">
          Modify
        </div>
      </div>
      {exams?.map((exam, i) => (
        <>{i >= 0 && <ExamRow key={exam?.name} exam={exam} i={i} studentName={studentName} courseName={studentCourseName} exams={exams}/>}</>
      ))}
      <div className="flex items-center uppercase">
        <div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4 ">
          No. of Exams: {exams?.length - 1}
        </div>
        <div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4">
          Total Marks Obtained: {}
        </div>
        <div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4">
          Total Marks: {}
        </div>
        <div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4 ">
          Grade: {"A"}
        </div>
      </div>
    </div>
  );
};

export default RecordTable;
