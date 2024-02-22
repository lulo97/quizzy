"use client";

//Libarary
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import PostQuizFormInfomation from "@/components/create-quiz/QuizInfomation";
import PostQuizFormQuizzes from "@/components/create-quiz/Quizzes";
import { useState } from "react";
import { z } from "zod";
import { File } from "@web-std/file";

//Files
import { QuizValidation } from "@/lib/validations/quiz";
import { createQuiz, updateQuiz } from "@/lib/actions/quiz.actions";
import {
  QuizInfo
} from "@/interfaces/CreateQuizInterfaces";
import {
  handleTypeChange,
  handleTotalQuizChange,
  uploadToUploadThing,
  handleCategoryChange,
  getInitialQuiz,
  getInitialQuizInfo,
  CATEGORIES,
  uploadToUploadThingEditMode,
} from "@/components/create-quiz/Utils";
import { Quiz, QuizData } from "@/interfaces/QuizInterface";

interface Props {
    user_id: string;
    quiz_data: QuizData;
}

export default function EditQuizForm({ user_id, quiz_data }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async (values: z.infer<typeof QuizValidation>) => {
    const update_quiz = {
        quizzes: values.quizzes,
        author: user_id,
        quiz_info: values.quiz_info,
        path: pathname,
    }
    await updateQuiz(quiz_data._id, update_quiz);
    router.push("/");
  };

  async function handleCreate() {
    handleTypeChange(quizInfo, quizList, setQuizInfo);
    handleTotalQuizChange(quizInfo, quizList, setQuizInfo);
    await uploadToUploadThingEditMode(
        quizInfo.imageFile, 
        quizInfo, 
        quiz_data.quiz_info.imageURL, 
        setQuizInfo
    );
    handleCategoryChange(quizInfo, setQuizInfo, selectedCategories);
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
  const [quizList, setQuizList] = useState<Quiz[]>(quiz_data.quizzes);

  const [selectedCategories, setSelectedCategories] = useState([
    { label: "General", value: "General" },
  ]);

  const quizInfoData: QuizInfo = quiz_data.quiz_info as QuizInfo;
  quizInfoData.imageFile = new File(["edit-blob"], "edit-blob");

  const [quizInfo, setQuizInfo] = useState<QuizInfo>(quizInfoData);

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
            Add Quiz
          </Button>
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
