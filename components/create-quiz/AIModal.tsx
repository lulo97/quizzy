import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Quiz } from "@/interfaces/QuizInterface";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";

const exampleQuiz: Quiz[] = [
  {
    question: "Question 1?",
    right_answers: [0],
    answers: ["Correct Answer", "Wrong Answer", "Wrong Answer"],
    context: "Context 1",
  },
  {
    question: "Question 2?",
    right_answers: [0],
    answers: ["Correct Answer", "Wrong Answer", "Wrong Answer"],
    context: "Context 2",
  },
  {
    question: "Question 2?",
    right_answers: [0],
    answers: ["Correct Answer", "Wrong Answer", "Wrong Answer", "Wrong Answer"],
    context: "Context 2",
  },
  {
    question: "Question 2?",
    right_answers: [0],
    answers: ["Correct Answer", "Wrong Answer", "Wrong Answer"],
    context: "Context 2",
  },
  // Add more sample quizzes as needed
];

interface Props {
  setQuizList: Dispatch<SetStateAction<Quiz[]>>;
}

export default function AiModal({ setQuizList }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleCreateByAI() {
    setQuizList(quizzes);
    setIsOpen(!isOpen);
  }

  const [text, setText] = useState<string>("");
  const [numParts, setNumParts] = useState<number>(5);
  const [quizzes, setQuizzes] = useState<Quiz[]>(exampleQuiz);

  const generateQuizzes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/generate_quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text, num_parts: numParts }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }

      const data = await response.json();
      setQuizzes(data);
    } catch (error: any) {
      console.error("Error fetching quizzes:", error.message);
    }
  };

  function CloseAiModalButton() {
    return (
      <Button
        className="btn delete-btn absolute top-1 right-1 w-3 h-6"
        onClick={(ele) => setIsOpen(!isOpen)}
      >
        X
      </Button>
    );
  }

  function InputText() {
    return (
      <Textarea
        className="h-full p-2 mt-2 border-2 rounded-md mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here"
      />
    );
  }

  function TotalQuestSection() {
    return (
      <div className="flex items-center mr-2">
        <Label className="text-md">Total Quest</Label>
        <Input
          type="number"
          className="w-14 rounded-md border-2 ml-2"
          value={numParts}
          min={0}
          onChange={(e) => setNumParts(parseInt(e.target.value, 10))}
        />
      </div>
    );
  }

  function PreviewGenerateQuizzes() {
    return (
      <div className="h-full overflow-y-auto no-scrollbar">
        {quizzes.length > 0 && (
          <div className="mt-1">
            <h2 className="text-2xl font-bold mb-4">Generated Quizzes:</h2>
            <ul className="">
              {quizzes.map((quiz, index) => (
                <li key={index} className="mb-4">
                  <strong>Question:</strong> {quiz.question}
                  <br />
                  <strong>Right Answer:</strong> {quiz.right_answers.join(", ")}
                  <br />
                  <strong>Answers:</strong> {quiz.answers.join(", ")}
                  <br />
                  <strong>Context:</strong> {quiz.context}
                  <hr className="my-4" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Button className="w-32 btn ai-btn" onClick={(ele) => setIsOpen(!isOpen)}>
        AI
      </Button>

      {isOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-xl p-4 fixed top-5 bottom-5 left-5 right-5">
              <CloseAiModalButton />
              <div className="flex flex-row h-full">

                {/*Left Section */}
                <div className="flex flex-col w-fit">
                  <div className="flex justify-between items-center">
                    <TotalQuestSection />
                    <Button
                      className="text-lg btn ai-btn"
                      onClick={generateQuizzes}>
                      Generate Quizzes
                    </Button>
                  </div>
                  <InputText />
                </div>

                {/*Right Section */}
                <div className="flex flex-col w-fit pl-4">
                  <PreviewGenerateQuizzes />
                  <Button
                    className="text-lg btn ai-btn mx-auto"
                    onClick={handleCreateByAI}>
                    Confirm Create
                  </Button>
                </div>
                <div className="mb-10"></div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}
