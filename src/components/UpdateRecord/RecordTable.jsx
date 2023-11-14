import React from "react";
import ExamRow from "./ExamRow";
import {
  gradeCalculator,
  percentageCalcuator,
  total_Marks,
  totalMarksObtained,
} from "../../utils/gradeCalculator";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const RecordTable = ({ exams, studentName, studentCourseName }) => {
  const location = useLocation();
  return (
    <motion.div className="w-full items-center justify-center border mt-7">
      <motion.div className="flex items-center uppercase">
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-gray-900 text-gray-100 text-center p-1 w-[20%] border "
        >
          Exam
        </motion.div>
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-gray-900 text-gray-100 text-center p-1 w-[20%] border"
        >
          Marks Obtained
        </motion.div>
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-gray-900 text-gray-100 text-center p-1 w-[20%] border"
        >
          Marks Total
        </motion.div>
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-gray-900 text-gray-100 text-center p-1 w-[20%] border "
        >
          Grade
        </motion.div>
        {!location.pathname.includes("pdf") && (
          <motion.div className="bg-gray-900 text-gray-100 text-center p-1 border w-[20%]">
            Modify
          </motion.div>
        )}
      </motion.div>
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
      <motion.div className="flex items-center uppercase">
        {!location.pathname.includes("pdf") && (
          <motion.div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4 ">
            No. of Exams: {exams?.length}
          </motion.div>
        )}
        <motion.div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4">
          Marks Obtained: {totalMarksObtained(exams)}
        </motion.div>
        <motion.div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4">
          Total Marks : {total_Marks(exams)}
        </motion.div>
        <motion.div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4 ">
          Grade: {gradeCalculator(exams)}
        </motion.div>
        <motion.div className="bg-blue-400 text-gray-100 text-center p-1 w-[25%] border py-4 ">
          Percentage: {percentageCalcuator(exams)}%
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RecordTable;
