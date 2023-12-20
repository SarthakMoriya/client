import React from "react";
import {useSelector} from "react-redux"
import ExamRow from "./ExamRow";
import {
  gradeCalculator,
  percentageCalcuator,
  total_Marks,
  totalMarksObtained,
} from "../../utils/gradeCalculator";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import './style.css'

const RecordTable = ({ exams, studentName, studentCourseName }) => {
  const location = useLocation();
  const user=useSelector(state=>state.auth.user)
  return (
    <motion.div className="w-full items-center justify-center mt-7 border  ">
      <motion.div className="flex items-center ">
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`bg-white text-black text-center sm:p-1 p-[2px] sm:py-4 py-2 whitespace-nowrap ${user?"w-[20%]":"w-[25%]"} border sm:text-base text-xs `}
        >
          Exam
        </motion.div>
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`bg-white text-black text-center sm:p-1 p-[2px] sm:py-4 py-2 whitespace-nowrap ${user?"w-[20%]":"w-[25%]"} border sm:text-base text-xs `}
        >
          Marks Obt
        </motion.div>
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`bg-white text-black text-center sm:p-1 p-[2px] sm:py-4 py-2 whitespace-nowrap ${user?"w-[20%]":"w-[25%]"} border sm:text-base text-xs `}
        >
          Marks Totl
        </motion.div>
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`bg-white text-black text-center sm:p-1 p-[2px] sm:py-4 py-2 whitespace-nowrap ${user?"w-[20%]":"w-[25%]"} border sm:text-base text-xs `}
        >
          Grade
        </motion.div>
        {!location.pathname.includes("pdf") && user!=null &&(
          <motion.div className="bg-white text-black text-center sm:p-1 p-[2px] sm:py-4 py-2 whitespace-nowrap w-[20%] border sm:text-base text-xs ">
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
      <motion.div className="flex lg:items-center  border-2">
        {!location.pathname.includes("pdf") && (
          <motion.div className="record_table_heading">
            No. of Exams: {exams?.length}
          </motion.div>
        )}
        <motion.div className="record_table_heading">
          Marks Obt: {totalMarksObtained(exams)}
        </motion.div>
        <motion.div className="record_table_heading">
          Marks Tol : {total_Marks(exams)}
        </motion.div>
        <motion.div className="record_table_heading">
          Grade: {gradeCalculator(exams)}
        </motion.div>
        <motion.div className="record_table_heading">
          Percentage: {percentageCalcuator(exams)}%
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RecordTable;
