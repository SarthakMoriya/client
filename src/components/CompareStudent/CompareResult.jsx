import React, { useEffect, useState } from "react";
import { fetchRecord } from "../../utils/fetchRecords";
import { useParams } from "react-router-dom";
import {
  findCommonExamsWithMarks,
  findWinner,
} from "../../utils/findCommonExams";
import LineChart from "../Charts/LineChart";
import BarChartCanvas from "../Charts/BarChartCanvas";

const CompareResult = () => {
  const { id1, id2 } = useParams();
  const [records, setRecords] = useState([]);
  const [commonExams, setCommonExams] = useState([]);
  const [error, setError] = useState(false);
  const fetchRecords = async () => {
    let rec1 = await fetchRecord(id1);
    let rec2 = await fetchRecord(id2);
    console.log(rec1.data.data, rec2.data.data);
    console.log(rec1.status, rec2.status)
    if (rec1.status === 200 && rec2.status === 200) {
      setRecords((prev) => [ rec1.data.data, rec2.data.data]);
      console.log(records);
      getCommonExams(rec1.data.data, rec2.data.data);
    } else {
      setError("Error fetching records");
      alert("Error fetching records");
    }
  };

  const getCommonExams = (r1,r2) => {
    console.log(records[0], records[1]);
    setCommonExams(
      findCommonExamsWithMarks(r1?.exams, r2?.exams)
    );
    console.log(commonExams);
  };
  useEffect(() => {
    fetchRecords();
  }, []);
  return (
    <>
      <br />
      <br />
      <div className="flex items-center justify-center">
        <div className="border-secondary border-b-4  text-2xl font-semibold text-slate-700 my-4">
          Compare Results
        </div>
      </div>
      <br />
      <br />
      <div className="w-screen items-center justify-center flex flex-wrap">
        <div className="overflow-x-auto shadow-md w-3/4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Exam Name
                </th>
                <th scope="col" className="text-green-500 px-6 py-3">
                  {records[0]?.studentName}
                </th>
                <th scope="col" className="text-red-500 px-6 py-3">
                  {records[1]?.studentName}
                </th>
                <th scope="col" className="text-amber-400 px-6 py-3">
                  Winner
                </th>
              </tr>
            </thead>
            <tbody>
              {commonExams?.length &&
                commonExams.map((exam) => (
                  <tr
                    key={exam.name}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {exam?.name}
                    </th>
                    <td className="px-6 py-4">{exam.student1.mo}/{exam.student1.mt}</td>
                    <td className="px-6 py-4">{exam.student2.mo}/{exam.student2.mt}</td>
                    <td className="px-6 py-4 text-white font-bold text-xl">
                      {findWinner(
                        exam?.student1?.mo,
                        exam?.student2?.mo,
                        records[0]?.studentName,
                        records[1]?.studentName
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <br />
      </div>
      <br /><br />
      <LineChart
        exams={commonExams}
        s1={records[0]?.studentName}
        s2={records[1]?.studentName}
      />
      <br />
      <br />
      <BarChartCanvas records={records}/>
    </>
  );
};

export default CompareResult;
