import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fallbackPic from "./user.png";
import UpdatePassword from "./UpdatePassword";
import UpdatePasscode from "./UpdatePasscode";
import Student from "./Student";

const MyPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [isUpdatePasscode, setIsUpdatePasscode] = useState(false);
  const [teacherRecords, setTeacherRecords] = useState([]);

  const fetchStudents = async () => {
    console.log(user?._id);
    const data = await fetch(
      `http://localhost:8000/records/getstudents/${user?._id}`
    );
    const res = await data.json();
    setTeacherRecords(res.records);
    console.log(res)
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div className="bg-gray-900 min-h-[100vh] mt-5">
      {user?._id && (
        <div className="flex   border-2 ">
          <div className="flex m-2 w-[100%] h-[40vh] border ">
            <div className="image flex p-4 rounded-full text-white">
              <img
                src={
                  user?.picturePath
                    ? `http://localhost:8000/assets/${user?.picturePath}`
                    : fallbackPic
                }
                alt="user"
                className="rounded-full"
              />
            </div>
            <div className="info flex flex-col  justify-center  text-white">
              <div className="mx-4 my-2 font-normal  text-3xl">
                Name: {user?.username}
              </div>
              <div className="mx-4 my-2 font-normal text-xl  text-white">
                Email: {user?.email}
              </div>
            </div>
            <div className="text-white  mt-6  flex flex-col">
              <button
                type="button"
                onClick={() => {
                  setIsUpdatePassword(true);
                }}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2  rounded-lg  ease-in-out duration-500"
              >
                Update Password
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsUpdatePasscode(true);
                }}
                className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
              >
                Update Passcode
              </button>
              <button
                type="button"
                className="w-full text-white  bg-blue-800 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg "
              >
                Edit Info
              </button>
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

      {/* TEACHER'S STUDENTS */}
      <div className="text-center text-3xl text-white w-full uppercase my-4">Your Students</div>
      {teacherRecords.length > 0 && teacherRecords.map((stu) => <Student key={stu?._id} student={stu}/>)}
      {teacherRecords.length ===0 && <div className="text-center text-3xl text-white w-full ">No Student Records Found!</div>}
    </div>
  );
};

export default MyPanel;
