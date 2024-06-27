export const total_Marks = (exams) => {
  let totalMarks = exams?.reduce((total, exam) => Number(exam?.mt) + total, 0);

  return totalMarks;
};

export const totalMarksObtained = (exams) => {
  const totalMarks = exams?.reduce(
    (total, exam) => Number(exam?.mo) + total,
    0
  );

  return totalMarks;
};

//FUNCTION TO CALCULATE TEST GRADES ALL TEST GRADES
export const gradeCalculator = (exams) => {
  const totalMarks = exams?.reduce(
    (total, exam) => Number(exam?.mt) + total,
    0
  );
  const totalMarksObt = exams?.reduce(
    (total, exam) => Number(exam?.mo) + total,
    0
  );
  let per = Math.floor((totalMarksObt / totalMarks) * 100);
  return per > 90
    ? "A"
    : per > 80
    ? "B"
    : per > 70
    ? "C"
    : isNaN(per)
    ? "Not Graded"
    : "D";
};

//ONLY TAKES TESTS IN CONSIDERATION NOT MAIN EXAM
export const percentageCalcuator = (exams) => {
  const marksTotal = total_Marks(exams);
  const marksObt = totalMarksObtained(exams);
  return Math.floor((marksObt / marksTotal) * 100);
};

//COMPLETE PERCENTAGE MAIN EXAM PLUS TESTS
export const overallPercentage = (record) => {
  if (record?.exams?.length > 0 && record?.mainExamMT > 0) {
    const less = Math.floor(percentageCalcuator(record?.exams) * 0.4);
    const more =
      Math.floor(((record?.mainExamMO / record?.mainExamMT) * 100) * 0.6);
    return less + more;
  }
  else if (record?.exams?.length === 0 && record?.mainExamMT > 0) {
    return Math.floor((record?.mainExamMO / record?.mainExamMT) * 100);
  }
  else if (record?.exams?.length > 0 && !record?.mainExamMT > 0) {
    return Math.floor(percentageCalcuator(record?.exams));
  }
  return NaN;
};

// FUNCTION TO CALCULATE GRADE FOR OVERALL TESTS AND MAIN EXAM
export const overallGrade = (record) => {
  const per = overallPercentage(record);

  return Number(per) > 90
    ? "A"
    : per > 80
    ? "B"
    : per > 70
    ? "C"
    : isNaN(per)
    ? "Not Graded"
    : "D";
};

// FUNCTION TO CALCULATES TEST GRADE OF SINGLE EXAM
export const testGradeCalculator = (exam) => {
  let per = Math.floor((exam?.mo * 100) / exam?.mt);
  return Number(per) > 90
    ? "A"
    : per > 80
    ? "B"
    : per > 70
    ? "C"
    : isNaN(per)
    ? "Not Graded"
    : "D";
};
