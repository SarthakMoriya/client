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
  useEffect(() => {
    fetchCertificate();
  }, []);
  return<div className="flex items-center justify-center w-screen h-screen">
    {record?<img src={`http://localhost:8000/assets/${record?.certificate}`} alt="Certificate" className="w-[70%] h-[70%]" />:"n o imhge"  }
  </div>
};

export default Certificate;
