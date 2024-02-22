"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Quiz, QuizInfoNoFile } from "@/interfaces/QuizInterface";
import { createPlayDataApiCall } from "./Utils";

interface Props {
  user_id: string;
  post_id: string;
  quizzes: Quiz[];
  quiz_info: QuizInfoNoFile;
  author: string;
  createdAt: Date;
}

const PlayQuizForm: React.FC<Props> = ({
  user_id,
  post_id,
  quizzes,
  author,
  quiz_info,
  createdAt,
}: Props) => {
  const router = useRouter();

  const [selectedAnswers, setSelectedAnswers] = useState<number[][]>(
    quizzes.map(() => [])
  );

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      const currentSelectedAnswers = newSelectedAnswers[questionIndex] || [];

      // Toggle the selection
      const isSelected = currentSelectedAnswers.includes(answerIndex);
      if (isSelected) {
        newSelectedAnswers[questionIndex] = currentSelectedAnswers.filter(
          (index) => index !== answerIndex
        );
      } else {
        newSelectedAnswers[questionIndex] = [
          ...currentSelectedAnswers,
          answerIndex,
        ];
      }
      
      return newSelectedAnswers;
    });
  };

  async function handleCreatePlayData() {
    const flattenedSelectedAnswers = selectedAnswers.map((answerSet) =>
      answerSet.join(",")
    );
    const answers_string = flattenedSelectedAnswers.join(";")
    const time_taken = initialTime - timeRemaining
    console.log(time_taken)
    setTimerRunning(false);
    createPlayDataApiCall(user_id, post_id, time_taken, answers_string, router);
  }

  const handleSubmit = () => {
    // Combine the selected answers into a single array for all questions
    const flattenedSelectedAnswers = selectedAnswers.map((answerSet) =>
      answerSet.join(",")
    );

    // Encode the selected answers as a query parameter
    const queryParams = new URLSearchParams({
      selectedAnswers: flattenedSelectedAnswers.join(";"),
    });

    handleCreatePlayData();
    // Navigate to the result page with the selected answers as a query parameter
    router.push(`/quiz-result/${post_id}?${queryParams}`);
  };

  const initialTime = quiz_info.time_per_q * quiz_info.total_quiz;
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
  const [timerRunning, setTimerRunning] = useState(true);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="w-screen flex flex-col">
      <div className="bg-white fixed bottom-0 left-0 z-50 w-full border-t">
        {/*Main function button*/}
        <div className="flex justify-center items-center gap-40 py-2">
          <Button className="w-32 btn create-quiz-btn" onClick={handleSubmit}>
            Submit
          </Button>
          <div className="absolute right-16">Time: {formatTime(timeRemaining)}</div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center mb-40 mt-20">
        {/* Information Region */}

        {/* Title */}
        <h1 className="my-10 text-4xl font-extrabold dark:text-white">
          {quiz_info.title}
        </h1>

        {/* Quiz region */}
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="w-2/3 mt-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {/*Question*/}
            <div className="flex flex-col mb-8">
              <Label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="question"
              >
                Question {index + 1}
              </Label>
              <div
                id="question"
                className="border-dark-1 border font-semibold w-full p-4 text-gray-700 shadow appearance-none rounded leading-tight focus:outline-none focus:shadow-outline"
              >
                {quiz.question}
              </div>
            </div>

            {/*Answer Choice*/}
            {quiz.answers.map((answer, answerIndex) => (
              <div
                key={answerIndex}
                className={`border-gray-1 border p-4 mb-3 shadow appearance-none rounded leading-tight focus:outline-none focus:shadow-outline ${
                  selectedAnswers[index]?.includes(answerIndex)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleAnswerSelect(index, answerIndex)}
                style={{ cursor: "pointer" }}
              >
                {answer}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayQuizForm;
