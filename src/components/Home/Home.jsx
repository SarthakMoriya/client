import React from "react";
import GetRecords from "./GetRecords";
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
  return (
    <div className="bg-gray-900 flex mt-4 min-h-[100vh]">
      <GetRecords />
      <Sidebar />
    </div>
  );
};

export default Home;
