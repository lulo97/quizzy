import { Quiz } from "@/interfaces/QuizInterface";
import { areArraysEqual } from "./Utils";

export default function ResultList(props: {quizzes: Quiz[], selectedAnswers: number[][]}) {

    return (
        <div>
            {props.quizzes.map((quiz, index) => (
            <div key={index} className="mb-4 border border-gray-400 rounded-lg p-2">
              <p className="text-lg font-semibold">Question {index + 1}</p>
              <p className="mb-2">{quiz.question}</p>
              <div>
                <p
                  className={
                    areArraysEqual(props.selectedAnswers[index], quiz.right_answers)
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  Your Answers:{" "}
                  {props.selectedAnswers[index]
                    .map((answer) => quiz.answers[answer])
                    .join(", ")}
                </p>
                <p className="text-green-600">
                  Correct Answer:{" "}
                  {quiz.right_answers
                    .map((answer) => quiz.answers[answer])
                    .join(", ")}
                </p>
              </div>
              <p className="text-gray-600">Explanation: {quiz.context}</p>
            </div>
          ))}
        </div>
    )
}