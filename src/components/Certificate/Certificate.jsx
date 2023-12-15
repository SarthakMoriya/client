import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Certificate = () => {
  const [record, setRecord] = useState("");
  const { id } = useParams();

  const fetchCertificate = async () => {
    const record = await fetch(`http://localhost:8000/records/getrecord/${id}`);
    const data = await record.json();
    setRecord(data.data);
  };
  const handleDownload = () => {
    // Replace 'http://localhost:8000/assets/${record?.certificate}' with the actual file URL
    const fileUrl = `http://localhost:8000/assets/${record?.certificate}`;

    // Create a link element
    const link = document.createElement("a");

    // Set the href attribute to the file URL
    link.href = fileUrl;

    // Set the download attribute with the desired file name
    link.download = "downloaded_file.txt";

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchCertificate();
  }, []);
  return (
    <div className="flex items-center justify-center w-screen h-screen flex-col">
      <button
        onClick={handleDownload}
        className="text-white bg-secondary hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2  rounded-lg  ease-in-out duration-500"
      >
        Download File
      </button>
      {record ? (
        <img
          src={`http://localhost:8000/assets/${record?.certificate}`}
          alt="Certificate"
          className="w-[70%] h-[70%]"
        />
      ) : (
        "n o imhge"
      )}
    </div>
  );
};

export default Certificate;
