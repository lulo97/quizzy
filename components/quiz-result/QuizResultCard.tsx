"use client";

import Image from 'next/image'
import { Quiz, QuizInfoNoFile, Comment } from "@/interfaces/QuizInterface";
import { useRouter, useSearchParams } from "next/navigation";
import {
  calculateScore,
  parseStringTo2DArray,
  checkAnswers,
} from "./Utils";
import ResultList from "./ResultList";
import { useState } from "react";
import { createCommentApiCall, createFavouriteApiCall, deleteFavouriteApiCall  } from "../quiz-details/Utils";
import { Author } from '@/interfaces/QuizInterface';
import CommentSection from '../shared/CommentSection';

interface Props {
  id: string,
  author: Author
  quizzes: Quiz[];
  quiz_info: QuizInfoNoFile;
  comments: Comment[];
  isFavourite: boolean;
  author_comments: Author[]
}

export default function QuizResultCard({
  id,
  author,
  quizzes,
  quiz_info,
  comments,
  isFavourite,
  author_comments
}: Props) {
  const searchParams = useSearchParams();
  const rawSelectedAnswers = searchParams.get("selectedAnswers");

  if (rawSelectedAnswers == null) return null;

  const selectedAnswers = parseStringTo2DArray(rawSelectedAnswers);

  const result_arr = checkAnswers(quizzes, selectedAnswers);

  const router = useRouter();
  const [commentText, setCommentText] = useState('');

  async function handleCreateComment() {
    createCommentApiCall(id, author.id, commentText, router)
  };

  async function handleCreateFavourite() {
    try {
      if (isFavourite) {
        await deleteFavouriteApiCall(id, author.id, router);
      } else {
        await createFavouriteApiCall(id, author.id, router);
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  }

  return (
    <div className="w-3/4 h-full mx-auto flex flex-col items-center justify-center pb-20 mt-28 ">
      <div className="bg-white p-8 rounded shadow-md w-full">

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-6">{quiz_info.title}</h1>
          <p className="text-gray-600 mb-6">{quiz_info.description}</p>
        </div>

        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Your Quiz Result</h2>
          <ResultList quizzes={quizzes} selectedAnswers={selectedAnswers} />
        </div>

        <div className="my-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Score</h2>
            <p className="text-4xl font-bold text-indigo-500">
              {calculateScore(result_arr)}
            </p>
          </div>

          <div className='flex-1 flex justify-end mr-10'>
            <Image
                src={isFavourite ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
                alt="Favourite"
                width={50}
                height={50}
                onClick={handleCreateFavourite}
                className='transition-transform transform hover:scale-125'
            >
            </Image>
          </div>

        </div>

        <CommentSection 
          id={id} 
          author_id={author.id} 
          comments={comments} 
          author_comments={author_comments}
        />

      </div>
    </div>
  );
}

