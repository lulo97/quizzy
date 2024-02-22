import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Post } from "@/interfaces/DashboardInterface";
import { sortByCreatedAt } from "./Utils";

interface CreateDateMenuItemsProps {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    setButtonLabel: Dispatch<SetStateAction<string>>,
    currentPosts: Post[],
    setCurrentPosts: Dispatch<SetStateAction<Post[]>>
  }

export default function CreateDateMenuItems({
    show,
    setShow,  
    setButtonLabel,
    currentPosts,
    setCurrentPosts
  }: CreateDateMenuItemsProps) {
  
    function handleShowAndButtonLabel(new_label: string) {
      setShow(!show);
      setButtonLabel(new_label)
      const newPost = sortByCreatedAt(currentPosts, new_label);
      setCurrentPosts(sortByCreatedAt(currentPosts, new_label))
    }

    return (
      <div className="w-full">
        <Button
          className="bg-white hover:bg-gray-100 w-full text-gray-700 block px-4 py-2 text-sm whitespace-nowrap"
          onClick={(ele) => handleShowAndButtonLabel("Create Date")}
        >
          Create Date
        </Button>
        <Button
          className="bg-white hover:bg-gray-100 w-full text-gray-700 block px-4 py-2 text-sm whitespace-nowrap"
          onClick={(ele) => handleShowAndButtonLabel("Newest")}
        >
          Newest
        </Button>
        <Button
          className="bg-white hover:bg-gray-100 w-full text-gray-700 block px-4 py-2 text-sm whitespace-nowrap"
          onClick={(ele) => handleShowAndButtonLabel("Oldest")}
        >
          Oldest
        </Button>
      </div>
    )
  }