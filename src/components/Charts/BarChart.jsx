import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

const Chart = ({data}) => {

  const formattedData = data?.map(item => ({
    ...item,
    label: `${item?.name}\nTotal: ${item?.mt}\nObtained: ${item?.mo}`,
  }));

  return (
    <BarChart width={600} height={400} data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="mt" fill="#8884d8" barSize={30} name="Total Marks">
        {formattedData?.map((entry, index) => (
          <Label key={index} content={entry.label} position="top" />
        ))}
      </Bar>
      <Bar dataKey="mo" fill="#82ca9d" barSize={30} name="Obtained Marks">
        {formattedData?.map((entry, index) => (
          <Label key={index} content={entry.label} position="top" />
        ))}
      </Bar>
    </BarChart>
  );
};

export default Chart;
