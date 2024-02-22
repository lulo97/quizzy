import Link from "next/link"

export default function CreateQuizButton() {
    return (
        <Link 
            href="/create-quiz" 
            className="text-white flex flex-row items-center justify-between bg-sky-500 py-2 px-5 rounded-md shadow-sm ring-1 ring-inset text-sm font-semibold ring-gray-300 h-full">
            <i className="fa fa-plus pr-2"></i>
            Create
        </Link>
    )
}