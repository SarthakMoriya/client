export const totalMarks = (exams) => {
  console.log(exams);
  const totalMarks = exams?.reduce(
    (total, exam) => Number(exam?.mt) + total,
    0
  );
  return totalMarks;
};

export const totalMarksObtained = (exams) => {
  console.log(exams);
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

  return per>90?"A":per>80?"B":per>70?"C":"D"
};

export const percentageCalcuator=(exams)=>{
    const marksTotal = totalMarks(exams);
  const marksObt = totalMarksObtained(exams);
  return Math.floor((marksObt / marksTotal) * 100);
}