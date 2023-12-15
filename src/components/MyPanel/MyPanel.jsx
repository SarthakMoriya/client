import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fallbackPic from "./user.png";
import UpdatePassword from "./UpdatePassword";
import UpdatePasscode from "./UpdatePasscode";
import Student from "./Student";
import OtpModal from "./OtpModal";

const MyPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [isUpdatePasscode, setIsUpdatePasscode] = useState(false);
  const [teacherRecords, setTeacherRecords] = useState([]);
  const [isVerified, setIsVerified] = useState(user?.verified); //Boolean(localStorage.getItem('is_verified'))
  const [isOtpSent, setIsOtpSent] = useState(false);
console.log(user)
  const fetchStudents = async () => {
    const data = await fetch(
      `http://localhost:8000/records/getstudents/${user?._id}`
    );
    const res = await data.json();
    setTeacherRecords(res.records);
  };
  const verifyEmail = async () => {
    const res = await fetch(`http://localhost:8000/auth/verifyemail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user?.email }),
    });
    const data = await res.json();
    setIsOtpSent(data.otp);
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div className="bg-background min-h-[100vh] mt-5 mx-6">
      <div className="flex items-center justify-center">
        <div className="border-secondary border-b-4  text-2xl font-semibold text-blue mb-4">
          PERSONAL DETAILS
        </div>
      </div>
      {user?._id && (
        <div className="flex">
          <div className="flex m-2 w-screen h-[40vh] border ">
            <div className=" flex">
              <img
                src={
                  user?.picturePath
                    ? `http://localhost:8000/assets/${user?.picturePath}`
                    : fallbackPic
                }
                alt="user"
                className="w-full"
              />
            </div>
            <div className="info flex flex-col w-[60%] text-black  ">
              <div className="px-4 py-2 font-normal  text-xl border">
                TeacherId: {user?._id}
              </div>
              <div className="px-4 py-2 font-normal  text-xl border">
                Name: {user?.username}
              </div>
              <div className="px-4 py-2 font-normal  text-xl border">
                Email: {user?.email}
              </div>
              <div className="px-4 py-2 font-normal  text-xl border">
                JoinedOn: {user?.createdAt?.slice(0,10)}
              </div>
              <div className="px-4 py-2 font-normal  text-xl border">
                Students Taught: {teacherRecords?.length}
              </div>
            </div>
            <div className="text-white  w-[20%]  flex flex-col">
              <button
                type="button"
                onClick={() => {
                  setIsUpdatePassword(true);
                }}
                className="text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg"
              >
                Update Password
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsUpdatePasscode(true);
                }}
                className="text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg"
              >
                Update Passcode
              </button>

              {isVerified === false && (
                <span
                  type="button"
                  onClick={verifyEmail}
                  disabled={isVerified ? false : true}
                  className="text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg"
                >
                  Unverified Account
                </span>
              )}
              {isVerified === true && (
                <span
                  type="button"
                  className="text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg"
                >
                  Verifed Account
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      {isUpdatePassword && (
        <UpdatePassword user={user} setIsUpdatePassword={setIsUpdatePassword} />
      )}
      {isUpdatePasscode && (
        <UpdatePasscode user={user} setIsUpdatePasscode={setIsUpdatePasscode} />
      )}
      {isOtpSent && (
        <OtpModal
          otp={isOtpSent}
          setIsOtpSent={setIsOtpSent}
          setIsVerified={setIsVerified}
        />
      )}

      {/* TEACHER'S STUDENTS */}
      <div className="flex items-center justify-center">
        <div className="border-secondary border-b-4  text-2xl font-semibold text-blue my-4">
          YOUR STUDENTS
        </div>
      </div>
      {teacherRecords.length > 0 &&
        teacherRecords.map((stu) => <Student key={stu?._id} student={stu} />)}
      {teacherRecords.length === 0 && (
        <div className="text-center text-3xl text-white w-full ">
          No Student Records Found!
        </div>
      )}
    </div>
  );
};

export default MyPanel;
