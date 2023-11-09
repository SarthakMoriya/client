import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ExamRow from "./ExamRow";
import ExamModal from "./ExamModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../utils/notification";
import { setRecords } from "../../state/index";
import { getRecords } from "../../api";
import { convertBackToISODateString, convertDateFormat } from "../../utils/dateFormatter";

const Edit = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const record = useSelector((state) => {
    console.log(state.record.records[0]);
    return state?.record?.records?.find((rec) => rec._id === id?.id);
  });

  const [sName, setSname] = useState(record?.studentName);
  const [coursename, setCoursename] = useState(record?.studentCourse);
  const [date, setDate] = useState(record?.dateEnrolled);
  const [studentId, setStudentId] = useState(record?.studentId);
  const [isAddingExam, setIsAddingExam] = useState(false);
  const [examsArr, setExamsArr] = useState([...record?.exams]);
  const [mainExamName, setMainExamName] = useState(record?.mainExamName);
  const [mainExamMT, setMainExamMT] = useState(record?.mainExamMT);
  const [mainExamMO, setMainExamMO] = useState(record?.mainExamMO);
  const teacherId = useSelector((state) => state.auth.user._id);

  const handleUpdateExam = (result) => {
    setExamsArr(result);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:8000/records/updatefullrecord/${id.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: sName,
          studentCourse: coursename,
          dateEnrolled: convertBackToISODateString(date),
          exams: examsArr,
          studentId:Number(studentId),
          teacherId,
          id,
          mainExamName: mainExamName,
          mainExamMT:Number(mainExamMT),
          mainExamMO:Number(mainExamMO),
        }),
      }
    );

    const data = await res.json();
    console.log(data);
    if (data.ok) {
      notify("Record Updated", "success");
      const newRecords = await getRecords();
      dispatch(setRecords({ records: newRecords }));
      setTimeout(() => {
        navigate(`/record/${record?._id}`);
      }, 2000);
    } else {
      notify(data.message);
    }
  };
  //To handle tests details of various tests taken

  return (
    <>
      <div className="  bg-blue-100 h-auto">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <section className="bg-white dark:bg-gray-900 h-auto">
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
                    placeholder="Type Student Name"
                    required="true"
                    value={sName}
                    onChange={(e) => {
                      setSname(e.target.value);
                    }}
                  />
                </div>
                {/* COURSE NAME */}
                <div className="w-full">
                  <label
                    htmlFor="course"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Course name
                  </label>
                  <input
                    type="text"
                    name="course"
                    id="course"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Course Taken"
                    required="true"
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
                    type="text"
                    name="date"
                    id="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="dd-mm-yyyy"
                    required="true"
                    value={convertDateFormat(date)}
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
                    type="text"
                    name="sId"
                    id="sId"
                    inputMode="numeric"
                    style={{
                      MozAppearance: 'textfield',  // For Firefox
                    
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Student Id "
                    required="true"
                    value={studentId}
                    onChange={(e) => {
                      setStudentId(e.target.value);
                    }}
                  />
                </div>
                {/* MAIN EXAM NAME */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="mainExamName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Main Exam Name
                  </label>
                  <input
                    type="text"
                    name="mainExamName"
                    id="mainExamName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Main Exam Name "
                    required=""
                    value={mainExamName}
                    onChange={(e) => {
                      setMainExamName(e.target.value);
                    }}
                  />
                </div>
                {/* Main Exam Marks Total */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="mainExamMT"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Main Exams Marks Total
                  </label>
                  <input
                    type="text"
                    name="mainExamMT"
                    id="mainExamMT"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Total Marks In Main Exam "
                    required=""
                    value={mainExamMT}
                    onChange={(e) => {
                      setMainExamMT(e.target.value);
                    }}
                  />
                </div>
                {/* Main Exam Marks Total */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="mainExamMT"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Main Exams Marks Obtained
                  </label>
                  <input
                    type="text"
                    name="mainExamMO"
                    id="mainExamMO"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Total Marks Obtained In Main Exam "
                    required=""
                    value={mainExamMO}
                    onChange={(e) => {
                      setMainExamMO(e.target.value);
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
                {!isAddingExam ? "Add More Exams" : "Save Exams"}
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
