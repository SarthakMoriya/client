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


  return (
    <ResponsiveContainer width="90%" height={300}>
      <LineChart data={examData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0,100]}/>
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
          stroke="#FFD700"
          dot={{ stroke: "#03173d", strokeWidth: 3, r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GrowthChart;
