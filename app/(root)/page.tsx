import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchPosts } from "@/lib/actions/quiz.actions";
import IntroductionCard from "@/layout/IntroductionCard";
import CardContainer from "@/components/shared/CardContainer";
import { CATEGORY_ARRAY } from "@/components/create-quiz/Utils";

export default async function Home() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const posts = await fetchPosts();

  return (
    <div className="flex flex-row h-full w-screen">
      <section className='mt-20 mb-9 flex flex-col gap-3 items-center h-full w-full'>
          
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-200 to-yellow-300 w-screen h-96 rounded-full z-10"></div>
          
        <IntroductionCard />
        
        {/*<CategoryTab /> */}
        <div className="w-5/6">
          {CATEGORY_ARRAY.map((category, key) => {
            return (
              <CardContainer category={category}/>
            )
          })}
        </div>
      </section>
    </div>
  )
}