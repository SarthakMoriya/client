import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import "react-toastify/dist/ReactToastify.css";
import { setLogout } from "../../state";

const otpSchema = yup.object().shape({
  otp: yup.string().required("Please enter OTP"),
});

const initialValuesOtp = { otp: "" };

const OtpModal = ({ otp, setIsOtpSent, setIsVerified }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const id = useSelector((state) => state.auth.user._id);
  const notify = (message, type = "error") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };

  const handleOtpMatching = async (values, onSubmitProps) => {
    if (otp === values.otp) {
      notify("Account Verified,Please Login Again", "success");

      await fetch("http://localhost:8000/auth/verifyaccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setTimeout(() => {
        dispatch(setLogout());
      }, 3000);
      setIsOtpSent(false);
      setIsVerified(true);
      localStorage.setItem("is_verified", "true");
    } else notify("Account Verified,Please Login Again", "error");
  };
  return (
    <Formik
      onSubmit={handleOtpMatching}
      initialValues={initialValuesOtp}
      validationSchema={otpSchema}
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
            autoClose={3000}
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
            Email Verification
          </div>
          {/* OTP */}
          <div className="px-4 py-2">
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              OTP
            </label>
            <input
              type="text"
              name="otp"
              id="otp"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter old passcode"
              required={true}
              onBlur={handleBlur}
              value={values.oldpasscode}
              onChange={handleChange}
              error={Boolean(touched.otp) && Boolean(errors.otp)}
              helperText={touched.otp && errors.otp}
            />
            {touched.otp && errors.otp && (
              <div className="text-blue-700 text-md my-1 ml-2">
                {errors.otp}
              </div>
            )}
          </div>

          <div className="px-4 py-2">
            <button
              type="submit"
              className="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm text-center mr-2 mb-2 mt-2  rounded-lg  ease-in-out duration-500"
            >
              Verify Account
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default OtpModal;
