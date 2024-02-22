"use client"

import { Post } from "@/interfaces/DashboardInterface";
import Image from "next/image";
import Link from "next/link";

export default function QuizThumbnail({post}: {post: Post}) {
    return (
        <Link 
        className="flex-1 flex flex-col items-center justify-stretch border rounded-lg hover:shadow-lg p-2 bg-white overflow-hidden"
        href={`/quiz-details/${post._id}`}
        >
            <div className="w-full">
                <div className="font-bold text-lg text-gray-800">
                    {post.quiz_info.title}
                </div>
                <div className="text-xs py-1">
                    <div>Questions: <span className="font-bold">{post.quiz_info.total_quiz}</span> </div>
                    <div> Type: <span className="font-bold">{post.quiz_info.type}</span></div>
                    <div> Attempts: <span className="font-bold">{post.attempts}</span></div>
                    <div> Difficult: <span className="font-bold">{post.quiz_info.difficult}</span></div>
                </div>
            </div>

            <Image 
                src={post.quiz_info.imageURL} 
                alt='quiz image'
                width="0"
                height="0"
                sizes="1vw"
                className='rounded h-24 w-full object-cover transition-transform transform hover:scale-110'
            />
        </Link>
    )
}