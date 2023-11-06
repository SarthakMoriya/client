import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ExamRow from "./ExamRow";
import ExamModal from "./ExamModal";

const Edit = () => {
  const id = useParams();
  const record = useSelector((state) => {
    return state.record.records.find((rec) => rec._id === id.id);
  });
  const [sName, setSname] = useState(record?.studentName);
  const [coursename, setCoursename] = useState(record?.studentCourse);
  const [date, setDate] = useState(record?.dateEnrolled);
  const [studentId, setStudentId] = useState(record?.studentId);
  const [isAddingExam, setIsAddingExam] = useState(false);
  const [examsArr, setExamsArr] = useState([...record?.exams]);


  const teacherId = useSelector((state) => state.auth.user._id);

  const handleUpdateExam = (result) => {

    setExamsArr(result);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8000/records/updatefullrecord/${id.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentName: sName,
        studentCourse: coursename,
        dateEnrolled: date,
        exams: examsArr,
        studentId,
        teacherId,
        id
      }),
    });

    //Resetting field values
    // setSname("");
    // setDate(Date.now());
    // setCoursename("");
  };
  //To handle tests details of various tests taken

  return (
    <>
      <div className="  bg-blue-100">
        <section className="bg-white dark:bg-gray-900 h-[100vh]">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Edit record of studentId: {record.studentId}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* STUDENT NAME */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Student Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                    value={sName}
                    onChange={(e) => {
                      setSname(e.target.value);
                    }}
                  />
                </div>
                {/* COURSE NAME */}
                <div className="w-full">
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Course name
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Product brand"
                    required={true}
                    value={coursename}
                    onChange={(e) => setCoursename(e.target.value)}
                  />
                </div>
                {/* DATE ENROLLED */}
                <div className="w-full">
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date Enrolled
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="dd-mm-yyyy"
                    required=""
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                {/* STUDENT ID */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="sId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Student Id
                  </label>
                  <input
                    type="number"
                    name="sId"
                    id="sId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Student Id "
                    required=""
                    value={studentId}
                    onChange={(e) => {
                      setStudentId(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/*EXAMS TAKEN */}
              <h2 className="my-4 text-xl font-bold text-gray-900 dark:text-white">
                Exams Taken:
              </h2>
              {examsArr?.map((exam, i) => (
                <ExamRow
                  key={i}
                  exam={exam}
                  exams={examsArr}
                  handleUpdateExam={handleUpdateExam}
                />
              ))}
              {/* ADD MORE EXAM */}
              <button
                onClick={() => {
                  setIsAddingExam(!isAddingExam);
                }}
                type="button"
                className="bg-gray-500 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
              >
                {!isAddingExam?"Add More Exams":"save exams"}
              </button>
              {/* ADD EXAM MODAL */}
              {isAddingExam && (
                <ExamModal
                  exams={examsArr}
                  handleUpdateExam={handleUpdateExam}
                />
              )}
              {/* SAVE RECORD */}
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 bg-blue-400"
              >
                Save Record
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Edit;
