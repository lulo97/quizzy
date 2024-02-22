import { QuizCardsArrayProps } from "../../interfaces/DashboardInterface";
import { QuizCard } from "./QuizCard";

export default function QuizCardArray({posts: posts}: QuizCardsArrayProps) {
    return (
      <div className="w-5/6 h-full flex flex-col gap-4 items-center">
        {posts.length === 0 ? (
          <p className='no-result'>No quiz found</p>
        ) : (
          <div className="flex flex-col gap-4 items-center w-full">
            {posts.map((post) => (
              <QuizCard
                key={post._id}
                id={post._id}
                title={post.quiz_info.title}
                description={post.quiz_info.description}
                image={post.quiz_info.imageURL}
                total_quiz={post.quiz_info.total_quiz}
                type={post.quiz_info.type}
                categories={post.quiz_info.categories}
                author={post.author}
                attempts={post.attempts}
                difficult={post.quiz_info.difficult}
              />
            ))}
          </div>
        )}
      </div>
    )
  }