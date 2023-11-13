export const totalMarks = (exams) => {
  const totalMarks = exams?.reduce(
    (total, exam) => Number(exam?.mt) + total,
    0
  );
  return totalMarks;
};

export const totalMarksObtained = (exams) => {
  const totalMarks = exams?.reduce(
    (total, exam) => Number(exam?.mo) + total,
    0
  );
  return totalMarks;
};

export const gradeCalculator = (exams) => {
  const marksTotal = totalMarks(exams);
  const marksObt = totalMarksObtained(exams);
  const per = (marksObt / marksTotal) * 100;
  console.log(per)

  return per > 90 ? "A" : per > 80 ? "B" : per > 70 ? "C" : isNaN(per)?"Not Graded":"D";
};

export const percentageCalcuator = (exams) => {
  const marksTotal = totalMarks(exams);
  const marksObt = totalMarksObtained(exams);
  return Math.floor((marksObt / marksTotal) * 100);
};

export const overallPercentage = (record) => {
  const less = percentageCalcuator(record?.exams)*.4;
  const more=Math.floor((record?.mainExamMO/record?.mainExamMT)*100)*.6
  return (less+more)
};
