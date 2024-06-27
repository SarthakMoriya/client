import React, { useState } from 'react';
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { averageCourse } from '../../utils/courseAverageCalculator';

const BarPerformanceChart = ({ averageData, individualData,course }) => {
  const [isValidAverage, setIsValidAverage] = useState(false)
  const records=useSelector(state=>state.record)
  const id=useParams();
  const average=averageCourse({records,courseName:course,id});

  const data = [
    { category: course, average: average, individual: individualData.value },
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
        <Bar dataKey="average" fill="#FFD700" barSize={30} name={!isNaN(average)?"Average Performance":"No Records Founds"} />
        <Bar dataKey="individual" fill="#03173d" barSize={30} name="Your Performance" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarPerformanceChart;
