import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik } from "formik";

import "react-toastify/dist/ReactToastify.css";
import {
  initialValuesPasscode,
  passcodeSchema,
} from "../../schemas/recordSchema";

const UpdatePasscode = ({ user, setIsUpdatePasscode }) => {
  const [oldPasscode, setOldPasscode] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const handleUpdatePasscode = async (values, onSubmitProps) => {
    const res = await fetch("http://localhost:8000/auth/changepasscode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPasscode:values.oldpasscode, newPasscode:values.newpasscode, id: user?._id }),
    });
    const data = await res.json();
    if (data.ok) {
      notify(data.message, "success");
      setTimeout(() => {
        setIsUpdatePasscode(false);
      }, 1000);
    } else {
      notify(data.message, "error");
    }
  };

  const notify = (message, type = "error") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };
  return (
    <Formik
      onSubmit={handleUpdatePasscode}
      initialValues={initialValuesPasscode}
      validationSchema={passcodeSchema}
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
        <form
          onSubmit={handleSubmit}
          className="w-[50vw]  min-h-[50vh] border-2 rounded-lg bg-gray-900 z-10 relative translate-x-[50%] translate-y-[-50%]"
        >
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <div className="text-center font-bold text-white text-2xl my-4">
            Update Passcode
          </div>
          {/* OLD PASSWORD */}
          <div className="px-4 py-2">
            <label
              htmlFor="passwordold"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Old Passcode
            </label>
            <input
              type="password"
              name="oldpasscode"
              id="passcode"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter old passcode"
              required={true}
              onBlur={handleBlur}
              value={values.oldpasscode}
              onChange={handleChange}
              error={Boolean(touched.oldpasscode) && Boolean(errors.oldpasscode)}
              helperText={touched.oldpasscode && errors.oldpasscode}
            />
            {touched.oldpasscode && errors.oldpasscode && (
              <div className="text-blue-700 text-md my-1 ml-2">
                {errors.oldpasscode}
              </div>
            )}
          </div>
          {/* NEW PASSWORD */}
          <div className="px-4 py-2">
            <label
              htmlFor="newpasscode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Passcode
            </label>
            <input
              type="password"
              name="newpasscode"
              id="newpasscode"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter new passcode"
              required={true}
              onBlur={handleBlur}
              value={values.newpasscode}
              onChange={handleChange}
              error={Boolean(touched.newpasscode) && Boolean(errors.newpasscode)}
              helperText={touched.newpasscode && errors.newpasscode}
            />
            {touched.newpasscode && errors.newpasscode && (
              <div className="text-blue-700 text-md my-1 ml-2">
                {errors.newpasscode}
              </div>
            )}
          </div>
          {/* CONFIRM NEW PASSWORD */}
          <div className="px-4 py-2">
            <label
              htmlFor="confirmpasscode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Passcode
            </label>
            <input
              type="password"
              name="confirmpasscode"
              id="confirmpasscode"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Confirm new passcode"
              required={true}
              onBlur={handleBlur}
              value={values.confirmpasscode}
              onChange={handleChange}
              error={Boolean(touched.confirmpasscode) && Boolean(errors.confirmpasscode)}
              helperText={touched.confirmpasscode && errors.confirmpasscode}
            />
            {touched.confirmpasscode && errors.confirmpasscode && (
              <div className="text-blue-700 text-md my-1 ml-2">
                {errors.confirmpasscode}
              </div>
            )}
          </div>
          <div className="px-4 py-2">
            <button
              type="submit"
              className="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm text-center mr-2 mb-2 mt-2  rounded-lg  ease-in-out duration-500"
            >
              Update Password
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default UpdatePasscode;
