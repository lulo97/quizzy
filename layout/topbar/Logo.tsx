import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (
        <div className="sm:mb-0">
        <Link href="/" className='flex justify-center items-center'>
          <Image 
            src="/logo.png" 
            alt='logo'
            width={40}
            height={40}
          />
          <h1 className="ml-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
            QuizQuest
          </h1>
        </Link>
      </div>
    )
}