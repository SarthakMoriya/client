import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StudentCardSkeleton = () => {
  return (
    <div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col w-[100%] md:w-[70%] lg:w-[45%] max-h-[50vh] h-[100%] shadow-2xl rounded-lg mr-4 mb-4 ml-4  bg-white px-4 py-6 "
    >
      <div className="flex gap-2 m-2 min-h-[80%] ">
        <Skeleton circle={true} width={200} height={150}  />

        <div className="info gap-4 flex flex-col items-start justify-start  border-black text-blue ">
          <Skeleton width={200} height={20} />
          <Skeleton width={200} height={20} />
          <Skeleton width={200} height={20} />
          <Skeleton width={200} height={20} />

        </div>
      </div>
      <div className="flex p-2 lg:flex-row flex-col gap-8">
        <Skeleton width={200} height={40} />
        <Skeleton width={200} height={40}/>
        
      </div>
    </div>
  );
};

export default StudentCardSkeleton;
