import React from "react";
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
  const navigate = useNavigate();

  const handleSignup = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("passcode", values.secretkey);
    formData.append("picturePath", values.picture.name);
    console.log(formData);
    const res = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    if (data.ok === false) {
      notify(data.message);
    } else {
      notify(data.message, "success");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const notify = (message, type = "error") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    handleSignup(values, onSubmitProps);
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900  h-auto mt-4">
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
            Logo
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create your account
              </h1>
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
                        onBlur={handleBlur}
                        value={values.picture}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        error={
                          Boolean(touched.picture) && Boolean(errors.picture)
                        }
                        helperText={touched.picture && errors.picture}
                      />
                       {touched.picture && errors.picture && (
                        <div className="text-blue-700 text-md my-1 ml-2">
                          {errors.picture}
                        </div>
                      )}
                    </div>
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
    </>
  );
};

export default Signup;
