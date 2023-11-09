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
  return<>
    {record?<img src={`http://localhost:8000/assets/${record.certificate}`}/>:"n o imhge" }
  </>
};

export default Certificate;
