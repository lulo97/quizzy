import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchQuizById } from "@/lib/actions/quiz.actions";
import EditQuizForm from "@/components/edit-quiz/EditQuizForm";

async function Page({ params }: { params: { id: string } }) {
    const post_id = params.id

    const user = await currentUser();
    if (!user) return null;

    // fetch organization list created by user
    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect("/onboarding");

    const quiz_data = await fetchQuizById(post_id)

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mt-20 text-4xl font-extrabold dark:text-white">Edit Quiz</h1>
            <EditQuizForm 
                user_id={userInfo._id} 
                quiz_data={quiz_data} 
            />
        </div>
    );
}

export default Page;