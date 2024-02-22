"use client"

import Tab from "./TabProfile";
import { useState } from "react";
import { PlayDataDetail } from "@/interfaces/PlayDataInterface";
import { AnswerResultModal, PlayDataCard } from "./PlayDataCard";

interface Props {
  userPosts: any,
  userComment: any,
  userFavourite: any,
  playDataDetails: PlayDataDetail[],
}

export default function BotProfile(props: Props) {

  //Answer Result Modal
  const [isAnswerResultModalOpen, setIsAnswerResultModalOpen] = useState(false);
  const [selectPlatData, setSelectPlatData] = useState<PlayDataDetail>();

  const openAnswerResultModal = (select_value: PlayDataDetail) => {
    setSelectPlatData(select_value)
    setIsAnswerResultModalOpen(true);
  };

  const closeAnswerResultModal = () => {
    setIsAnswerResultModalOpen(false);
  };

  return (
      <div className='pb-2'>
        <div className='p-8 mt-2 bg-white shadow-md rounded-lg'>
          <Tab 
            userPosts={props.userPosts} 
            userComment={props.userComment} 
            userFavourite={props.userFavourite}
          />
        </div>
        <div className="p-8 mt-2 mb-10 bg-white shadow-md rounded-lg">
          <div className="bg-gray-200 text-2xl font-bold border mb-5 rounded-xl px-2 text-center">
            Play History
          </div>
          <div className="flex flex-col gap-3 bg-gray-200 border rounded-xl p-4">
            {props.playDataDetails.length === 0 ? 
            (<div>You have not play any Quiz</div>) 
            : props.playDataDetails.map(ele => (
            <div key={JSON.stringify(ele)}>
              <PlayDataCard 
                play_data_detail={ele} 
                onButtonClick={() => openAnswerResultModal(ele)}
              />
              {isAnswerResultModalOpen && (
                <AnswerResultModal 
                  play_data_detail={selectPlatData} 
                  onClose={closeAnswerResultModal} 
                />
              )}
            </div>
            ))}
          </div>
        </div>
      </div>
  )
}