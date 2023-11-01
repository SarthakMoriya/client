import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const UpdatePasscode = ({ user, setIsUpdatePasscode }) => {
  const [oldPasscode, setOldPasscode] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/auth/changepasscode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPasscode, newPasscode, id: user?._id }),
    });
    const data = await res.json();
    if (data.ok) {
      notify(data.message, "success");
      setTimeout(() => {
        setIsUpdatePasscode(false);
      }, 1000);
    }else{
      notify(data.message, "error");
    }
  };

  const notify = (message, type = "error") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };
  return (
    <form className="w-[50vw]  min-h-[50vh] border-2 rounded-lg bg-gray-900 z-10 relative translate-x-[50%] translate-y-[-50%]">
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
          name="password"
          id="passwordold"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter old passcode"
          required={true}
          value={oldPasscode}
          onChange={(e) => {
            setOldPasscode(e.target.value);
          }}
        />
      </div>
      {/* NEW PASSWORD */}
      <div className="px-4 py-2">
        <label
          htmlFor="newpassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          New Passcode
        </label>
        <input
          type="password"
          name="newpassword"
          id="newpassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter new passcode"
          required={true}
          value={newPasscode}
          onChange={(e) => {
            setNewPasscode(e.target.value);
          }}
        />
      </div>
      {/* CONFIRM NEW PASSWORD */}
      <div className="px-4 py-2">
        <label
          htmlFor="passwordconfirm"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm Passcode
        </label>
        <input
          type="password"
          name="password"
          id="passwordconfirm"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Confirm new passcode"
          required={true}
          value={confirmPasscode}
          onChange={(e) => {
            setConfirmPasscode(e.target.value);
          }}
        />
      </div>
      <div className="px-4 py-2">
        <button
          type="submit"
          onClick={handleUpdatePassword}
          className="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm text-center mr-2 mb-2 mt-2  rounded-lg  ease-in-out duration-500"
        >
          Update Password
        </button>
      </div>
    </form>
  );
};

export default UpdatePasscode;
