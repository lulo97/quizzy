import { PlayDataDetail } from "@/interfaces/PlayDataInterface";
import { Button } from "../ui/button";
import ResultList from "../quiz-result/ResultList";

function PlayDataCardLeftBar(props: {play_data_detail: PlayDataDetail}) {
    return (
      <div>
        <div className="flex-1">
          <div className="text-xl font-semibold">
            Title: {props.play_data_detail.post.quiz_info.title}
          </div>
          <div className="text-gray-600 flex-1">
            {new Date(props.play_data_detail.createdAt).toDateString()} | Time: {props.play_data_detail.time_taken}s
          </div>
          <div className="text-green-600 font-semibold">
            Score: {`${props.play_data_detail.score}/${props.play_data_detail.max_score}`}
          </div>
        </div>
      </div>
    )
  }
  
  export function PlayDataCard(props: {
    play_data_detail: PlayDataDetail,
    onButtonClick: () => void
  }) {
    const play_data_detail = props.play_data_detail;
    return (
      <div className="border rounded-xl p-2 flex flex-row">
        <div className="flex-1">
          <PlayDataCardLeftBar play_data_detail={play_data_detail} />
        </div>
        <div className="flex justify-center items-center">
          <Button className="mr-4" onClick={props.onButtonClick}>
            View Answers
          </Button>
        </div>
      </div>
    )
  }
  
  export function AnswerResultModal(props: {
    play_data_detail: PlayDataDetail | undefined,
    onClose: () => void;
  }) {
    const play_data_detail = props.play_data_detail;
    if (!play_data_detail) return;
    const quizzes = play_data_detail.post.quizzes;
    const selectedAnswers = play_data_detail.answers;
  
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-md w-5/6 h-3/4 mt-12 overflow-y-auto">
          <div className="flex items-start mb-2">
            <div className="flex-1">
              <PlayDataCardLeftBar play_data_detail={play_data_detail} />
            </div>
            <Button onClick={props.onClose}>Close</Button>
          </div>
          <ResultList quizzes={quizzes} selectedAnswers={selectedAnswers} />
        </div>
      </div>
    )
  }