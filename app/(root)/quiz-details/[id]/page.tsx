import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { fetchUser, fetchUserById } from "@/lib/actions/user.actions";
import { fetchQuizById } from "@/lib/actions/quiz.actions";

import QuizDetailCard from "@/components/quiz-details/QuizDetailCard";
import { fetchCommentByParentId } from "@/lib/actions/comment.actions";
import { getFavourite, isFavouriteExist } from "@/lib/actions/favourite.actions";
import { Author, Comment } from "@/interfaces/QuizInterface";
import { UserPlayResult } from "@/interfaces/PlayDataInterface";
import { fetchUsersPlayApiCall } from "@/components/profile/Utils";


async function page({ params }: { params: { id: string } }) {

    if (!params.id) return (
        <div className="mt-44">
            params.id is null
        </div>
    );

    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
  
    const quiz_data = await fetchQuizById(params.id);

    const {_id, quiz_info, createdAt} = quiz_data
    const post_id = _id;

    const author: Author = {
        _id: userInfo._id,
        id: userInfo._id,
        username: userInfo.username,
        name: userInfo.name,
        image: userInfo.image
    }

    const comments: Comment[] = await fetchCommentByParentId(post_id)
    const isFavourite: boolean = await isFavouriteExist(post_id, author.id)

    const author_comments: Author[] = await Promise.all(
        comments.map(async ele => {
          const user = await fetchUserById(ele.author_id);
          return {
            _id: user._id,
            id: user._id,
            username: user.username,
            name: user.name,
            image: user.image
          };
        })
      );
    
    const user_play_results: UserPlayResult[] = await fetchUsersPlayApiCall(post_id);
    console.log("user_play_results:", user_play_results)
    //const mean_score = calculateMeanScore(user_play_results);  
    const mean_score = 1;

    return (
        <QuizDetailCard
            id={post_id}
            author={author}
            quiz_info={quiz_info}
            createdAt={createdAt}
            comments={comments}
            isFavourite={isFavourite}
            author_comments={author_comments}
            mean_score={mean_score}
        />
    )
}

export default page;