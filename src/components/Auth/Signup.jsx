import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  initialValuesRegister,
  registerSchema,
} from "../../schemas/authSchema";
import { notify } from "../../utils/notification";
import { motion } from "framer-motion";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase/firebase";
import { BASE_URL } from "../../api";

const Signup = () => {
  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("passcode", values.secretkey);
    formData.append("picturePath", url);

    const res = await fetch(`${BASE_URL}/auth/signup`, {
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
      }, 5000);
      setIsOpen(true);
    }
  };
  const handleFileUpload = async () => {
    setLoading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name; // So no two users have same file
    const storageRef = ref(storage, fileName); //location+filename
    const uploadTask = uploadBytesResumable(storageRef, image); //finalStep
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        notify("Image Size must be less than 2mb");
        setLoading(false);
        setIsImageUploaded(false)
        return;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setUrl(downloadUrl);
          setLoading(false);
          setIsImageUploaded(true)
        });
      }
    );
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-primary h-auto w-full">
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
        <motion.div className="flex flex-col items-center justify-center px-6 py-8  md:h-auto  h-auto md:mt-4 md:mb-8">
          <motion.div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-secondary border-2">
            <motion.div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <motion.h1
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="text-xl font-bold leading-tight tracking-tight text-blue md:text-2xl "
              >
                Create your account
              </motion.h1>
              {/* IMAGE FIELD */}
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <label
                  htmlFor="picture"
                  className="block mb-2 text-sm font-medium text-blue "
                >
                  Profile Photo
                </label>
                {url && (
                  <div className="flex items-center p-2">
                    <img
                      src={url}
                      alt="profile"
                      className="w-32 h-32 flex items-center justify-center border rounded-lg "
                    />
                  </div>
                )}
                <input
                  type="file"
                  name="picture"
                  id="picture"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  className="w-full mt-2 text-blue bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-500 dark:focus:ring-primary-800"
                  onClick={handleFileUpload}
                  disabled={isImageUploaded ? true : false}
                >
                  {isImageUploaded ? "Image Uploaded" : "Upload Image"}
                </button>
              </motion.div>
              <Formik
                onSubmit={handleSignup}
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
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-blue "
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
                        <motion.div className="text-blue-700 text-md my-1 ml-2">
                          {errors.username}
                        </motion.div>
                      )}
                    </motion.div>
                    {/* EMAIL FIELD */}
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    {/* PASSWORD FIELD */}
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1.4, ease: "easeInOut" }}
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
                        <motion.div className="text-blue text-md my-1 ml-2">
                          {errors.password}
                        </motion.div>
                      )}
                    </motion.div>
                    {/* SECRET KEY FIELD */}
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
                    >
                      <label
                        htmlFor="secretkey"
                        className="block mb-2 text-sm font-medium text-blue "
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
                        <motion.div className="text-blue text-md my-1 ml-2">
                          {errors.secretkey}
                        </motion.div>
                      )}
                    </motion.div>
                    {/* SIGNUP BUTTON */}
                    <motion.button
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1.9, ease: "easeInOut" }}
                      type="submit"
                      className="w-full text-blue bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-500"
                    >
                      Sign up
                    </motion.button>
                    <motion.p
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="text-sm font-light text-blue dark:text-gray-400"
                    >
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        href="#"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign In
                      </Link>
                    </motion.p>
                  </form>
                )}
              </Formik>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      {isOpen && (
        <motion.div
          id="default-modal"
          className=" absolute w-1/2 translate-x-[50%] translate-y-[90%]"
        >
          <motion.div className="relative ">
            <motion.div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <motion.div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Terms of Service
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
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
                  <span className="sr-only">Close modal</span>
                </button>
              </motion.div>
              <motion.div className="p-6 space-y-6">
                <p className="text-base leading-relaxed   text-white">
                  Your account request has been sent to admin. Wait for your
                  account's approval by the Admin
                </p>
              </motion.div>
              <motion.div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ok
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Signup;
