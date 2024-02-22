import { QuizData } from "@/interfaces/QuizInterface"
import Link from "next/link"
import { useState } from "react"
import { calculateMeanScore, deleteQuizApiCall, fetchUsersPlayApiCall } from "./Utils";
import { useRouter } from 'next/navigation'
import { User } from "@/interfaces/UserInterface";
import DeleteQuizModal from "./QuizDeleteModel";
import UsersPlayQuizModal from "./QuizUserPlayModal";
import { UserPlayResult } from "@/interfaces/PlayDataInterface";

export default function QuizTabContent(props: {
    userPosts: QuizData[]
  }) {

    const router = useRouter();

    // State to track whether the modal is open
    const [modalOpen, setModalOpen] = useState(false);

    const [selectQuizData, setSelectQuizData] = useState<QuizData>();

    function handleSetSelectQuiz(quiz_data: QuizData) {
      setSelectQuizData(quiz_data)
      setModalOpen(!modalOpen)
    }

    async function handleDeleteQuiz(quiz_id: string) {
      await deleteQuizApiCall(quiz_id, router);
      console.log("Delete quiz")
    }

    //User Play Modal
    const [isUserPlayModalOpen, setIsUserPlayModalOpen] = useState(false);

    const openUserPlayModal = () => {
      setIsUserPlayModalOpen(true);
    };

    const closeUserPlayModal = () => {
      setIsUserPlayModalOpen(false);
    };

    const [user_play_results, setUsersPlay] = useState<UserPlayResult[]>([])

    async function handleGetUsersPlay(post_id: string) {
      openUserPlayModal();
      const user_play_results: UserPlayResult[] = await fetchUsersPlayApiCall(post_id);
      setUsersPlay(user_play_results)
      console.log(post_id)
    }

    return (
        <div className="p-4 w-full h-full flex flex-col items-center">
            {props.userPosts.length == 0 ? 
            (<div>
                You have not create any Quiz
            </div>) : 
            ""}
            {props.userPosts.map(ele => {
                return (
                    <div 
                        key={ele._id}
                        className="w-11/12 h-full mb-2 bg-white flex flex-row items-center justify-between shadow-md rounded p-4 line-clamp-1"
                    >
                        <Link 
                            className="hover:text-sky-700 font-bold cursor-pointer text-dark-1 "
                            href={`/quiz-details/${ele._id}`}
                        >
                            {ele.quiz_info.title}
                        </Link>

                        <div>
                            <i 
                              className="fa fa-eye mr-5 cursor-pointer transition-transform transform hover:scale-125" 
                              aria-hidden="true"
                              onClick={() => handleGetUsersPlay(ele._id)}
                            ></i>
                            <Link
                                href={`/edit-quiz/${ele._id}`}
                            >
                                <i 
                                    className="fas fa-edit mr-5 cursor-pointer transition-transform transform hover:scale-125"
                                ></i>
                            </Link>
                            <i 
                                className="fa fa-trash text-red-500 cursor-pointer transition-transform transform hover:scale-125"
                                onClick={() => handleSetSelectQuiz(ele)}
                            ></i>
                        </div>
                    </div>
                )
            }
            )}
        
        <DeleteQuizModal 
          quiz={selectQuizData}
          handleDeleteQuiz={handleDeleteQuiz} 
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />

        {isUserPlayModalOpen && 
        <UsersPlayQuizModal 
          onClose={closeUserPlayModal} 
          user_play_results={user_play_results}
        />}
        
        </div>
    )
}
