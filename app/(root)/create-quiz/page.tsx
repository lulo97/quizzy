import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import CreateQuizForm from "@/components/create-quiz/CreateQuizForm"
import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-20 text-4xl font-extrabold dark:text-white">Create Quiz</h1>
      <CreateQuizForm user_id={userInfo._id} />
    </div>
  );
}

export default Page;