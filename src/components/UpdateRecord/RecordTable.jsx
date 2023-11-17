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
    <motion.div className="w-full items-center justify-center mt-7 border-4  ">
      <motion.div className="flex items-center uppercase">
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white text-black text-center p-1 py-4 w-[20%]  "
        >
          Exam
        </motion.div>
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white text-black text-center p-1 py-4 w-[20%] "
        >
          Marks Obtained
        </motion.div>
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white text-black text-center p-1 py-4 w-[20%] "
        >
          Marks Total
        </motion.div>
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white text-black text-center p-1 py-4 w-[20%]  "
        >
          Grade
        </motion.div>
        {!location.pathname.includes("pdf") && (
          <motion.div className="bg-white text-black text-center p-1 py-4  w-[20%]">
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
          <motion.div className="bg-white text-black text-center p-1 w-[25%]  py-4 ">
            No. of Exams: {exams?.length}
          </motion.div>
        )}
        <motion.div className="bg-white text-black text-center p-1 w-[25%]  py-4">
          Marks Obtained: {totalMarksObtained(exams)}
        </motion.div>
        <motion.div className="bg-white text-black text-center p-1 w-[25%]  py-4">
          Total Marks : {total_Marks(exams)}
        </motion.div>
        <motion.div className="bg-white text-black text-center p-1 w-[25%]  py-4 ">
          Grade: {gradeCalculator(exams)}
        </motion.div>
        <motion.div className="bg-white text-black text-center p-1 w-[25%]  py-4 ">
          Percentage: {percentageCalcuator(exams)}%
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RecordTable;
