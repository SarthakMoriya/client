import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { initialValuesRecord, recordSchema } from "../../schemas/recordSchema";
import { notify } from "../../utils/notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setNewRecords } from "../../state";
import { motion } from "framer-motion";

const CreateRecord = () => {
  const [subs, setSubs] = useState(0);
  const [examname, setExamname] = useState("");
  const [totalmarks, setTotalmarks] = useState("");
  const [marksobtained, setMarksobtained] = useState("");
  const [exams, setExams] = useState([]);
  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const teacherId = useSelector((state) => state.auth.user._id);
  const secretKey = useSelector((state) => state.auth.user.passcode);
  const dispatch = useDispatch();

  const handleRecordSubmit = async (values, onSubmitProps) => {
    if (values.secretKey == secretKey) {
      const res = await fetch("http://localhost:8000/records/createrecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: values.sName,
          studentCourse: values.coursename,
          dateEnrolled: values.date,
          exams: exams,
          studentId: values.studentId,
          teacherId: teacherId,
          imageName: image ? image?.name : "",
          mainExamName: values.mainExamName,
          mainExamMT: values.mainExamMT,
          mainExamMO: values.mainExamMO,
        }),
      });
      const data = await res.json();

      if (data.ok) {
        onSubmitProps.resetForm();
        setExams([]);
        setSubs("");
        setImage("");
        notify("Record Created Successfully", "success");
        dispatch(setNewRecords({ record: data?.record }));
      } else {
        notify("Record Creation Failed, Try using Unique Student ID");
      }
    } else {
      notify("Please Enter Correct Secret Key To Add Record");
    }
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
  const handleImageUpload = async () => {
    if (image) {
      const imageForm = new FormData();
      imageForm.append("image", image);

      try {
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: imageForm,
        });

        if (response.ok) {
          notify("Image uploaded successfully", "success");
          setIsImageUploaded(true);
        } else {
          notify("Error uploading Image");
        }
      } catch (error) {
        notify("Error uploading Image");
      }
    } else {
      notify("Error uploading Image");
    }
  };
  return (
    <>
      <motion.div className="  bg-blue-100 ">
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
              Add a new Record
            </motion.h2>
            {/* IMAGE FIELD */}
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
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
              className="w-full mt-2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-500 dark:focus:ring-primary-800"
              onClick={handleImageUpload}
              disabled={isImageUploaded ? true : false}
            >
              {isImageUploaded ? "Image Uploaded" : "Upload Image"}
            </motion.button>
            <Formik
              onSubmit={handleRecordSubmit}
              initialValues={initialValuesRecord}
              validationSchema={recordSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit}>
                  <motion.div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    {/* SECRET KEY */}
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="sm:col-span-2 mt-2"
                    >
                      <label
                        htmlFor="secretKey"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Secret Key
                      </label>
                      <input
                        type="text"
                        name="secretKey"
                        id="secretKey"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="secretKey"
                        onBlur={handleBlur}
                        value={values.secretKey}
                        onChange={handleChange}
                        error={
                          Boolean(touched.secretKey) &&
                          Boolean(errors.secretKey)
                        }
                        helperText={touched.secretKey && errors.secretKey}
                      />
                      {touched.secretKey && errors.secretKey && (
                        <motion.div className="text-blue-700 text-md my-1 ml-2">
                          {errors.secretKey}
                        </motion.div>
                      )}
                    </motion.div>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="sm:col-span-2"
                    >
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Student Name
                      </label>
                      <input
                        type="text"
                        name="sName"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type product name"
                        onBlur={handleBlur}
                        value={values.sName}
                        onChange={handleChange}
                        error={Boolean(touched.sName) && Boolean(errors.sName)}
                        helperText={touched.sName && errors.sName}
                      />
                      {touched.sName && errors.sName && (
                        <motion.div className="text-blue-700 text-md my-1 ml-2">
                          {errors.sName}
                        </motion.div>
                      )}
                    </motion.div>
                    {/* COURSE NAME */}
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1.4, ease: "easeInOut" }}
                      className="w-full"
                    >
                      <label
                        htmlFor="coursename"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Course name
                      </label>
                      <input
                        type="text"
                        name="coursename"
                        id="coursename"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Product brand"
                        onBlur={handleBlur}
                        value={values.coursename}
                        onChange={handleChange}
                        error={
                          Boolean(touched.coursename) &&
                          Boolean(errors.coursename)
                        }
                        helperText={touched.coursename && errors.coursename}
                      />
                      {touched.coursename && errors.coursename && (
                        <motion.div className="text-blue-700 text-md my-1 ml-2">
                          {errors.coursename}
                        </motion.div>
                      )}
                    </motion.div>
                    {/* DATE ENROLLED */}
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
                      className="w-full"
                    >
                      <label
                        for="date"
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
                        onBlur={handleBlur}
                        value={values.date}
                        onChange={handleChange}
                        error={Boolean(touched.date) && Boolean(errors.date)}
                        helperText={touched.date && errors.date}
                      />
                      {touched.date && errors.date && (
                        <motion.div className="text-blue-700 text-md my-1 ml-2">
                          {errors.date}
                        </motion.div>
                      )}
                    </motion.div>
                    {/* STUDENT ID */}
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1.7, ease: "easeInOut" }}
                      className="sm:col-span-2"
                    >
                      <label
                        htmlFor="studentId"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Student Id
                      </label>
                      <input
                        type="number"
                        name="studentId"
                        id="studentId"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type Student Id "
                        onBlur={handleBlur}
                        value={values.studentId}
                        onChange={handleChange}
                        error={
                          Boolean(touched.studentId) &&
                          Boolean(errors.studentId)
                        }
                        helperText={touched.studentId && errors.studentId}
                      />
                      {touched.studentId && errors.studentId && (
                        <motion.div className="text-blue-700 text-md my-1 ml-2">
                          {errors.studentId}
                        </motion.div>
                      )}
                    </motion.div>
                    {/* MAIN EXAM DETAILS */}
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
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
                        onBlur={handleBlur}
                        value={values.mainExamName}
                        onChange={handleChange}
                        error={
                          Boolean(touched.mainExamName) &&
                          Boolean(errors.mainExamName)
                        }
                        helperText={touched.mainExamName && errors.mainExamName}
                      />
                    </motion.div>
                    {/* MAIN EXAM MARK TOTAL */}
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="sm:col-span-2"
                    >
                      <label
                        htmlFor="mainExamMT"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Main Exam Total Marks
                      </label>
                      <input
                        type="number"
                        name="mainExamMT"
                        id="mainExamMT"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Main Exam Total Marks "
                        onBlur={handleBlur}
                        value={values.mainExamMT}
                        onChange={handleChange}
                        error={
                          Boolean(touched.mainExamMT) &&
                          Boolean(errors.mainExamMT)
                        }
                        helperText={touched.mainExamMT && errors.mainExamMT}
                      />
                    </motion.div>
                    {/* MAIN EXAM MARKS OBTAINED */}
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1.4, ease: "easeInOut" }}
                      className="sm:col-span-2"
                    >
                      <label
                        htmlFor="mainExamMO"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Main Exam Marks Obtained
                      </label>
                      <input
                        type="number"
                        name="mainExamMO"
                        id="mainExamMO"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Main Exam Name "
                        onBlur={handleBlur}
                        value={values.mainExamMO}
                        onChange={handleChange}
                        error={
                          Boolean(touched.mainExamMO) &&
                          Boolean(errors.mainExamMO)
                        }
                        helperText={touched.mainExamMO && errors.mainExamMO}
                      />
                    </motion.div>
                    {/* NUMBER OF TESTS */}
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1.4, ease: "easeInOut" }}
                      className="sm:col-span-2"
                    >
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
                    </motion.div>
                    {/* EXAMS DETAILS */}
                    {subs >= 1 && (
                      <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 1.4, ease: "easeInOut" }}
                      >
                        <motion.div className=" w-full">
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
                        </motion.div>
                        <motion.div className="w-full">
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
                        </motion.div>
                        <motion.div className="w-full">
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
                        </motion.div>
                        <motion.div className="w-full">
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
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                  <motion.button
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                    type="submit"
                    className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 bg-blue-400"
                  >
                    Add Record
                  </motion.button>
                </form>
              )}
            </Formik>
          </motion.div>
        </section>
      </motion.div>
    </>
  );
};

export default CreateRecord;
