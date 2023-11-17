import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarPerformanceChart = ({ averageData, individualData }) => {
  const data = [
    { category: 'Category A', average: averageData.value, individual: individualData.value },
    // Add more categories as needed
  ];

  return (
    <ResponsiveContainer width="50%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="average" fill="#FF6600" barSize={30} name="Average Performance" />
        <Bar dataKey="individual" fill="#82ca9d" barSize={30} name="Individual Performance" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarPerformanceChart;
