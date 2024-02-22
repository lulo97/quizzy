import Link from "next/link"

interface CommentWithPostTitle {
    _id: string,
    post_title: string,
    post_id: string,
    text: string,
    createdAt: Date,
}

export default function CommentTabContent(props: {userComment: CommentWithPostTitle[]}) {
  
  return (
        <div className="p-4 w-full h-full flex flex-col items-center">
        {props.userComment === undefined || props.userComment.length === 0 ? 
        (<div>
            You have not make any Comment
        </div>) : 
        props.userComment.map((comment) => (
          <div key={comment._id} className="w-11/12 h-full mb-4 bg-white p-3 rounded-lg">
            <Link 
            className="font-bold text-dark-1 hover:text-sky-700"
            href={`/quiz-details/${encodeURIComponent(comment.post_id)}`}
            >
                {comment.text}
            </Link>
            <div className="text-xs text-gray-600">
                Comment At: {comment.createdAt.toDateString()}
            </div>
          </div>
        ))}
      </div>
    )
}