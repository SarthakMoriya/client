import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { initialValuesRecord, recordSchema } from "../../schemas/recordSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateRecord = () => {
  const [subs, setSubs] = useState(0);
  const [examname, setExamname] = useState("");
  const [totalmarks, setTotalmarks] = useState("");
  const [marksobtained, setMarksobtained] = useState("");
  const [exams, setExams] = useState([]);
  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const teacherId = useSelector((state) => state.auth.user._id);

  const notify = (message, type = "error") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };

  const handleRecordSubmit = async (values, onSubmitProps) => {
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
      }),
    });
    const data = await res.json();
    console.log(data)
    if(data.ok){
      onSubmitProps.resetForm();
      notify("Record Created Successfully", "success");
    }else{
      notify("Record Creation Failed, Try using Unique Student ID")
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
          console.log("Image uploaded successfully");
          // notify("Image uploaded successfully","success")
          setIsImageUploaded(true);
        } else {
          console.error("Error uploading image");
        }
      } catch (error) {
        console.error("Error uploading image", error);
      }
    } else {
      console.error("No file selected");
    }
  };
  return (
    <>
      <div className="  bg-blue-100">
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
        <section className="bg-white dark:bg-gray-900 h-[100vh]">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Add a new Record
            </h2>
            {/* IMAGE FIELD */}
            <div>
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
            </div>
            <button
              className="w-full mt-2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-500 dark:focus:ring-primary-800"
              onClick={handleImageUpload}
              disabled={isImageUploaded ? true : false}
            >
              {isImageUploaded ? "Image Uploaded" : "Upload Image"}
            </button>
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
                        <div className="text-blue-700 text-md my-1 ml-2">
                          {errors.sName}
                        </div>
                      )}
                    </div>
                    {/* COURSE NAME */}
                    <div className="w-full">
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
                        <div className="text-blue-700 text-md my-1 ml-2">
                          {errors.coursename}
                        </div>
                      )}
                    </div>
                    {/* DATE ENROLLED */}
                    <div className="w-full">
                      <label
                        for="date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date Enrolled
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="$2999"
                        onBlur={handleBlur}
                        value={values.date}
                        onChange={handleChange}
                        error={Boolean(touched.date) && Boolean(errors.date)}
                        helperText={touched.date && errors.date}
                      />
                      {touched.date && errors.date && (
                        <div className="text-blue-700 text-md my-1 ml-2">
                          {errors.date}
                        </div>
                      )}
                    </div>
                    {/* STUDENT ID */}
                    <div className="sm:col-span-2">
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
                        <div className="text-blue-700 text-md my-1 ml-2">
                          {errors.studentId}
                        </div>
                      )}
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
                    {subs >= 1 && (
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
              )}
            </Formik>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreateRecord;
