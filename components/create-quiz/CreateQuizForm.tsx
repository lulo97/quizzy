"use client";

//Library
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import PostQuizFormInfomation from "@/components/create-quiz/QuizInfomation";
import PostQuizFormQuizzes from "@/components/create-quiz/Quizzes";
import { useState } from "react";
import { z } from "zod";

//Files
import { QuizValidation } from "@/lib/validations/quiz";
import { createQuiz } from "@/lib/actions/quiz.actions";
import {
  QuizInfo,
  Props,
} from "@/interfaces/CreateQuizInterfaces";
import {
  handleTypeChange,
  handleTotalQuizChange,
  uploadToUploadThing,
  handleCategoryChange,
  getInitialQuiz,
  getInitialQuizInfo,
  CATEGORIES,
} from "@/components/create-quiz/Utils";
import AiModal from "./AIModal";
import { Quiz } from "@/interfaces/QuizInterface";

export default function CreateQuizForm({ user_id }: Props) {
  //console.log("user_id", user_id)

  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async (values: z.infer<typeof QuizValidation>) => {
    await createQuiz({
      quizzes: values.quizzes,
      author: user_id,
      quiz_info: values.quiz_info,
      path: pathname,
    });
    router.push("/");
  };

  async function handleCreate() {
    handleTypeChange(quizInfo, quizList, setQuizInfo);
    handleTotalQuizChange(quizInfo, quizList, setQuizInfo);
    handleCategoryChange(quizInfo, setQuizInfo, selectedCategories);
    await uploadToUploadThing(quizInfo.imageFile, quizInfo, setQuizInfo);
    const { imageFile, ...updatedQuizInfo } = quizInfo;
    onSubmit({
      quizzes: quizList,
      accountId: user_id,
      quiz_info: updatedQuizInfo,
    });
  }

  const handleAddQuiz = () => {
    setQuizList([...quizList, getInitialQuiz()]);
  };

  //Parent component variable pass to children component
  const [quizList, setQuizList] = useState<Quiz[]>([getInitialQuiz()]);

  const [selectedCategories, setSelectedCategories] = useState([
    { label: "General", value: "General" },
  ]);

  const [quizInfo, setQuizInfo] = useState<QuizInfo>(getInitialQuizInfo());

  return (
    <div className="w-screen flex flex-col">
      {/*Modal */}
      <div className="bg-white fixed bottom-0 left-0 z-50 w-full border-t">
        {/*Main function button*/}
        <div className="flex justify-center items-center gap-40 py-2">
          
          <Button className="w-32 btn create-quiz-btn" onClick={handleCreate}>
            Create
          </Button>

          <Button className="w-32 btn add-quiz-btn" onClick={handleAddQuiz}>
            Add Question
          </Button>

          <AiModal setQuizList={setQuizList} />
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center mb-40">
        <PostQuizFormInfomation
          quizInfo={quizInfo}
          setQuizInfo={setQuizInfo}
          categories={CATEGORIES}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <PostQuizFormQuizzes 
          quizList={quizList} 
          setQuizList={setQuizList} 
        />
      </div>
    </div>
  );
}
