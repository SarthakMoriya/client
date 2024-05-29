import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import { testGradeCalculator } from "../../utils/gradeCalculator";
import edit_icon from "../../assets/edit.png";
import delete_icon from "../../assets/delete.png";
import { BASE_URL, getRecords } from "../../api";
import { setRecords } from "../../state";
const ExamRow = ({ exam, i, studentName, courseName, exams }) => {
  const [edit, setEdit] = useState(false);
  const [modifiedExam, setModifiedExam] = useState("");
  const [examName, setExamName] = useState("");
  const [marksTotal, setMarksTotal] = useState("");
  const [marksObt, setMarksObt] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const id = useParams();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleEdit = (examId) => {
    // exam id is name of Exam
    setEdit(examId);
  };

  //HANDLING EDIT EXAM
  const handleSaveExam = async () => {
    if (examName === "" || marksTotal === "" || marksObt === "") {
      alert("Please enter all fields");
      return;
    }
    setModifiedExam({
      name: examName,
      totalMarks: marksTotal,
      obtMarks: marksObt,
      oldExam: edit, //name of exam that was edited
    });
    await fetch(`${BASE_URL}/records/updaterecord`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        studentName,
        courseName: courseName,
        exams,
        oldExam: edit,
        modifiedExam: { name: examName, mt: marksTotal, mo: marksObt },
      }),
    });
    setEdit(false);
    window.location.reload();
  };

  // HANDLING DELETE EXAM
  const handleDeleteExam = async () => {
    const examToBeDeleted = exam?.name;
    await fetch(`${BASE_URL}/records/deleterecordexam`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        exams,
        examToBeDeleted,
      }),
    });

    const newRecords = await getRecords();
    console.log(newRecords);
    dispatch(setRecords({ records: newRecords }));
    setIsDeleted(exam?.name);
  };

  const handleCancelExam = () => {
    setEdit(false);
  };
  return (
    <motion.div className="w-full items-center justify-center  ">
      {/* IN EDIT MODE */}
      {edit === exam?.name && isDeleted !== exam?.name && (
        <motion.div className="flex items-center ">
          <input
            type="text"
            value={examName}
            onChange={(e) => {
              setExamName(e.target.value);
            }}
            required
            placeholder={exam?.name}
            className={`${
              i % 2 !== 0 ? "bg-gray-700" : "bg-gray-900"
            }  text-gray-100 text-center sm:p-1 p-[2px] sm:text-base text-xs w-[20%] border-gray-400 border-2 `}
          />

          {/* MARKS OBTAINED  */}
          <input
            type="number"
            value={marksObt}
            onChange={(e) => {
              setMarksObt(e.target.value);
            }}
            required
            placeholder={exam?.mo}
            className={`${
              i % 2 !== 0 ? "bg-gray-700" : "bg-gray-900"
            }  text-gray-100 text-center sm:p-1 p-[2px] sm:text-base text-xs w-[20%] border-gray-400 border-2 `}
          />
          {/* MARKS TOTAL */}
          <input
            value={marksTotal}
            onChange={(e) => {
              setMarksTotal(e.target.value);
            }}
            required
            placeholder={exam?.mt}
            type="number"
            className={`${
              i % 2 !== 0 ? "bg-gray-700" : "bg-gray-900"
            }  text-gray-100 text-center sm:p-1 p-[2px] sm:text-base text-xs w-[20%] border-gray-400 border-2 `}
          />
          <motion.div
            className={`${
              i % 2 !== 0 ? "bg-gray-700" : "bg-gray-900"
            }  text-gray-100 text-center sm:p-1 p-[2px] sm:text-base text-xs w-[20%] border-gray-400 border-2 `}
          >
            {exam?.grade || "A"}
          </motion.div>
          <motion.div
            className={`${
              i % 2 !== 0 ? "bg-gray-700" : "bg-gray-900"
            }  text-gray-100 text-center sm:p-1 p-[2px] sm:text-base text-xs w-[20%] border-gray-400 border-2 flex items-center`}
          >
            <motion.div
              onClick={handleSaveExam}
              className="w-[100%] bg-slate-400  hover:bg-blue-400 duration-500 ease-in rounded-sm border-1 cursor-pointer"
            >
              Save
            </motion.div>
            <motion.div
              onClick={handleCancelExam}
              className="w-[100%] bg-slate-400  hover:bg-blue-400 duration-500 ease-in rounded-sm border-1 cursor-pointer"
            >
              Cancel
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      {/* NOT IN EDITING MODE */}
      {edit === false && isDeleted !== exam?.name && (
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
            {modifiedExam.oldExam === exam.name
              ? modifiedExam.name
              : exam?.name}
          </motion.div>
          <motion.div
            whileInView={{ scale: [0, 1], opacity: [0, 1] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`text-center sm:p-1 p-[2px] sm:text-base text-xs w-[20%] ${
              user ? "w-[20%]" : "w-[25%]"
            }`}
          >
            {modifiedExam.oldExam === exam.name
              ? modifiedExam.obtMarks
              : exam?.mo}
          </motion.div>
          <motion.div
            whileInView={{ scale: [0, 1], opacity: [0, 1] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`text-center sm:p-1 p-[2px] sm:text-base text-xs w-[20%] ${
              user ? "w-[20%]" : "w-[25%]"
            }`}
          >
            {modifiedExam.oldExam === exam?.name
              ? modifiedExam?.totalMarks
              : exam?.mt}
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
          {/* EDIT DELETE EXAM */}
          {!location.pathname.includes("pdf") && user !== null && (
            <>
              <motion.div
                whileInView={{ scale: [0, 1], opacity: [0, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={` w-[20%] flex justify-center sm:justify-normal`}
              >
                <motion.div
                  whileInView={{ scale: [0, 1], opacity: [0, 1] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => {
                    handleEdit(exam?.name);
                  }}
                  className="hidden w-[50%] bg-blue text-white duration-500 ease-in  cursor-pointer text-center sm:flex justify-center items-center border-2 border-gray-300"
                >
                  Edit
                </motion.div>
                <motion.img
                  whileInView={{ scale: [0, 1], opacity: [0, 1] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => {
                    handleEdit(exam?.name);
                  }}
                  src={edit_icon}
                  alt="edit"
                  className="sm:hidden w-[25px]  text-white duration-500 ease-in  cursor-pointer text-center flex justify-center items-center border-2 border-gray-300"
                />
                <motion.div
                  whileInView={{ scale: [0, 1], opacity: [0, 1] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={handleDeleteExam}
                  className="hidden w-[50%] sm:bg-blue text-white duration-500 ease-in border- cursor-pointer text-center sm:flex justify-center items-center border-2 border-gray-300"
                >
                  Delete
                </motion.div>
                <motion.img
                  whileInView={{ scale: [0, 1], opacity: [0, 1] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={handleDeleteExam}
                  src={delete_icon}
                  className="sm:hidden w-[25px] text-white duration-500 ease-in border- cursor-pointer text-center flex justify-center items-center border-2 border-gray-300"
                />
              </motion.div>
            </>
          )}
        </motion.div>
      )}
      {/* DELETED EXAM */}
      {isDeleted === exam?.name && (
        <motion.div className="flex items-center line-through opacity-50">
          <motion.div
            className={`text-gray-100 text-center p-1 w-[20%] border-gray-400 border-2  `}
          >
            {modifiedExam.oldExam === exam.name
              ? modifiedExam.name
              : exam?.name}
          </motion.div>
          <motion.div
            className={`  text-gray-100 text-center p-1 w-[20%] border-gray-400 border-2 `}
          >
            {modifiedExam.oldExam === exam.name
              ? modifiedExam.obtMarks
              : exam?.mo}
          </motion.div>
          <motion.div
            className={`  text-gray-100 text-center p-1 w-[20%] border-gray-400 border-2 `}
          >
            {modifiedExam.oldExam === exam?.name
              ? modifiedExam?.totalMarks
              : exam?.mt}
          </motion.div>
          <motion.div
            className={`  text-gray-100 text-center p-1 w-[20%] border-gray-400 border-2 `}
          >
            {exam?.grade || "A"}
          </motion.div>
          <motion.div
            className={`  text-gray-100 text-center p-1 w-[20%] border-gray-400 border-2 flex items-center`}
          >
            <motion.div
              onClick={() => {
                handleEdit(exam?.name);
              }}
              className="w-[50%] bg-slate-400  hover:bg-blue-400 duration-500 ease-in rounded-sm border-1 cursor-pointer"
            >
              Edit
            </motion.div>
            <motion.div
              onClick={handleDeleteExam}
              className="w-[50%] bg-gray-600  hover:bg-red-400 duration-500 ease-in rounded-sm border-1 cursor-pointer"
            >
              Delete
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExamRow;
