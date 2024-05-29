import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { testGradeCalculator } from "../../utils/gradeCalculator";
const ExamRow = ({ exam, i, studentName, courseName, exams }) => {
  const user = useSelector((state) => state.auth.user);
  
  return (
    <motion.div className="w-full items-center justify-center  ">
      {/* NOT IN EDITING MODE */}
      <motion.div
        className={`flex  ${
          !(i & 1) ? "bg-[#ececec] text-black" : "bg-white text-black"
        }`}
      >
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`text-center sm:p-1 p-[2px] sm:text-base text-xs w-[20%] ${
            user ? "w-[20%]" : "w-[25%]"
          }`}
        >
          {exam?.name}
        </motion.div>
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`text-center sm:p-1 p-[2px] sm:text-base text-xs w-[20%] ${
            user ? "w-[20%]" : "w-[25%]"
          }`}
        >
          {exam?.mo}
        </motion.div>
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`text-center sm:p-1 p-[2px] sm:text-base text-xs w-[20%] ${
            user ? "w-[20%]" : "w-[25%]"
          }`}
        >
          {exam?.mt}
        </motion.div>
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`text-center sm:p-1 p-[2px] sm:text-base text-xs w-[20%] ${
            user ? "w-[20%]" : "w-[25%]"
          }`}
        >
          {testGradeCalculator({ mt: exam?.mt, mo: exam?.mo })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ExamRow;
