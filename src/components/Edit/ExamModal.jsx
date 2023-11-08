import React, { useState } from "react";

const ExamModal = ({ exam, exams, handleUpdateExam }) => {
  const [examName, setExamName] = useState(exam?.name);
  const [totalMarks, setTotalMarks] = useState(exam?.mt);
  const [obtMarks, setObtMarks] = useState(exam?.mo);

  const handleAddNewExam = () => {
    exams.push({ name: examName, mt: totalMarks, mo: obtMarks });
    setExamName("");
    setObtMarks("");
    setTotalMarks("");
    handleUpdateExam(exams);
  };
  return (
    <>
      <div className=" flex gap-2 my-2">
        <input
          type="text"
          value={examName}
          placeholder="Exam Name"
          onChange={(e) => {
            setExamName(e.target.value);
          }}
          className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <input
          type="number"
          value={totalMarks}
          placeholder="Total Marks"
          onChange={(e) => {
            setTotalMarks(e.target.value);
          }}
          className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <input
          type="number"
          value={obtMarks}
          placeholder="Marks Obtained"
          onChange={(e) => {
            setObtMarks(e.target.value);
          }}
          className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <button
          className="bg-gray-500 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
          onClick={handleAddNewExam}
          type="button"
        >
          Add
        </button>
      </div>
    </>
  );
};

export default ExamModal;
