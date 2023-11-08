import React, { useEffect, useState } from "react";
import pic from "../../assets/user.png";

import TeacherRow from "./TeacherRow";

const Panel = () => {
  const [unapprovedAccounts, setUnapprovedAccounts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const fetchAccounts = async () => {
    const res = await fetch(
      "http://localhost:8000/auth/admin/getunapprovedaccounts"
    );
    const acc = await fetch("http://localhost:8000/auth/admin/getallaccounts");
    const accs = await acc.json();
    const data = await res.json();
    console.log(data,accs)
    setUnapprovedAccounts(data);
    setAccounts(accs);
  };
  const handleApprove = async (acc) => {
    await fetch(`http://localhost:8000/auth/admin/approveaccounts/${acc._id}`);
    window.location.reload();
  };
  const handleDelete = async (acc) => {
    await fetch(`http://localhost:8000/auth/admin/deleteunapproveaccount/${acc._id}`);
    window.location.reload();
  };
  useEffect(() => {
    fetchAccounts();
  }, []);
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="text-3xl text-center  border-2 mt-5 text-white p-4 bg-blue-700 mb-3">PENDING REQUESTS</div>
      {unapprovedAccounts?.length === 0 ? (
        <div className="text-3xl text-center  border-2 mt-5 text-white p-4">
          NO PENDING REQUESTS
        </div>
      ) : (
        <div className="bg-gray-900 mt-3">
          {unapprovedAccounts?.map((acc) => (
            <TeacherRow key={acc?._id} acc={acc} />
          ))}
        </div>
      )}
      <div className="text-3xl text-center  border-2 mt-5 text-white p-4 bg-blue-700 mb-3">
        ALL ACCOUNTS
      </div>
      {accounts?.map((acc) => {
        return (
          <div className="" key={acc?._id}>
            <div className=" flex items-center border">
              <div className="w-[50%] p-2 rounded-lg flex items-center cursor-pointer">
                <img
                  src={
                    acc.picturePath
                      ? `http://localhost:8000/assets/${acc?.picturePath}`
                      : pic
                  }
                  className="w-10 h-10 rounded-full"
                  alt="pic"
                />
                <div className=" p-2 font-semibold text-white capitalize ml-4">
                  Name:{acc?.username}
                </div>
                <div className=" p-2 font-semibold text-white  ml-4">
                  Email:{acc?.email}
                </div>
              </div>
              <div className="flex items-center w-[50%] p-2">
                <button
                  type="button"
                  onClick={() => {
                    handleApprove(acc);
                  }}
                  disabled={acc.isAdminApprovedAccount ? "true" : "false"}
                  className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-[95%] rounded-lg  ease-in-out duration-500 ${acc.isAdminApprovedAccount?"cursor-not-allowed":"cursor-pointer"}`}
                >
                  {acc.isAdminApprovedAccount ? "Approved" : "Approve Account"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(acc);
                  }}
                  className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-[95%] rounded-lg  ease-in-out duration-500"
                >
                  {acc.isAdminApprovedAccount?"Delete Account":"Reject Account"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Panel;
