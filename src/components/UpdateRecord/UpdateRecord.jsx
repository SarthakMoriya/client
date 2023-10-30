import React, { useState } from "react";

const UpdateRecord = () => {
  const [subs, setSubs] = useState(0);
  const [examname, setExamname] = useState("");
  const [totalmarks, setTotalmarks] = useState(0);
  const [marksobtained, setMarksobtained] = useState(0);
  let midTermMarks = 0;
  let midTermTotal = 0;

  const [exams, setExams] = useState([{}]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/records/createrecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentName: "Sarthak",
        studentCourse: "WEB DEV",
        dateEnrolled: "2023-01-11",
        exams: exams,
        midTermMarksObt: midTermMarks,
        midTermTotalMarks: midTermTotal,
        grade: "A",
      }),
    });
  };
  const handleExamDetails = () => {
    //Updating Exams array to add new Exam Details
    setSubs((prev) => prev - 1);
    setExams((prev) => [
      ...prev,
      { exam: examname, mt: totalmarks, mo: marksobtained },
    ]);
    midTermMarks += marksobtained;
    midTermTotal += totalmarks;

    //Resetting Exam Details
    setExamname("");
    setTotalmarks("");
    setMarksobtained("");
  };
  return (
    <>
    <h1>Update From</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="stuname">Student Name:</label>
        <input type="text" id="stuname" />
        <label htmlFor="coursename">Course Name:</label>
        <input type="text" id="coursename" />
        <label htmlFor="dateenrolled">Date Enrolled:</label>
        <input type="date" id="dateenrolled" />
        <label htmlFor="num_subjects">
          Enter Number of Subjects for Mid Term:
        </label>
        <input
          type="number"
          id="num_subjects"
          onChange={(e) => setSubs(e.target.value)}
        />

        {subs >= 1 && (
          <div>
            <label htmlFor="">Enter Exam Name:</label>
            <input
              type="text"
              value={examname}
              onChange={(e) => setExamname(e.target.value)}
            />
            <label htmlFor="">Marks Obtained:</label>
            <input
              type="number"
              value={marksobtained}
              onChange={(e) => setMarksobtained(e.target.value)}
            />
            <label htmlFor="">Total Marks:</label>
            <input
              type="number"
              value={totalmarks}
              onChange={(e) => setTotalmarks(e.target.value)}
            />
            <button type="button" onClick={handleExamDetails}>
              add
            </button>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UpdateRecord;
