import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import UpdatePassword from "./UpdatePassword";
import UpdatePasscode from "./UpdatePasscode";
import Student from "./Student";
import OtpModal from "./OtpModal";
import "./MyPanel.css";
import { notify } from "../../utils/notification";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase/firebase";
import { formatDate } from "../../utils/dateFormatter";
import { BASE_URL } from "../../api";
import { ToastContainer } from "react-toastify";
const MyPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [isUpdatePasscode, setIsUpdatePasscode] = useState(false);
  const [teacherRecords, setTeacherRecords] = useState([]);
  const [isVerified, setIsVerified] = useState(user?.verified); //Boolean(localStorage.getItem('is_verified'))
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  useEffect(() => {
    // Update the title based on the current route
    document.title = `Webcooks | MyPanel - ${user?.username}`;
  }, [location.pathname]);

  const fetchStudents = async () => {
    const data = await fetch(`${BASE_URL}/records/getstudents/${user?._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const res = await data.json();
    if (res.ok == false) {
      setError(res.message);
      notify(res.message);
      return;
    }
    setTeacherRecords(res?.records);
  };
  const verifyEmail = async () => {
    const res = await fetch(`${BASE_URL}/auth/verifyemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: user?.email }),
    });
    const data = await res.json();
    setIsOtpSent(data.otp);
  };
  const handleFileUpload = async () => {
    setLoading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name; // So no two users have same file
    const storageRef = ref(storage, fileName); //location+filename
    const uploadTask = uploadBytesResumable(storageRef, image); //finalStep
    console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        notify("Image Size must be less than 2mb");
        alert("Image Size must be less than 2mb");
        setLoading(false);
        setIsImageUploaded(false);
        console.log("eroooooooooooooor");
        return;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          setUrl(downloadUrl);
          setLoading(false);
          setIsImageUploaded(true);
        });
      }
    );
  };
  const handleSaveImage = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/auth/editimage/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ picturePath: url }),
      });

      if (response.ok) {
        alert("Image uploaded successfully", "success");
        setIsImageUploaded(false);
        setLoading(false);
      } else {
        alert("Error uploading Image");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert("Error uploading Image");
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div className="bg-background min-h-[100vh] mt-5 mx-3 sm:mx-6 md:mx-12 lg:mx-24 ">
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
      <div className="flex items-center justify-center">
        <div className="border-secondary border-b-4 text-xl md:text-xl lg:text-2xl font-semibold text-blue mb-4">
          PERSONAL DETAILS
        </div>
      </div>
      {user?._id && (
        <div className="flex ">
          <div className="flex m-2 w-screen lg:h-[40vh] border flex-col sm:flex-row">
            <div className=" flex">
              <img
                src={url ? url : user.picturePath}
                alt="user"
                className=" object-cover"
              />
            </div>
            <div className="info flex flex-col sm:w-[60%] text-black  ">
              <div className="px-4 py-2 font-normal text-sm sm:text-base md:text-xl border">
                TeacherId: {user?._id}
              </div>
              <div className="px-4 py-2 font-normal text-sm sm:text-base md:text-xl border">
                Name: {user?.username}
              </div>
              <div className="px-4 py-2 font-normal text-sm sm:text-base md:text-xl border">
                Email: {user?.email}
              </div>
              <div className="px-4 py-2 font-normal text-sm sm:text-base md:text-xl border">
                JoinedOn: {formatDate(user?.createdAt)}
              </div>
              <div className="px-4 py-2 font-normal text-sm sm:text-base md:text-xl border">
                Students Taught: {teacherRecords?.length}
              </div>
            </div>
            <div className="text-white  sm:w-[20%]  flex flex-col border">
              <button
                type="button"
                onClick={() => {
                  setIsUpdatePassword(true);
                }}
                className="text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg lg:w-56"
              >
                Update Password
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsUpdatePasscode(true);
                }}
                className="text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg lg:w-56"
              >
                Update Passcode
              </button>
              {isVerified === false && (
                <span
                  type="button"
                  onClick={verifyEmail}
                  disabled={isVerified ? false : true}
                  className="text-white mx-2 cursor-pointer bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2    ease-in-out duration-500 rounded-lg lg:w-56"
                >
                  Unverified Account
                </span>
              )}
              {isVerified === true && (
                <span
                  type="button"
                  className="text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2 ease-in-out duration-500 rounded-lg lg:w-56"
                >
                  Verifed Account
                </span>
              )}
              <label
                htmlFor="picture"
                className="text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2 ease-in-out duration-500 rounded-lg lg:w-56"
              >
                <input
                  type="file"
                  name="picture"
                  id="picture"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                Select Image
              </label>
              {image && (
                <button
                  type="button"
                  onClick={handleFileUpload}
                  disabled={loading}
                  className="text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2 ease-in-out duration-500 rounded-lg lg:w-56"
                >
                  {loading ? "Uploading..." : "Upload Image"}
                </button>
              )}
              {url && isImageUploaded && (
                <button
                  type="button"
                  onClick={handleSaveImage}
                  disabled={!isImageUploaded}
                  className="text-white mx-2 bg-secondary focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center mb-2 mt-2 ease-in-out duration-500 rounded-lg lg:w-56"
                >
                  {loading ? "Saving..." : " Save Image"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* TEACHER'S STUDENTS */}
      <div className="flex items-center justify-center">
        <div className="border-secondary border-b-4 text-xl md:text-xl lg:text-2xl font-semibold text-blue mb-4">
          YOUR STUDENTS
        </div>
      </div>
      {teacherRecords.length > 0 && error === "" && (
        <div className="mb-8 sm:mb-4">
          {teacherRecords.map((stu) => (
            <Student key={stu?._id} student={stu} />
          ))}
        </div>
      )}
      {teacherRecords.length === 0 && error ==="" && (
        <div className="text-center text-3xl text-blue-800 w-full ">
          No Student Records Found!
        </div>
      )}
      { error !=="" && (
        <div className="text-center text-3xl text-blue-800 w-full ">
          Failed to get Students Records
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
    </div>
  );
};

export default MyPanel;
