"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createFavouriteApiCall, deleteFavouriteApiCall } from './Utils';
import { QuizInfoNoFile, Author, Comment } from '@/interfaces/QuizInterface';
import CommentSection from '../shared/CommentSection';

`
import { createComment } from '@/lib/actions/comment.actions';
Chỉ có thể chạy trong server side --> Chạy ở quiz-details/page
`

export interface QuizDetailsCardProps {
  id: string,
  quiz_info: QuizInfoNoFile
  author: Author,
  createdAt: Date,
  comments: Comment[],
  isFavourite: boolean,
  author_comments: Author[],
  mean_score: number,
}

export default function QuizDetailCard({
    id,
    author,
    quiz_info,
    createdAt,
    comments,
    isFavourite,
    author_comments,
    mean_score
  }: QuizDetailsCardProps) {
    const router = useRouter();

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
      <div className='w-full h-full pb-10'>
    <div className="bg-white flex flex-col rounded-lg shadow-md p-6 w-5/6 mx-auto mt-24">
        <div className="mb-4 flex flex-col items-center justify-center">
          <Image
            src={quiz_info.imageURL}
            alt={quiz_info.title}
            width={400}
            height={200}
            className="rounded-md"
          />
          <h2 className="text-2xl font-bold mt-4 mb-2">{quiz_info.title}</h2>
        </div>
        <div className="text-gray-600">{quiz_info.description}</div>

        <div className='flex flex-row justify-center items-center gap-6'>
          <div className="mt-4">
            <div>
              <span className="font-bold">Type:</span> {quiz_info.type}
            </div>
            <div>
              <span className="font-bold">Total Quizzes:</span>{' '}
              {quiz_info.total_quiz}
            </div>
          </div>
    
          <div className="mt-4">
            <div>
              <span className="font-bold">Author:</span> {author.name}
            </div>
            <div>
              <span className="font-bold">Created At:</span>{' '}
              {createdAt.toDateString()}
            </div>
          </div>

          <div className="mt-4">
            <div>
              <span className="font-bold">Difficult:</span> {quiz_info.difficult}
              <span className="font-bold">MeanScore:</span> {mean_score}
            </div>
            <div>
              <div>&nbsp;</div>
            </div>
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
  
        {/* You can add a section to display quiz questions and answers here */}
        <Link 
            href={`/quiz-play/${id}`}
            className="text-center mt-6 mx-auto w-1/3 bg-transparent hover:bg-sky-500 text-sky-700 text-heading1-semibold hover:text-white border border-sky-500 hover:border-transparent rounded">
            PLAY
        </Link>

        <CommentSection 
          id={id} 
          author_id={author.id} 
          comments={comments} 
          author_comments={author_comments}
        />
    </div>
    </div>
    )
}
