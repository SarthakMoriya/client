import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes("pdf") && (
        <div className="bg-[#03173d] w-full flex items-center justify-center">
          <div className="w-[90%]  flex items-center justify-around md:flex-row flex-col">
            <div className="text-white text-xs md:text-sm lg:text-lg my-4 md:my-1 text-center">
              © Copyright 2022. All Rights Reserved By{" "}
              <span className="text-secondary">
                Webcooks Technologies Pvt.{" "}
              </span>
              Ltd.
            </div>
            <div className="flex items-center justify-between text-white text-xs md:text-sm lg:text-lg">
              <div className="mx-4">Terms And Condition </div>
              <div className="">Privacy Policy</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
