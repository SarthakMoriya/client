import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { Formik } from "formik";
import {
  initialValuesAdminLogin,
  adminloginSchema,
} from "../../schemas/authSchema";
import { notify } from "../../utils/notification";
import { ToastContainer } from "react-toastify";
import Warning from "../Icons/Warning";

const AdminLogin = () => {
  const distpatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (values, onSubmitProps) => {
    const res = await fetch("http://localhost:8000/auth/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email, password: values.password }),
    });
    const data = await res.json();
    console.log(data);
    if (data === "Invalid Credentials") {
      setError("Invalid Credentials");
    } else {
      setError("");
      distpatch(
        setLogin({
          user: data.user,
          token: data.token,
          secretkey: data.secretkey,
        })
      ); 
      localStorage.setItem("is_verified", data?.user?.verified);
      navigate("/");
    }
  };
  return (
    <>
      <section className="bg-primary ">
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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <Link className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            WebCooks
          </Link>
          <div className="w-full bg-white rounded-lg shadow border border-secondary md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-blue capitalize">
                Sign in to your Admin account
              </h1>
              {error && (
                <div className="flex items-center gap-4">
                  <Warning className="text-red-600 text-sm" />
                  <div className="text-red-600 text-sm">{error}</div>
                </div>
              )}
              <Formik
                onSubmit={handleLogin}
                initialValues={initialValuesAdminLogin}
                validationSchema={adminloginSchema}
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
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-blue"
                      >
                        Admin email
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
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-blue"
                      >
                        Admin Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        placeholder="••••••••"
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

                    <button
                      type="submit"
                      className="w-full text-white bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-500 dark:focus:ring-primary-800"
                    >
                      Sign in
                    </button>
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

export default AdminLogin;
