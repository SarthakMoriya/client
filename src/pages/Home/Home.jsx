import React, { useEffect } from "react";
import {useLocation} from "react-router-dom"
import GetRecords from "./GetRecords";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Update the title based on the current route
    document.title = `Webcooks `;
  }, [location.pathname]);
  return (
    <div className=" flex min-h-[100vh]">
      <GetRecords />
      <Sidebar />
    </div>
  );
};

export default Home;
