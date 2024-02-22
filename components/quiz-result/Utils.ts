import { Quiz } from "@/interfaces/QuizInterface";

//Compare 2 array unorder
//[1, 2, 3] == [2, 1, 3] --> true
//[1, 2] == [1, 2, 3] --> false
export function areArraysEqual(arr1: number[], arr2: number[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.every((element) => arr2.includes(element))
  );
}

//Return a array with true, false value
//[true, true, false] --> user correct at question number 0, 1 and fail at question 2
export function checkAnswers(
  quizzes: Quiz[],
  selectAnswers: number[][]
): boolean[] {
  return selectAnswers.map((answer, index) =>
    areArraysEqual(answer, quizzes[index].right_answers)
  );
}

//Return string score format
export function getRawScore(answerResult: boolean[]): number {
  const correctAnswersLength = answerResult.filter(
    (result) => result === true
  ).length;
  return correctAnswersLength;
}

//Return string max score format
export function getMaxScore(answerResult: boolean[]): number {
  return answerResult.length;
}

//Return string format "score"/"max-score" format
export function calculateScore(answerResult: boolean[]): string {
  return `${getRawScore(answerResult)}/${getMaxScore(answerResult)}`;
}

//Turn string into 2D number
//"1" --> [[1]]
//1,2,3;2,3 --> [[1, 2, 3], [2, 3]]
export function parseStringTo2DArray(input: string): number[][] {
  const rows = input
    .split(";")
    .map((row) => row.split(",").map((cell) => parseInt(cell.trim(), 10)));

  // Filter out empty arrays
  const result = rows.filter((row) => row.length > 0);
  return result;
}
