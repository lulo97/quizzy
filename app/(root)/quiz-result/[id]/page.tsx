import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUserById } from "@/lib/actions/user.actions";
import { fetchQuizById, increaseAttemps } from "@/lib/actions/quiz.actions";
import QuizResultCard from "@/components/quiz-result/QuizResultCard";
import { Comment, Author } from "@/interfaces/QuizInterface";
import { fetchCommentByParentId } from "@/lib/actions/comment.actions";
import { isFavouriteExist } from "@/lib/actions/favourite.actions";

async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const quiz_data = await fetchQuizById(params.id);
  const {_id, quizzes, quiz_info } = quiz_data;
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

  await increaseAttemps(post_id);

  return (
    <QuizResultCard
      id={post_id}
      author={author}
      quizzes={quizzes}
      quiz_info={quiz_info}
      comments={comments}
      isFavourite={isFavourite}
      author_comments={author_comments}
    />
  );
}

export default Page;
