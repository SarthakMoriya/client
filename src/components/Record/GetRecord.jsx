import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL, deleteRecord } from "../../api";
import userfallback from "../../assets/user.png";
import RecordTable from "./RecordTable";
import {
  gradeCalculator,
  overallGrade,
  overallPercentage,
} from "../../utils/gradeCalculator";
import { notify } from "../../utils/notification";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BarChart from "../Charts/BarChart";
import PerformanceChart from "../Charts/PerformanceChart";
import GrowthChart from "../Charts/GrowthChart";
import "./style.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase/firebase";
import QRCodeComponent from "../QR/QrGenerator";

const GetRecord = () => {
  const [record, setRecord] = useState("");
  const [certificate, setCertificate] = useState("");
  const [isUpdatingCertificate, setIsUpdatingCertificate] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Update the title based on the current route
    document.title = `Webcooks | Record`;
  }, [location.pathname]);

  //Function to fetch particular Record as per Id in URL
  const fetchRecord = async () => {
    try {
      const res = await fetch(`${BASE_URL}/records/getrecord/${id}`);
      if (res.ok) {
        const { data } = await res.json();
        setRecord(data); //Sets the complete record data to state --> record
        console.log(record);
      } else {
        setError(res);
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const uplodaData = async () => {
    if (user === null && record?.isDataUploaded === true) {
      window.open(`${BASE_URL}/pdfs/${id}.pdf`);
    } else {
      const data = {
        studentName: record.studentName,
        enrolledAt: record.dateEnrolled,
        teacherName: id,
        grade: "a",
        exams: record.exams,
        id,
      };

      await fetch(`${BASE_URL}/records/downloadrecord`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: data }),
      });
      notify("Downloading Record in 5 seconds", "success");
      setTimeout(() => {
        window.open(`${BASE_URL}/pdfs/${id}.pdf`);
      }, 5000);
    }
  };
  // TO UPLOAD URL TO MONGODB
  const handleCertificate = async () => {
    if (certificate) {
      setLoading(true);
      await fetch(`${BASE_URL}/records/certificate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, certificate: url }),
      }).then(async (res) => {
        alert("CERTIFICATE UPLOADED");
        setLoading(false)
      });

      //
    } else {
      console.error("No file selected");
      setLoading(false)
    }
  };
  // TO GET URL FROM FIREBASE
  const handleCertificateUpload = async () => {
    setLoading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + certificate.name; // So no two users have same file
    const storageRef = ref(storage, fileName); //location+filename
    const uploadTask = uploadBytesResumable(storageRef, certificate); //finalStep
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
        return;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setUrl(downloadUrl);
          setLoading(false);
        });
      }
    );
  };
  // TO ONLY DOWNLOAD CERTIFICATE
  const handleCertificateDownload = () => {
    console.log(record.certificate, user);
    if (record.certificate === "" && user === null) {
      alert("No certificate Uploaded");
      return;
    }
    notify("Downloading Certificate ", "success");
    setTimeout(() => {
      window.open(`http://localhost:3000/record/certificate/${id}`);
    }, 5000);
  };
  const handleUpdateCertificate = () => {
    setIsUpdatingCertificate((prev) => !prev);
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  const handleEdit = (id) => {
    navigate("/record/edit/" + id);
  };

  const averageData = {
    category: "Average Percentage",
    value: 80,
  };

  const individualData = {
    category: "Your Percentage",
    value: isNaN(overallPercentage(record))
      ? "Not Graded"
      : Math.floor(overallPercentage(record)),
  };

  return (
    <>
      {error && (
        <motion.div
          whileInView={{ scale: [0, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-screen flex items-center justify-center text-5xl font-extrabold text-center bg-gray-100"
        >
          NO RESULT FOUND WITH ID {id}
        </motion.div>
      )}
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-white text-black min-h-[100vh] mt-5 mx-6 md:mx-12 lg:mx-24"
      >
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
        {/* STUDENT DETAILS AND BUTTONS */}
        <div className="flex items-center justify-center">
          <div className="border-secondary border-b-4  text-2xl font-semibold text-blue mb-4">
            STUDENT DETAILS
          </div>
        </div>
        {record?._id && (
          <motion.div className="flex">
            <motion.div className="flex w-full border md:flex-row flex-col">
              {/* STUDENT IMAGE */}
              <motion.div className="flex  text-white md:w-[20%]  w-full">
                <img
                  src={
                    record?.imageName ? `${record?.imageName}` : userfallback
                  }
                  alt=""
                  className="w-full"
                />
              </motion.div>

              {/* STUDENT DETAILS */}
              <motion.div className="info flex flex-col md:w-[60%] w-full text-black  ">
                <motion.div className="px-4 py-2 font-normal  text-sm md:text-base lg:text-xl border">
                  StudentId: {record?.studentId}
                </motion.div>
                <motion.div className="px-4 py-2 font-normal  text-sm md:text-base lg:text-xl border">
                  Name: {record?.studentName}
                </motion.div>
                <motion.div className="px-4 py-2 font-normal text-sm md:text-base lg:text-xl capitalize  border">
                  Course: {record?.studentCourse}
                </motion.div>
                <motion.div className="px-4 py-2 font-normal text-sm md:text-base lg:text-xl capitalize  border">
                  DOJ: {record?.dateEnrolled}
                </motion.div>
                <motion.div className="px-4 py-2 font-normal text-sm md:text-base lg:text-xl  border">
                  Grade:{" "}
                  {isNaN(overallGrade(record))
                    ? overallGrade(record)
                    : "Not Graded"}
                </motion.div>
                <motion.div className="px-4 py-2 font-normal text-sm md:text-base lg:text-xl  border">
                  Percentage:{" "}
                  {isNaN(overallPercentage(record))
                    ? "Not Graded"
                    : Math.floor(overallPercentage(record)) + "%"}
                </motion.div>
              </motion.div>
              {/* BUTTONS TO DELETE VIEW ... */}
              <motion.div className="text-white  md:w-[20%] w-full flex-wrap flex md:flex-col ">
                {user && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        handleEdit(record?._id);
                      }}
                      className="record_event_btn"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteRecord(record?._id, navigate);
                      }}
                      className="record_event_btn"
                    >
                      Delete
                    </button>
                  </>
                )}
                {user && (
                  <button
                    type="button"
                    onClick={uplodaData}
                    className="record_event_btn"
                  >
                    Upload Data
                  </button>
                )}
                {!user && (
                  <button
                    type="button"
                    onClick={uplodaData}
                    className="record_event_btn"
                  >
                    Download Record
                  </button>
                )}

                {user && record?.certificate === "" ? (
                  <>
                    <input
                      type="file"
                      onChange={(e) => {
                        setCertificate(e.target.files[0]);
                        console.log(certificate);
                      }}
                      className="record_event_btn"
                    />
                    <button
                      type="button"
                      onClick={handleCertificateUpload}
                      className="record_event_btn"
                    >
                      Upload Certificate
                    </button>
                    {url && (
                      <button
                        type="button"
                        onClick={handleCertificate}
                        className="record_event_btn"
                      >
                        Save Certificate
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleCertificateDownload}
                    className="record_event_btn"
                  >
                    View Certificate
                  </button>
                )}
                {user &&
                  record?.certificate !== "" &&
                  !isUpdatingCertificate && (
                    <button
                      onClick={handleUpdateCertificate}
                      className="record_event_btn"
                    >
                      Update Certificate
                    </button>
                  )}
                {isUpdatingCertificate && (
                  <>
                    <input
                      type="file"
                      onChange={(e) => {
                        setCertificate(e.target.files[0]);
                        console.log(certificate);
                      }}
                      className="record_event_btn"
                    />
                    <button
                      type="button"
                      onClick={handleCertificateUpload}
                      className="record_event_btn"
                    >
                      {loading?"Uploading...":"Upload Certificate"}
                    </button>
                    {user && record?.certificate !== "" && (
                      <button
                        onClick={handleCertificate}
                        className="text-white mx-2 md:mx-0 lg:mx-2 bg-primary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-xs lg:text-sm 
                        md:px-1.5 md:py-1.5 lg:px-2.5 lg:py-2.5 px-2 py-2 
                        text-center mb-2 mt-2 ease-in-out duration-500 rounded-md 
                        sm:w-[100%] w-[25%]"
                        hidden={loading}
                      >
                        Save Certificate
                      </button>
                    )}
                  </>
                )}
              </motion.div>
              <div className="m-2 border rounded-lg p-2">
              <QRCodeComponent url={`http://localhost:3000/record/${record?._id}`}/>
              </div>
            </motion.div>
          </motion.div>
        )}
        <div className="flex items-center justify-center">
          <div className="border-secondary border-b-4  text-2xl font-semibold text-blue mt-8">
            STUDENT PERFORMANCE
          </div>
        </div>
        {record?.exams?.length && (
          <RecordTable
            exams={record?.exams}
            studentName={record?.studentName}
            studentCourseName={record?.studentCourse}
          />
        )}
        {!record?.exams?.length && (
          <p className="text-center text-blue text-3xl font-bold my-4  p-4">
            No Tests Found Please Add using Edit button
          </p>
        )}
        {/* MAIN EXAM DETAILS */}
        <div className="flex items-center justify-center">
          <div className="border-secondary border-b-4  text-2xl font-semibold text-blue my-8">
            MAIN EXAM DETAILS
          </div>
        </div>
        {record?.mainExamMT > 0 && (
          <motion.div
            whileInView={{ scale: [0, 1], opacity: [0, 1] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full items-center justify-center  "
          >
            <motion.div className="flex items-center justify-center  text-black border  ">
              {["Exam", "Marks Obt", "Marks Total", "Grade", "Percentage"].map(
                (val) => (
                  <motion.div className="text-blue text-center px-1 sm:px-2 py-2 sm:py-4 max-w-[20%] w-[20%] border whitespace-nowrap overflow-ellipsis text-xs sm:text-base">
                    {`${val}`}
                  </motion.div>
                )
              )}
            </motion.div>
            <motion.div className="flex items-center justify-center uppercase text-black border mb-6">
              <motion.div className="text-xs sm:text-base  text-center px-1 py-2 max-w-[20%] w-[20%] border text-ellipsis">
                {record?.mainExamName}
              </motion.div>
              <motion.div className="text-xs sm:text-base  text-center px-1 py-2 max-w-[20%] w-[20%] border">
                {record?.mainExamMO}
              </motion.div>
              <motion.div className="text-xs sm:text-base  text-center px-1 py-2 max-w-[20%] w-[20%] border">
                {record?.mainExamMT}
              </motion.div>
              <motion.div className="text-xs sm:text-base  text-center px-1 py-2 max-w-[20%] w-[20%] border">
                {gradeCalculator([
                  { mt: record?.mainExamMT, mo: record?.mainExamMO },
                ])}
              </motion.div>
              <motion.div className="text-xs sm:text-base  text-center px-1 py-2 max-w-[20%] w-[20%] border">
                {Math.floor((record?.mainExamMO / record.mainExamMT) * 100)}%
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {!record?.mainExamMT > 0 && (
          <p className="text-center text-blue text-3xl font-bold my-4  p-4">
            No Main Exam Found Please Add using Edit button
          </p>
        )}
        <div className="flex flex-wrap gap-5  items-center justify-center">
          {record?.exams?.length > 0 && (
            <>
              <div className="hidden lg:block">
                <BarChart data={record?.exams} />
              </div>

              <PerformanceChart
                averageData={averageData}
                individualData={individualData}
                course={record?.studentCourse}
              />
              <GrowthChart examData={record?.exams} />
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default GetRecord;
