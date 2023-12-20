import { overallPercentage } from "./gradeCalculator";

export const averageCourse = ({ records, courseName, id }) => {

  const courseRecords = records?.records?.filter(
    (rec) => {
      return rec.studentCourse?.toLowerCase() === courseName?.toLowerCase() && rec._id !== id.id}
  );
console.log(courseRecords)
  let validRecords=0;
  let totalPercentage =0;
  courseRecords.forEach(record =>{
    const percentage=overallPercentage(record)
    console.log(percentage)
    if(!isNaN(percentage)){
      totalPercentage += percentage;
      validRecords++;
    }

  })

  return totalPercentage/validRecords;
};
