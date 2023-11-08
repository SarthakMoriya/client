import React, { useState } from "react";

const ExamRow = ({ exam, exams,handleUpdateExam }) => {
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
    console.log("EXAMS ARRAY IN EXAMROW COMPONENT:" );
   handleUpdateExam(exams)

  };
  return (
    <>
      <div className=" flex gap-2 my-2">
        <input
          type="text"
          value={examName}
          onChange={(e) => {
            setExamName(e.target.value);
          }}
          className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <input
          type="number"
          placeholder="total marks"
          value={totalMarks}
          onChange={(e) => {
            setTotalMarks(e.target.value);
          }}
          className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <input
          type="number"
          placeholder="marks obtained"
          value={obtMarks}
          onChange={(e) => {
            setObtMarks(e.target.value);
          }}
          className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <button
          className="bg-gray-500 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
          onClick={handleAddExams}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default ExamRow;
