import Link from "next/link"

interface FavouriteWithPostTitle {
    _id: string,
    post_title: string,
    post_id: string,
    author_id: string,
    createdAt: Date
}

export default function FavouriteTabContent(props: {userFavourite: FavouriteWithPostTitle[]}) {
    return (
        <div className="p-4 w-full h-full flex flex-col items-center">
            {props.userFavourite === undefined || props.userFavourite.length === 0 ? 
            (<div>
                You have not Favourite any post
            </div>) : 
            props.userFavourite.map((favourite) => (
                <div key={favourite._id} className="w-11/12 h-full mb-4 bg-white p-3 rounded-lg">
                <Link 
                className="font-bold text-dark-1 hover:text-sky-700"
                href={`/quiz-details/${encodeURIComponent(favourite.post_id)}`}
                >
                    {favourite.post_title}
                </Link>
                <p className="text-gray-600 text-xs">
                    Favourite At: {new Date(favourite.createdAt).toLocaleString()}
                </p>
                </div>
            ))}
      </div>
    )
}