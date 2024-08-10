import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import "react-toastify/dist/ReactToastify.css";
import { setLogout } from "../../state";
import { BASE_URL } from "../../api";

const otpSchema = yup.object().shape({
  otp: yup.string().required("Please enter OTP"),
});

const initialValuesOtp = { otp: "" };

const OtpModal = ({ otp, setIsOtpSent, setIsVerified }) => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user._id);
  const notify = (message, type = "error") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };

  const handleOtpMatching = async (values, onSubmitProps) => {
    if (otp === values.otp) {
      notify("Account Verified,Please Login Again", "success");

      await fetch(`${BASE_URL}/auth/verifyaccount`, {
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
  const handleClose=()=>{
    setIsOtpSent(false);
  }
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
          className=" w-screen border-2 rounded-lg bg-white z-10 absolute top-[25%] left-0"
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
          <div className="text-blue font-extrabold text-2xl absolute top-4 left-4 cursor-pointer" onClick={handleClose}>X</div>
          <div className="text-center font-bold text-blue text-2xl my-4">
            Email Verification
          </div>
          {/* OTP */}
          <div className="px-4 py-2">
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium text-blue "
            >
              OTP
            </label>
            <input
              type="text"
              name="otp"
              id="otp"
              className="bg-blue border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
              className="bg-secondary border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"

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
