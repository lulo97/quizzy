import Image from "next/image";
import { formatDateTime } from "./Utils";
import { UserPlayResult } from "@/interfaces/PlayDataInterface";

  export default function UsersPlayQuizCard(props: { userPlay: UserPlayResult }) {
    return (
      <div className="p-4 border rounded-md shadow-md mb-4">
  
        <div className="flex flex-row justify-center items-start ">
          <Image
            src={props.userPlay.user.image}
            alt="User image"   
            width={60}
            height={0}
            className="rounded-full"
          ></Image>
          
          {/*User section*/}
          <div className="flex-1 ml-3">
            <div className="mb-2">
              <span className="font-bold">{props.userPlay.user.name}</span>
            </div>
            <div className="">
              <span className="font-bold text-gray-400">{props.userPlay.user.username}</span>
            </div>
          </div>
  
          {/*Score, time taken section*/}
          <div className="">
            <div className="mb-2 text-green-500">
              <span className="font-bold ">Score:</span> {`${props.userPlay.score}/${props.userPlay.max_score}`}
            </div>
            <div className="">
              <span className="font-bold">Time Taken:</span> {props.userPlay.time_taken}s
            </div>
          </div>
        </div>
  
        {/*Play when section*/}
        <div className="mt-2">
          <span className="text-gray-400">{formatDateTime(props.userPlay.createdAt)}</span>
        </div>
      </div>
    );
  }