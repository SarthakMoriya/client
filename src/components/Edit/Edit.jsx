import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ExamRow from "./ExamRow";
import ExamModal from "./ExamModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../utils/notification";
import { setRecords } from "../../state/index";
import { BASE_URL, getRecords } from "../../api";
import { motion } from "framer-motion";
import { getMaxDate } from "../../utils/dateFormatter";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase/firebase";
const Edit = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Update the title based on the current route
    document.title = `Webcooks | Edit - ${record?.studentId}`;
  }, [location.pathname]);

  const record = useSelector((state) => {
    let currRec=state?.record?.records?.find((rec) => rec._id === id?.id);
    return currRec 
  });

  const [sName, setSname] = useState(record?.studentName);
  const [coursename, setCoursename] = useState(record?.studentCourse);
  const [date, setDate] = useState(record?.dateEnrolled);
  const [studentId, setStudentId] = useState(record?.studentId);
  const [isAddingExam, setIsAddingExam] = useState(false);
  const [examsArr, setExamsArr] = useState(record?.exams?.length?record.exams:[]);
  const [mainExamName, setMainExamName] = useState(record?.mainExamName);
  const [mainExamMT, setMainExamMT] = useState(record?.mainExamMT);
  const [mainExamMO, setMainExamMO] = useState(record?.mainExamMO);
  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [url, setUrl] = useState(record?.imageName);
  const [loading, setLoading] = useState(false);
  const teacherId = useSelector((state) => state.auth.user._id);

  const handleUpdateExam = (result) => {
    setExamsArr(result);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      mainExamName !== "" &&
      (Number(mainExamMT) < Number(mainExamMO) || mainExamMO === "" || mainExamMT === "")
    ) {
      alert("Please enter Main exam details Properly");
      setLoading(false);
      return;
    } else {
      console.log(url)
      const res = await fetch(
        `${BASE_URL}/records/updatefullrecord/${id.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentName: sName,
            studentCourse: coursename,
            dateEnrolled: date,
            exams: examsArr,
            studentId: Number(studentId),
            teacherId,
            id,
            imageName: url,
            mainExamName: mainExamName,
            mainExamMT: Number(mainExamMT),
            mainExamMO: Number(mainExamMO),
          }),
        }
      );

      const data = await res.json();
      if (data.ok) {
        notify("Record Updated", "success");
        const newRecords = await getRecords();
        dispatch(setRecords({ records: newRecords }));
        setLoading(false);
        setTimeout(() => {
          navigate(`/record/${record?._id}`);
        }, 2000);
      } else {
        notify(data.message);
        setLoading(false);
      }
    }
  };
  const handleFileUpload = async () => {
    setLoading(true);
    setIsImageUploaded(false)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name; // So no two users have same file
    const storageRef = ref(storage, fileName); //location+filename
    const uploadTask = uploadBytesResumable(storageRef, image); //finalStep
    console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        notify("Image Size must be less than 2mb");
        setLoading(false);
        setIsImageUploaded(false)
        return;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setUrl(downloadUrl);
          setLoading(false);
          setIsImageUploaded(true)
        });
      }
    );
  };

  return (
    <>
      <motion.div className="  bg-blue-100 h-auto">
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
          <motion.div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <motion.h2
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="mb-4 text-xl font-bold text-gray-900 dark:text-white"
            >
              Edit record of studentId: {record?.studentId}
            </motion.h2>
            {/* IMAGE FIELD */}
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <img
                src={url ? url : record?.imageName}
                alt=""
                className="w-32 h-32 "
              />
              <label
                htmlFor="picture"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Profile Photo
              </label>
              <input
                type="file"
                name="picture"
                id="picture"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </motion.div>
            <motion.button
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-full text-white bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-gray-600 dark:focus:ring-primary-800 mt-1"
              onClick={handleFileUpload}
              disabled={loading}
            >
              {isImageUploaded ? "Image Uploaded" : "Upload Image"}
            </motion.button>
            <form onSubmit={handleSubmit}>
              <motion.div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* STUDENT NAME */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="sm:col-span-2"
                >
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
                </motion.div>
                {/* COURSE NAME */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
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
                </motion.div>
                {/* DATE ENROLLED */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
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
                    min="2021-01-11"
                    max={getMaxDate()}
                    // max="2021-01-11"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="dd-mm-yyyy"
                    required="true"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </motion.div>
                {/* STUDENT ID */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="sm:col-span-2"
                >
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
                      MozAppearance: "textfield", // For Firefox
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Student Id "
                    required="true"
                    value={studentId}
                    onChange={(e) => {
                      setStudentId(e.target.value);
                    }}
                  />
                </motion.div>
                {/* MAIN EXAM NAME */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="sm:col-span-2"
                >
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
                </motion.div>
                {/* Main Exam Marks Total */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="sm:col-span-2"
                >
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
                </motion.div>
                {/* Main Exam Marks Obtained */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="sm:col-span-2"
                >
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
                </motion.div>
              </motion.div>
              {/*EXAMS TAKEN */}
              <motion.h2
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="my-4 text-xl font-bold text-gray-900 dark:text-white"
              >
                Exams Taken:
              </motion.h2>
              <div className="flex flex-col border-2 p-2">
                {examsArr.length > 0 && (
                  <div className="flex my-4 text-xl font-bold text-gray-900 dark:text-white w-full  items-center justify-around">
                    <div className="ml-2 py-2">Exam</div>
                    <div className="ml-4 py-2">Marks Total</div>
                    <div className=" py-2">Marks Obt</div>
                    <div className="opacity-0">Marks Obt</div>
                  </div>
                )}
                {examsArr?.map((exam, i) => (
                  <ExamRow
                    key={i}
                    exam={exam}
                    exams={examsArr}
                    handleUpdateExam={handleUpdateExam}
                  />
                ))}
                {/* ADD MORE EXAM */}
                <motion.button
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => {
                    setIsAddingExam(!isAddingExam);
                  }}
                  type="button"
                  className="bg-secondary border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                >
                  {!isAddingExam ? "Add More Exams" : "Save Exams"}
                </motion.button>
                {/* ADD EXAM MODAL */}
                {isAddingExam && (
                  <ExamModal
                    exams={examsArr}
                    handleUpdateExam={handleUpdateExam}
                  />
                )}
              </div>
              {/* SAVE RECORD */}
              <motion.button
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 1, ease: "easeInOut" }}
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-secondary rounded-lg focus:ring-4 focus:ring-secondary "
              >
                Save Record
              </motion.button>
            </form>
          </motion.div>
        </section>
      </motion.div>
    </>
  );
};

export default Edit;
