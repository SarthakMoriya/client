import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const LineChart = (data) => {

  const options = {
    animationEnabled: true,
    title: {
      text: "Comparision Graph",
    },
    axisY: {
      title: "Marks",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "spline",
        name: `${data.s1}`,
        showInLegend: true,
        dataPoints: data?.exams?.map((exam) => {
          console.log(exam)
          return {y:Number(exam?.student1.mo),label:exam?.name};
        }),
        
      },
      {
        type: "spline",
        name: `${data.s2}`,
        showInLegend: true,
		dataPoints: data?.exams?.map((exam) => {
      console.log(exam)
			return {y:Number(exam?.student2.mo),label:exam?.name};
		  }),
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

export default LineChart;
