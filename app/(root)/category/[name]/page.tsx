import { unflattenText } from "@/components/create-quiz/Utils"
import { fetchPosts } from "@/lib/actions/quiz.actions"
import { promises as fs } from 'fs';
import CategoryCard from "@/components/category/CategoryCard";

interface Props {
    params: { name: string }
}

const CATEGORY_INTRODUCTION_PATH = '/public/json/category-introduction.json'

async function getCategoryIntroduction() {
    const file_content = await fs.readFile(process.cwd() + CATEGORY_INTRODUCTION_PATH, 'utf8');
    return JSON.parse(file_content);
}

export default async function Category({ params }: Props) {
    const introduction = await getCategoryIntroduction();

    const category = unflattenText(params.name)
    const posts = await fetchPosts(1, 20, category);

    return (
        <div className="flex flex-row h-full">
            <div className="mt-20 mb-9 flex flex-col gap-3  items-center h-full w-full">
                {/*Top card*/}
                <div className="w-5/6 bg-white flex flex-col items-start shadow-md rounded p-4 z-10">
                    <div className="text-4xl font-extrabold dark:text-white">
                        {category} Quiz
                    </div>
                    <div className="text-lg text-gray-500">
                        {introduction[category]}
                    </div>
                </div>

                {/*Bottom card */}
                <CategoryCard posts={posts} />
            </div>
        </div>
    )
}
