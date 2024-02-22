import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "../create-quiz/Utils";

//Khai báo thẳng để không lỗi tailwind
const colorMappings = {
  "general": "bg-gray-400",
  "physics": "bg-teal-400",
  "chemistry": "bg-red-400",
  "biology": "bg-green-400",
  "earth_science": "bg-yellow-400",
  "astronomy": "bg-indigo-400",
  "environmental_science": "bg-orange-400",
  "psychology": "bg-purple-400",
  "sociology": "bg-pink-400",
  "anthropology": "bg-gray-400",
  "political_science": "bg-teal-400",
  "economics": "bg-red-400",
  "history": "bg-green-400",
  "computer_science": "bg-yellow-400"
} 

interface Props {
    id: string,
    title: string,
    description: string,
    image:string,
    total_quiz: number,
    type: string,
    categories: string[],
    author: {
        name: string;
        username: string;
        image: string;
        id: string;
    },
    attempts: number,
    difficult: string
}

export function QuizCard({
    id,
    title,
    description,
    image,
    total_quiz,
    type,
    categories,
    author,
    attempts,
    difficult
    }
    : Props) {

    return (
      <div className="w-full h-full bg-white flex flex-row shadow-md rounded p-4">

        <div className=" w-1/2 h-fit">
          <Image
            src={image}
            alt='quiz image'
            width="0"
            height="0"
            sizes="100vw"
            className='w-full rounded max-h-full'
          />
        </div>

        <div className="w-full pl-3">
          <div className=" max-w-lg overflow-y-auto no-scrollbar h-1/5 flex items-center pl-2">

            {categories.map(category => (
              <span
                key={category}
                className={`${getCategoryColor(category, colorMappings)} text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded whitespace-nowrap`}
              >
                {category}
              </span>
            ))}

          </div>
          <div className=" h-3/5 w-full flex flex-col items-start justify-center p-2">
            <Link 
              href={`/quiz-details/${id}`}
              className=' cursor-pointer text-heading3-bold text-dark-1  line-clamp-1 hover:text-sky-700'>
                {title}
            </Link>   
            <p className=' mt-2 text-small-regular text-dark-2 line-clamp-4 overflow-y-auto'>
              {description}
            </p>
            <div className='flex gap-5 pt-2 text-sm text-gray-700'>
            <div className="">
              <span className="font-bold">Questions:</span> <span>{total_quiz}</span> | 
              <span className="font-bold"> Type:</span> <span>{type}</span> |  
              <span className="font-bold"> Attempts:</span> <span>{attempts}</span> |
              <span className="font-bold"> Difficult:</span> <span>{difficult}</span>
            </div>
            </div>
          </div>
          <div className=" w-full h-1/5 flex flex-row items-center justify-between p-2">
            <div className=' flex gap-3.5'>
            <Image
                src='/assets/heart-gray.svg'
                alt='heart'
                width={24}
                height={24}
                className='cursor-pointer object-contain'
            />
            <Link href={`/thread/${id}`}>
                <Image
                src='/assets/reply.svg'
                alt='heart'
                width={24}
                height={24}
                className='cursor-pointer object-contain'
                />
            </Link>
            <Image
                src='/assets/repost.svg'
                alt='heart'
                width={24}
                height={24}
                className='cursor-pointer object-contain'
            />
            <Image
                src='/assets/share.svg'
                alt='heart'
                width={24}
                height={24}
                className='cursor-pointer object-contain'
            />
            </div>
            <div className=" flex flex-row items-center justify-between">
            <h2 className="pr-2">{author.username}</h2>
              <Image
                id="author_img"
                src={author.image}
                alt='user image'
                width="0"
                height="0"
                sizes="10vh"
                className='cursor-pointer rounded-full w-auto'
              />
            </div>
          </div>
        </div>
      </div>
    )
} 