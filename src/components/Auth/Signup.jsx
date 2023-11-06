import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik } from "formik";

import "react-toastify/dist/ReactToastify.css";
import {
  initialValuesRegister,
  registerSchema,
} from "../../schemas/authSchema";

const Signup = () => {
  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("passcode", values.secretkey);
    formData.append("picturePath", image ? image.name : "");

    const res = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (data.ok === false) {
      notify(data.message);
    } else {
      notify(data.message, "success");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      setIsOpen(true);
    }

  };

  const notify = (message, type = "error") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    handleSignup(values, onSubmitProps);
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
      <section className="bg-gray-50 dark:bg-gray-900  h-auto mt-4 absolute w-full">
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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0 h-auto">
          <Link
            href="#"
            className="flex items-center mb-6 mt-4 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            WebCooks
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create your account
              </h1>
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
                  onChange={(e) => setImage(e.target.files[0])}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  className="w-full mt-2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-500 dark:focus:ring-primary-800"
                  onClick={handleImageUpload}
                  disabled={isImageUploaded ? true : false}
                >
                  {isImageUploaded ? "Image Uploaded" : "Upload Image"}
                </button>
              </div>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesRegister}
                validationSchema={registerSchema}
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
                    className="space-y-4 md:space-y-6"
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    {/* USERNAME FIELD */}
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        onBlur={handleBlur}
                        value={values.username}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        error={
                          Boolean(touched.username) && Boolean(errors.username)
                        }
                        helperText={touched.username && errors.username}
                      />
                      {touched.username && errors.username && (
                        <div className="text-blue-700 text-md my-1 ml-2">
                          {errors.username}
                        </div>
                      )}
                    </div>
                    {/* EMAIL FIELD */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                      {touched.email && errors.email && (
                        <div className="text-blue-700 text-md my-1 ml-2">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    {/* PASSWORD FIELD */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        error={
                          Boolean(touched.password) && Boolean(errors.password)
                        }
                        helperText={touched.password && errors.password}
                      />
                      {touched.password && errors.password && (
                        <div className="text-blue-700 text-md my-1 ml-2">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    {/* SECRET KEY FIELD */}
                    <div>
                      <label
                        htmlFor="secretkey"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Secret Key
                      </label>
                      <input
                        type="password"
                        name="secretkey"
                        id="secretkey"
                        placeholder="••••••••"
                        onBlur={handleBlur}
                        value={values.secretkey}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        error={
                          Boolean(touched.secretkey) &&
                          Boolean(errors.secretkey)
                        }
                        helperText={touched.secretkey && errors.secretkey}
                      />
                      {touched.secretkey && errors.secretkey && (
                        <div className="text-blue-700 text-md my-1 ml-2">
                          {errors.secretkey}
                        </div>
                      )}
                    </div>
                    {/* SIGNUP BUTTON */}
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-500 dark:focus:ring-primary-800"
                    >
                      Sign up
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        href="#"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign In
                      </Link>
                    </p>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
      {isOpen && (
        <div
          id="default-modal"
          className=" absolute w-1/2 translate-x-[50%] translate-y-[90%]"
        >
          <div class="relative ">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Terms of Service
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-6 space-y-6">
                <p class="text-base leading-relaxed   text-white">
                  Your account request has been sent to admin. Wait for your
                  account's approval by the Admin
                </p>
              </div>
              <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
