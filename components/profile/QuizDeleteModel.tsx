import { QuizData } from "@/interfaces/QuizInterface"
import { Dispatch, SetStateAction } from "react"

export default function DeleteQuizModal(props: 
    { 
        quiz: QuizData | undefined,
        handleDeleteQuiz: (quiz_id: string) => void,
        modalOpen: boolean,
        setModalOpen: Dispatch<SetStateAction<boolean>>
    }
    ) {

      if (!props.quiz) return;

    // Function to handle the deletion and close the modal
    const handleDeleteInModal = () => {
      if (!props.quiz) return;
      props.handleDeleteQuiz(props.quiz._id);
      props.setModalOpen(false);
    };

    return (
        props.modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white px-8 py-5 rounded-md shadow-md">
            <p className="mb-4">Are you sure you want to delete this quiz?</p>
            <p className="mb-4 font-bold text-dark-1">Quiz: {props.quiz.quiz_info.title}</p>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                onClick={() => props.setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleDeleteInModal}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )
    );
  }