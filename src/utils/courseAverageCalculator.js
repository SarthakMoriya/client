import { overallPercentage } from "./gradeCalculator";

export const averageCourse = ({ records, courseName, id }) => {

  const courseRecords = records?.records?.filter(
    (rec) => {
      return rec.studentCourse?.toLowerCase() === courseName?.toLowerCase() && rec._id !== id.id}
  );
console.log(courseRecords)
  let totalPercentage =0;
  courseRecords.forEach(record =>{
    const percentage=overallPercentage(record)
    totalPercentage += percentage
  })

  return totalPercentage/courseRecords.length;
};
