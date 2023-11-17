import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GrowthChart = ({examData}) => {
  console.log(examData)
  // const examData = [
  //   { examNumber: 1, examName: "First Exam", score: 100, totalMarks: 100 },
  //   { examNumber: 2, examName: "Second Exam", score: 10, totalMarks: 10 },
  //   { examNumber: 3, examName: "Third Exam", score: 50, totalMarks: 50 },
  //   { examNumber: 4, examName: "Fourth Exam", score: 200, totalMarks: 200 },
  //   { examNumber: 5, examName: "Fifth Exam", score: 100, totalMarks: 100 },
  //   // Add more data as needed
  // ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={examData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => [
            `${props.payload.name}: ${props.payload.mo} / ${props.payload.mt}`,
          ]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="mo"
          name="Exam Score"
          stroke="#FF6600"
          dot={{ stroke: "#FF6600", strokeWidth: 3, r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GrowthChart;
