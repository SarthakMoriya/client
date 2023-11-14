import React, { useState } from "react";
import { motion } from "framer-motion";

const ExamRow = ({ exam, exams, handleUpdateExam }) => {
  const [examName, setExamName] = useState(exam?.name);
  const [totalMarks, setTotalMarks] = useState(exam?.mt);
  const [obtMarks, setObtMarks] = useState(exam?.mo);

  let oldName = exam?.name;
  const handleAddExams = () => {
    let newExams = [];
    exams?.forEach((ex, i) => {
      if (ex.name === oldName) {
        console.log("EXAM UPDATED");
        newExams.push({ name: examName, mt: totalMarks, mo: obtMarks });
      } else {
        newExams.push(ex);
      }
    });
    exams = newExams;
    console.log("EXAMS ARRAY IN EXAMROW COMPONENT:");
    handleUpdateExam(exams);
  };
  return (
    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className=" flex gap-2 my-2"
    >
      <motion.input
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        type="text"
        value={examName}
        onChange={(e) => {
          setExamName(e.target.value);
        }}
        className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
      <motion.input
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        type="number"
        placeholder="total marks"
        value={totalMarks}
        onChange={(e) => {
          setTotalMarks(e.target.value);
        }}
        className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
      <motion.input
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        type="number"
        placeholder="marks obtained"
        value={obtMarks}
        onChange={(e) => {
          setObtMarks(e.target.value);
        }}
        className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
      <motion.button
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="bg-gray-500 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
        onClick={handleAddExams}
      >
        Add
      </motion.button>
    </motion.div>
  );
};

export default ExamRow;
