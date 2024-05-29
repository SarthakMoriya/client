import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik } from "formik";

import "react-toastify/dist/ReactToastify.css";
import {
  initialValuesPasscode,
  passcodeSchema,
} from "../../schemas/recordSchema";
import { BASE_URL } from "../../api";

const UpdatePasscode = ({ user, setIsUpdatePasscode }) => {
  const handleUpdatePasscode = async (values, onSubmitProps) => {
    const res = await fetch(`${BASE_URL}/auth/changepasscode`, {
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

  const handleClose=()=>{
    setIsUpdatePasscode(false);
  }
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
          className="w-screen  min-h-[50vh] border-2 border-secondary rounded-lg bg-white z-10 absolute top-[25%] left-0"
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
          <div className="text-center font-bold text-blue text-2xl my-4">
            Update Passcode
          </div>
          <div className="text-blue font-extrabold text-2xl absolute top-4 left-4 cursor-pointer" onClick={handleClose}>X</div>

          {/* OLD PASSWORD */}
          <div className="px-4 py-2">
            <label
              htmlFor="passwordold"
              className="block mb-2 text-sm font-medium text-blue"
            >
              Old Passcode
            </label>
            <input
              type="password"
              name="oldpasscode"
              id="passcode"
              className="bg-blue border border-secondary text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
              className="block mb-2 text-sm font-medium text-blue"
            >
              New Passcode
            </label>
            <input
              type="password"
              name="newpasscode"
              id="newpasscode"
              className="bg-blue border border-secondary text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
              className="block mb-2 text-sm font-medium text-blue"
            >
              Confirm Passcode
            </label>
            <input
              type="password"
              name="confirmpasscode"
              id="confirmpasscode"
              className="bg-blue border border-secondary text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
              className="bg-secondary border border-secondary text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
