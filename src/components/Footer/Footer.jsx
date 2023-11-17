import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#03173d] w-full h-[10vh] flex items-center justify-center">
      <div className="w-[90%] flex items-center justify-around">
        <div className="text-white">
          © Copyright 2022. All Rights Reserved By <span className="text-secondary">Webcooks Technologies Pvt. </span>
          Ltd.
        </div>
        <div className="flex items-center justify-between text-white">
          <div className="mx-4">Terms And Condition </div>
          <div className="">Privacy Policy</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
