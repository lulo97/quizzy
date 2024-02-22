import CategoryCard from "@/components/category/CategoryCard"
import { fetchPostsByTitle } from "@/lib/actions/quiz.actions"

interface Props {
    params: { query: string }
}

export default async function Search({ params }: Props) {
    const decode_query = decodeURIComponent(params.query)
    const posts = await fetchPostsByTitle(1, 20, decode_query); 

    if (posts.length == 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-2xl font-bold mb-4">
                    Your search - {params.query} - did not match any quiz title.
                </p>

                <div className="text-gray-600">
                    <p className="mb-2">Suggestions:</p>
                    <ul className="list-disc pl-6">
                        <li>Make sure that all words are spelled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-row h-full">
            <div className="mt-20 mb-9 flex flex-col gap-3  items-center h-full w-full">
                {/*Bottom card */}
                <CategoryCard posts={posts} />
            </div>
        </div>
    )
}