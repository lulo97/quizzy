import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchPostsByAuthorId } from "@/lib/actions/quiz.actions";
import TopProfile from "@/components/profile/TopProfile";
import BotProfile from "@/components/profile/BotProfile";
import { fetchCommentByAuthorId } from "@/lib/actions/comment.actions";
import { fetchFavouritesByAuthorId } from "@/lib/actions/favourite.actions";
import { fetchAllPlayData } from "@/lib/actions/playdata.actions";
import { PlayDataJSON } from "@/interfaces/PlayDataInterface";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userId = userInfo._id;
  const userPosts = await fetchPostsByAuthorId(1, 20, userId);
  const userComment = await fetchCommentByAuthorId(userId);
  const userFavourite = await fetchFavouritesByAuthorId(userId)

  const playDataDetails: any = await fetchAllPlayData(userId);

  return (
    <section className="my-20 w-5/6 mx-auto">
        {/*Top profile */}
        <TopProfile user={userInfo} />

        {/*Bot profile */}
        <BotProfile 
          userPosts={userPosts} 
          userComment={userComment} 
          userFavourite={userFavourite}
          playDataDetails={playDataDetails}
        />
    </section>
  );
}
export default Page;