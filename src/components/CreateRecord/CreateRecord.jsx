import React, { useState } from "react";
import { useSelector } from "react-redux";

const CreateRecord = () => {
  const [sName, setSname] = useState("");
  const [coursename, setCoursename] = useState("");
  const [date, setDate] = useState(Date.now());
  const [subs, setSubs] = useState(0);
  const [examname, setExamname] = useState("");
  const [totalmarks, setTotalmarks] = useState('');
  const [marksobtained, setMarksobtained] = useState('');
  const [studentId, setStudentId] = useState("");
  const [exams, setExams] = useState([]);

  const teacherId = useSelector((state) => state.auth.user._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/records/createrecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentName: sName,
        studentCourse: coursename,
        dateEnrolled: date,
        exams: exams,
        studentId,
        teacherId,
      }),
    });

    //Resetting field values
    setSname("");
    setDate(Date.now());
    setCoursename("");
  };
  //To handle tests details of various tests taken
  const handleExamDetails = () => {
    //Updating Exams array to add new Exam Details
    setSubs((prev) => prev - 1);
    setExams((prev) => [
      { name: examname, mt: totalmarks, mo: marksobtained },
      ...prev,
    ]);
   
    //Resetting Exam Details
    setExamname("");
    setTotalmarks("");
    setMarksobtained("");
  };
  return (
    <>
      <div className="  bg-blue-100">
        <section className="bg-white dark:bg-gray-900 h-[100vh]">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Add a new Record
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* STUDENT NAME */}
                <div className="sm:col-span-2">
                  <label
                    for="name"
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
                    for="brand"
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
                    for="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date Enrolled
                  </label>
                  <input
                    type="date"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required=""
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                {/* STUDENT ID */}
                <div className="sm:col-span-2">
                  <label
                    for="sId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Student Name
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
                {/* NUMBER OF TESTS */}
                <div className="sm:col-span-2">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Number of Tests
                  </label>
                  <input
                    type="number"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                    value={subs}
                    onChange={(e) => {
                      setSubs(e.target.value);
                    }}
                  />
                </div>
                {/* EXAMS DETAILS */}
                {subs >=1 && (
                  <>
                    <div className=" w-full">
                      <label
                        for="examname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Exam Name
                      </label>
                      <input
                        type="text"
                        name="brand"
                        id="examname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Exam name"
                        required={true}
                        value={examname}
                        onChange={(e) => setExamname(e.target.value)}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        for="tmakrs"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Total Marks
                      </label>
                      <input
                        type="number"
                        name="totalmarks"
                        id="tmakrs"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="eg. 78"
                        required=""
                        value={totalmarks}
                        onChange={(e) => setTotalmarks(e.target.value)}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        for="obtmarks"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Marks Obtained
                      </label>
                      <input
                        type="number"
                        name="MarksObtainer"
                        id="obtmakrs"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="eg. 100"
                        required=""
                        value={marksobtained}
                        onChange={(e) => setMarksobtained(e.target.value)}
                      />
                    </div>
                    <div className="w-full">
                      <input
                        type="button"
                        name="MarksObtainer"
                        id="obtmakrs"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  mt-7 "
                        placeholder="eg. 100"
                        required=""
                        value="Add"
                        onClick={handleExamDetails}
                      />
                    </div>
                  </>
                )}
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 bg-blue-400"
              >
                Add Record
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreateRecord;
