// Function to find common exams and merge marks
export const findCommonExamsWithMarks = (exams1, exams2) => {
  const commonExams = exams1
    ?.filter((exam1) => exams2?.some((exam2) => exam1.name === exam2.name))
    ?.map((exam1) => {
      const exam2 = exams2?.find((exam2) => exam2.name === exam1.name);
      return {
        name: exam1.name,
        student1: { mo: exam1.mo, mt: exam1.mt },
        student2: { mo: exam2.mo, mt: exam2.mt },
      };
    });
  console.log(commonExams);
  return commonExams;
};

export const findWinner = (m1, m2, n1, n2) => {
  return m1 > m2 ? n1 : m1 === m2 ? "draw" : n2;
};
