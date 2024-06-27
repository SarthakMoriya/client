import { overallPercentage } from "./gradeCalculator";

export const averageCourse = ({ records, courseName, id }) => {

  const courseRecords = records?.records?.filter(
    (rec) => {
      return rec.studentCourse?.toLowerCase() === courseName?.toLowerCase() && rec._id !== id.id}
  );
  let validRecords=0;
  let totalPercentage =0;
  courseRecords.forEach(record =>{
    const percentage=overallPercentage(record)
    if(!isNaN(percentage)){
      totalPercentage += percentage;
      validRecords++;
    }

  })

  return totalPercentage/validRecords;
};
