import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../api";

const ForgotPassword = ({ forgot, setForgot }) => {
  const [otp, setOtp] = useState("");
  const [otpRecieved, setOtpRecieved] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSendOtp = async () => {
    const res = await fetch(`${BASE_URL}/auth/verifyemail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      setOtp(data.otp);
      notify("OTP SENT SUCCESSFULLY", "success");
    } else {
      notify(data.message, "error");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    console.log(otp);
    if (otpRecieved !== otp) {
      alert("Incorrect OTP");
    } else {
      if (password !== confirmPassword) {
        alert("Please Enter Same Passwords");
      } else {
        //request
        const res = await fetch(`${BASE_URL}/auth/forgotpassword`, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ password, email }),
        });

        const result=await res.json();
        console.log(result);
        alert("Password Changed");
        setForgot(false);
      }
    }
  };

  const notify = (message, type = "error") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };

  const handleClose = () => {
    setForgot(false);
  };
  return (
    <div className="w-[80vw] sm:w-[50vw]  sm:min-h-[50vh] border-2 border-secondary rounded-lg bg-white z-10 absolute top-[15%] sm:top-[20%] sm:left-[25%] left-[10%]">
      <form onSubmit={handleUpdatePassword} className="">
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
        <div
          className="text-blue font-extrabold text-2xl absolute top-4 left-4 cursor-pointer"
          onClick={handleClose}
        >
          X
        </div>

        {/* OTP */}
        <div className="px-4 py-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-blue"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-blue border border-secondary text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="Enter email"
            required={true}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="px-4 py-2">
          <button
            type="button"
            onClick={handleSendOtp}
            className="bg-secondary border border-secondary text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          >
            Send OTP
          </button>
        </div>
        {/* OTP */}
        <div className="px-4 py-2">
          <label
            htmlFor="otp"
            className="block mb-2 text-sm font-medium text-blue"
          >
            Otp
          </label>
          <input
            type="text"
            name="otp"
            id="otp"
            className="bg-blue border border-secondary text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="Enter OTP Recieved"
            required={true}
            onChange={(e) => {
              setOtpRecieved(e.target.value);
            }}
          />
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
            className="bg-blue border border-secondary text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="Enter new password"
            required={true}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
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
            className="bg-blue border border-secondary text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="Confirm Password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
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
    </div>
  );
};

export default ForgotPassword;
