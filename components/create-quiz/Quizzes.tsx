"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

import { Quiz } from "../../interfaces/QuizInterface";

import {
  handleDeleteQuiz,
  handleAddAnswer,
  handleDeleteAnswer,
  handleMarkAnswer,
  handleQuestionChange,
  handleAnswerChange,
  handleContextChange,
} from "@/components/create-quiz/Utils";

interface Props {
  quizList: Quiz[];
  setQuizList: Dispatch<SetStateAction<Quiz[]>>;
}

export default function PostQuizFormQuizzes({ quizList, setQuizList }: Props) {
  return (
    <div className="w-2/3">
      {quizList.map((quiz, index) => (
        <div
          key={index}
          className="mt-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >

          {/*Question*/}
          <div className="flex flex-col mb-8">
            <Label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="question"
            >
              Question {index + 1}
            </Label>
            <Textarea
              id="question"
              className="w-full py-2 px-3 text-gray-700 shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline"
              value={quiz.question}
              placeholder="Question statement"
              onChange={(event) =>
                handleQuestionChange(event, index, quizList, setQuizList)
              }
            />
          </div>
          
          {/*Answer Choice*/}
          {quiz.answers.map((answer, answerIndex) => (
            <div
              key={answerIndex}
              className={`mt-2 flex items-center justify-between`}
            >
              <Textarea
                className={`mr-5 shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline ${
                  quiz.right_answers.includes(answerIndex) ? "highlighted" : ""
                }`}
                value={answer}
                placeholder="Answer choice"
                onChange={(event) =>
                  handleAnswerChange(
                    event,
                    index,
                    answerIndex,
                    quizList,
                    setQuizList
                  )
                }
              />
              <div className="flex items-center justify-center gap-2">
                <Button
                  className="btn mark-btn"
                  onClick={() =>
                    handleMarkAnswer(index, answerIndex, quizList, setQuizList)
                  }
                >
                  Mark
                </Button>
                <Button
                  className="btn delete-btn"
                  onClick={() =>
                    handleDeleteAnswer(
                      index,
                      answerIndex,
                      quizList,
                      setQuizList
                    )
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <Label className="text-dark-1" htmlFor="context">
              Context
            </Label>
            <Textarea
              id="context"
              className="shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Write context/explain for quiz"
              value={quiz.context}
              onChange={(event) =>
                handleContextChange(event, index, quizList, setQuizList)
              }
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button
              className="btn add-btn"
              onClick={() => handleAddAnswer(index, quizList, setQuizList)}
            >
              Add Answer
            </Button>
            <Button
              className="btn delete-btn"
              onClick={() => handleDeleteQuiz(index, quizList, setQuizList)}
            >
              Delete Quiz
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
