import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import user from "../../assets/user.png";
import { BASE_URL } from "../../api";

const Sidebar = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  const fetchRecords = async () => {
    const results = await fetch(`${BASE_URL}/records/getrecords`);
    const res = await results.json();
    setRecords(res);
  };
  useEffect(() => {
    fetchRecords();
  }, []);
  const handleRecordClick = (id) => {
    navigate(`/record/${id}`);
  };
  return (
    <motion.div className="w-[30%] border-4 border-primary dark:border-white hidden md:block text-blue dark:text-white dark:bg-gray-800">
      {records?.length > 0 &&
        records?.map((record) => {
          return (
            <motion.div
              whileInView={{ y: [100, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className=" flex items-center border border-primary dark:border-white bg-[#e6e6e6] dark:bg-gray-900"
              key={record?._id}
              onClick={() => {
                handleRecordClick(record?._id);
              }}
            >
              <div className="w-[50%] p-2 rounded-lg flex items-center cursor-pointer">
                <img
                  src={record?.imageName ? `${record?.imageName}` : user}
                  alt=""
                  className="w-10 h-10  rounded-full"
                />
                <div className=" p-1 lg:p-2 lg:font-semibold  capitalize ml-4 text-center">
                  Id:{record?.studentName}
                </div>
              </div>
              <div className="flex items-center w-[50%] p-2 lg:justify-center justify-end ">
                <button
                  type="button"
                  onClick={() => {
                    handleRecordClick(record?._id);
                  }}
                  className=" bg-secondary dark:bg-gray-300 hover:bg-blue-800 dark:hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-2.5 py-1  mr-1 mb-1 mt-1 lg:px-5 lg:py-2.5 text-center lg:mr-2 lg:mb-2 lg:mt-2 md:w[50%] lg:w-[95%] lg:rounded-lg  ease-in-out duration-500"
                >
                  View
                </button>
              </div>
            </motion.div>
          );
        })}
      {records?.length === 0 && (
        <div className="text-3xl text-center text-white w-full p-2">
          NO RECORDS{" "}
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
