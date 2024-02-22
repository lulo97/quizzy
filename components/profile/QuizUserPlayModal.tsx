import { UserPlayResult } from "@/interfaces/PlayDataInterface";
import { Button } from "../ui/button";
import UsersPlayQuizCard from "./QuizUserPlayCard";

export default function UsersPlayQuizModal(props: {
    onClose: () => void,
    user_play_results: UserPlayResult[] | undefined
  }) {
    if (props.user_play_results === undefined) return;
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-md w-5/6 h-3/4 mt-12 overflow-y-auto">
          <div className="flex flex-row justify-center items-center mb-4">
            <div className="text-2xl font-bold flex-1">
              Player History
            </div>
            <Button onClick={props.onClose}>Close</Button>
          </div>
          {props.user_play_results.map(ele => (
          <div key={JSON.stringify(ele)}>
            <UsersPlayQuizCard userPlay={ele} />
          </div>))}
        </div>
      </div>
    )
  }