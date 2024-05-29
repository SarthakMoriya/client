import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik } from "formik";

import "react-toastify/dist/ReactToastify.css";
import {
  initialValuesPassword,
  passwordSchema,
} from "../../schemas/recordSchema";
import { BASE_URL } from "../../api";

const UpdatePassword = ({ user, setIsUpdatePassword }) => {
  const handleUpdatePassword = async (values, onSubmitProps) => {
    if(values.newPassword !== values.confirmpassword){
      alert("Please enter new password correctly")
      return;
    }
    const res = await fetch(`${BASE_URL}/auth/changepassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldPassword: values.oldpassword,
        newPassword: values.newpassword,
        id: user?._id,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      notify(data.message, "success");
      setTimeout(() => {
        setIsUpdatePassword(false);
      }, 1000);
    } else {
      notify(data.message, "error");
    }
  };

  const notify = (message, type = "error") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };
  const handleClose=()=>{
    setIsUpdatePassword(false);
  }
  return (
    <>
      <Formik
        onSubmit={handleUpdatePassword}
        initialValues={initialValuesPassword}
        validationSchema={passwordSchema}
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
            className=" w-screen min-h-[50vh] border-2 rounded-lg bg-white z-10 absolute top-[25%] left-0 "
          >
            <div className="text-blue font-extrabold text-2xl absolute top-4 left-4 cursor-pointer" onClick={handleClose}>X</div>
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
            <div className="text-center font-bold text-blue text-2xl my-4">
              Update Password
            </div>
            {/* OLD PASSWORD */}
            <div className="px-4 py-2">
              <label
                htmlFor="oldpassword"
                className="block mb-2 text-sm font-medium text-blue "
              >
                Old Password
              </label>
              <input
                type="password"
                name="oldpassword"
                id="oldpassword"
                className="bg-blue border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="enter old password..."
                required={true}
                onBlur={handleBlur}
                value={values.oldpassword}
                onChange={handleChange}
                error={
                  Boolean(touched.oldpassword) && Boolean(errors.oldpassword)
                }
                helperText={touched.oldpassword && errors.oldpassword}
              />
              {touched.oldpassword && errors.oldpassword && (
                <div className="text-blue-700 text-md my-1 ml-2">
                  {errors.oldpassword}
                </div>
              )}
            </div>
            {/* NEW PASSWORD */}
            <div className="px-4 py-2">
              <label
                htmlFor="newpassword"
                className="block mb-2 text-sm font-medium text-blue"
              >
                New Password
              </label>
              <input
                type="password"
                name="newpassword"
                id="newpassword"
                className="bg-blue border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="enter new password..."
                required={true}
                onBlur={handleBlur}
                value={values.newpassword}
                onChange={handleChange}
                error={
                  Boolean(touched.newpassword) && Boolean(errors.newpassword)
                }
                helperText={touched.oldpassword && errors.newpassword}
              />
              {touched.newpassword && errors.newpassword && (
                <div className="text-blue-700 text-md my-1 ml-2">
                  {errors.newpassword}
                </div>
              )}
            </div>
            {/* CONFIRM NEW PASSWORD */}
            <div className="px-4 py-2">
              <label
                htmlFor="confirmpassword"
                className="block mb-2 text-sm font-medium text-blue"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                className="bg-blue border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="confirm new password..."
                required={true}
                onBlur={handleBlur}
                value={values.confirmpassword}
                onChange={handleChange}
                error={
                  Boolean(touched.confirmpassword) &&
                  Boolean(errors.confirmpassword)
                }
                helperText={touched.oldpassword && errors.confirmpassword}
              />
              {touched.confirmpassword && errors.confirmpassword && (
                <div className="text-blue-700 text-md my-1 ml-2">
                  {errors.confirmpassword}
                </div>
              )}
            </div>
            <div className="px-4 py-2">
              <button
                type="submit"
                className="bg-secondary border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                Update Password
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default UpdatePassword;
