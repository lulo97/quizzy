import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Post } from "@/interfaces/DashboardInterface";
import { sortByAttempts } from "./Utils";

interface AttemptsMenuItemsProps {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    setButtonLabel: Dispatch<SetStateAction<string>>,
    currentPosts: Post[],
    setCurrentPosts: Dispatch<SetStateAction<Post[]>>
  }

export default function AttemptsMenuItems({    
    show,
    setShow,  
    setButtonLabel,
    currentPosts,
    setCurrentPosts
}: AttemptsMenuItemsProps) { 

    function handleShowAndButtonLabel(new_label: string) {
        setShow(!show);
        setButtonLabel(new_label)
        setCurrentPosts(sortByAttempts(currentPosts, new_label))
      }

    return (
        <div className="w-full">
            <Button
                className="bg-white hover:bg-gray-100 w-full text-gray-700 block px-4 py-2 text-sm whitespace-nowrap"
                onClick={(ele) => handleShowAndButtonLabel("Attempts")}
            >
                Attempts
            </Button>
            <Button
                className="bg-white hover:bg-gray-100 w-full text-gray-700 block px-4 py-2 text-sm whitespace-nowrap"
                onClick={(ele) => handleShowAndButtonLabel("Highest")}
            >
                Highest
            </Button>
            <Button
                className="bg-white hover:bg-gray-100 w-full text-gray-700 block px-4 py-2 text-sm whitespace-nowrap"
                onClick={(ele) => handleShowAndButtonLabel("Lowest")}
            >
                Lowest
            </Button>
        </div>
    )
};