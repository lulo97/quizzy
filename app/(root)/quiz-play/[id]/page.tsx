import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchQuizById } from "@/lib/actions/quiz.actions";
import PlayQuizForm from "@/components/quiz-play/PlayQuizForm";

async function page({ params }: { params: { id: string } }) {

    const quizId = params.id;

    if (!quizId) return null;

    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
  
    const quiz = await fetchQuizById(quizId);

    const {_id, quizzes, author, quiz_info, createdAt, __v} = quiz

    //const {title, description, imageURL, type, total_quiz} = quiz_info
    //const {question, answers, right_answers, context} = quizzes

    return (
        <PlayQuizForm
            user_id={userInfo._id}
            post_id={_id}
            quizzes={quizzes}
            author={author}
            quiz_info={quiz_info}
            createdAt={createdAt}
        />
    )
}

export default page;