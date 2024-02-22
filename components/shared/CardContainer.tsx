import Link from "next/link"
import { fetchPosts } from "@/lib/actions/quiz.actions"
import QuizThumbnail from "./QuizThumbnail";

export default async function CardContainer({category}: {category: string}) {

    const categoryPosts = await fetchPosts(1, 30, category);

    return (
        <div className="w-full my-10">
            <div className="p-2 border rounded-lg bg-white shadow-md">
                <div className="font-bold text-xl ">{category}</div>
            </div>

            {categoryPosts.length != 0 ?             
            <div className="flex flex-row gap-2 py-2 items-center justify-between overflow-hidden">
                {categoryPosts.map((post, key) => {
                    return (
                        <QuizThumbnail post={post} />  
                    )
                })}
            </div> : <div className="bg-white rounded-lg shadow-md p-2 my-2">No post found</div>}

            <div className="flex items-center justify-center py-2 border rounded-lg bg-white shadow-md">
                <Link href="#" className="text-sky-800">Show all</Link>
            </div>

            <hr className="h-px mb-8 mt-6 bg-gray-300 border-0 dark:bg-gray-700"></hr>
        </div>
    )
}
