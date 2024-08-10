import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { Formik } from "formik";
import { initialValuesLogin, loginSchema } from "../../schemas/authSchema";
import { motion } from "framer-motion";
import ForgotPassword from "./ForgotPassword";
// import Warning from "../Icons/Warning";
import { BASE_URL } from "../../api";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const Login = () => {
  const distpatch = useDispatch();
  const navigate = useNavigate();
  const [forgot, setForgot] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values, onSubmitProps) => {
    setError("")
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email, password: values.password }),
    });
    const data = await res.json();
    if (data?.user?.isAdminApprovedAccount === false) {
      setError("Account isn't approved by admin");
    } else {
      if (data.ok) {
        distpatch(setLogin({ user: data.user, token: data.token }));
        localStorage.setItem("is_verified", data.user.verified);
        navigate("/");
        setError("");
        onSubmitProps.resetForm();
      } else {
        setError("Invalid credentials...Please Try Again!");
      }
    }
  };
  return (
    <>
      {forgot && <ForgotPassword setForgot={setForgot} forgot={forgot} />}
      <motion.section className="bg-primary ">
        <motion.div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
          <motion.div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0  border-2 border-secondary">
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="p-6 space-y-4 md:space-y-6 sm:p-8"
            >
              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue md:text-2xl ">
                Sign in to your account
              </h1>
              {error && (
                <div className="flex items-center gap-4">
                  {/* <Warning className="text-red-600 text-sm" /> */}
                  <div className="text-red-600 text-sm">{error}</div>
                </div>
              )}
              <Formik
                onSubmit={handleLogin}
                initialValues={initialValuesLogin}
                validationSchema={loginSchema}
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
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-blue "
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
                        className="bg-gray-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                      {touched.email && errors.email && (
                        <motion.div className="text-blue-700 text-md my-1 ml-2">
                          {errors.email}
                        </motion.div>
                      )}
                    </motion.div>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-blue "
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        error={
                          Boolean(touched.password) && Boolean(errors.password)
                        }
                        helperText={touched.password && errors.password}
                      />
                      {touched.password && errors.password && (
                        <motion.div className="text-blue text-md my-1 ml-2">
                          {errors.password}
                        </motion.div>
                      )}
                    </motion.div>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="flex items-center justify-between"
                    >
                      <Link
                        className="text-sm font-medium text-primary-600 hover:underline text-blue"
                        onClick={() => {
                          setForgot(true);
                        }}
                      >
                        Forgot password?
                      </Link>
                    </motion.div>
                    <PrimaryButton text={"Sign In"} type="submit" />
                    <motion.p
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="text-sm font-light text-blue"
                    >
                      Don’t have an account yet?{" "}
                      <Link
                        to="/signup"
                        className="font-medium text-blue hover:underline "
                      >
                        Sign up
                      </Link>
                    </motion.p>
                  </form>
                )}
              </Formik>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default Login;
