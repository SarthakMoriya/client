import CanvasJSReact from "@canvasjs/react-charts";
import { overallPercentage } from "../../utils/gradeCalculator";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const BarChartCanvas = ({records}) => {
    console.log(overallPercentage(records[0]))
  const options = {
    title: {
      text: "Overall Percentage",
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: [
          { label: `${records[0]?.studentName}`, y: Number(overallPercentage(records[0])) },
        ],
      },
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: [
          { label: `${records[1]?.studentName}`, y: Number(overallPercentage(records[1])) },
        ],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default BarChartCanvas;
