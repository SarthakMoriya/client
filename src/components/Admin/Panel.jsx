import React, { useEffect, useState } from "react";
import pic from "../../assets/user.png";
import {useSelector} from 'react-redux'
import TeacherRow from "./TeacherRow";
import { BASE_URL } from "../../api";

const Panel = () => {
  const {token}=useSelector(state=>state.auth);
  console.log(token)
  const [unapprovedAccounts, setUnapprovedAccounts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const fetchAccounts = async () => {
    const res = await fetch(
      `${BASE_URL}/auth/admin/getunapprovedaccounts`
    );
    const data = await res.json();
    const acc = await fetch(`${BASE_URL}/auth/admin/getallaccounts`);
    const accs = await acc.json();
    setAccounts(accs);
    setUnapprovedAccounts(data);
  };
  const handleApprove = async (acc) => {
    console.log(acc);
    await fetch(`${BASE_URL}/auth/admin/approveaccounts/${acc._id}`,{
      headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    // window.location.reload();
    const updatedUnapprovedAccounts = unapprovedAccounts.filter(
      (account) => account._id !== acc._id
    );
    console.log(updatedUnapprovedAccounts);
    setUnapprovedAccounts(updatedUnapprovedAccounts);
  };
  const handleDelete = async (acc) => {
    console.log(acc);
    await fetch(
      `${BASE_URL}/auth/admin/deleteunapproveaccount/${acc._id}`
    );
    window.location.reload();
  };
  useEffect(() => {
    fetchAccounts();
  }, []);
  return (
    <div className="bg-primary min-h-screen border border-secondary ">
      {unapprovedAccounts?.length !== 0 && (
        <div className="flex items-center justify-center">
        <div className="border-secondary border-b-4  text-2xl font-semibold text-white my-4">
          Pending Requests
        </div>
      </div>
      )}
      
      {unapprovedAccounts?.length !== 0 && (
        <div className="bg-gray-900 mt-3">
          {unapprovedAccounts?.map((acc) => (
            <TeacherRow key={acc?._id} acc={acc} />
          ))}
        </div>
      )}
      <div className=" p-2">
        <div className="flex items-center justify-center">
          <div className="border-secondary border-b-4  text-2xl font-semibold text-white my-4">
            All Accounts
          </div>
        </div>
        {accounts?.map((acc) => {
          return (
            <div className="bg-white text-blue" key={acc?._id}>
              <div className=" flex items-center border">
                <div className="w-[50%] p-2 rounded-lg flex items-center cursor-pointer">
                  <img
                    src={
                      acc?.picturePath
                        ? `${acc?.picturePath}`
                        : pic
                    }
                    className="w-10 h-10 rounded-full"
                    alt="pic"
                  />
                  <div className="md:hidden lg:block p-2 sm:font-semibold  capitalize sm:ml-4 text-sm sm:text-base">
                    Name:{acc?.username}
                  </div>
                  <div className="hidden md:block p-2 sm:font-semibold lowercase  sm:ml-4 text-sm sm:text-base">
                    Email:{acc?.email}
                  </div>
                </div>
                <div className="flex items-center w-[50%] p-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleApprove(acc);
                    }}
                    disabled={acc?.isAdminApprovedAccount ? "true" : "false"}
                    className={`text-white bg-blue hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-2.5 sm:px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-48 rounded-lg  ease-in-out duration-500 ${
                      acc?.isAdminApprovedAccount
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {acc.isAdminApprovedAccount
                      ? "Approved"
                      : "Approve Account"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(acc);
                    }}
                    className="text-white bg-secondary hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-2.5 sm:px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-48 rounded-lg  ease-in-out duration-500"
                  >
                    {acc?.isAdminApprovedAccount
                      ? "Delete Account"
                      : "Reject Account"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Panel;
