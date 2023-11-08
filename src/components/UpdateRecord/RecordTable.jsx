import React from "react";
import ExamRow from "./ExamRow";
import {
  gradeCalculator,
  percentageCalcuator,
  totalMarks,
  totalMarksObtained,
} from "../../utils/gradeCalculator";
import { useLocation } from "react-router-dom";

const RecordTable = ({ exams, studentName, studentCourseName }) => {
  const location = useLocation();
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
        {!location.pathname.includes("pdf") && (
          <div className="bg-gray-900 text-gray-100 text-center p-1 border w-[20%]">
            Modify
          </div>
        )}
      </div>
      {exams?.map((exam, i) => (
        <>
          {i >= 0 && (
            <ExamRow
              key={exam?.name}
              exam={exam}
              i={i}
              studentName={studentName}
              courseName={studentCourseName}
              exams={exams}
            />
          )}
        </>
      ))}
      <div className="flex items-center uppercase">
        {!location.pathname.includes("pdf") && (
          <div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4 ">
            No. of Exams: {exams?.length}
          </div>
        )}
        <div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4">
          Marks Obtained: {totalMarksObtained(exams)}
        </div>
        <div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4">
          Total Marks : {totalMarks(exams)}
        </div>
        <div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4 ">
          Grade: {gradeCalculator(exams)}
        </div>
        <div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4 ">
          Percentage: {percentageCalcuator(exams)}%
        </div>
      </div>
    </div>
  );
};

export default RecordTable;
