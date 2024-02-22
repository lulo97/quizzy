/*
Passing currentPosts, setCurrentPosts from CategoryCard to CreateDateDropdown
When setCurrentPosts run in CreateDateMenuItems it doesn't change currentPosts

This code not working
*/

import { Dispatch, SetStateAction, useState } from "react";
import Dropdown from "../ui/my-dropdown";
import CreateDateMenuItems from "./CreateDateMenuItem";
import { CREATE_DATE_STYLE } from "./Utils";
import { Post } from "@/interfaces/DashboardInterface";

interface Props {
    currentPosts: Post[],
    setCurrentPosts: Dispatch<SetStateAction<Post[]>>
}

export default function CreateDateDropdown({
    currentPosts,
    setCurrentPosts
}: Props) {
    
    const [showCreateDate, setShowCreateDate] = useState<boolean>(false);
    const [labelCreateDate, setLabelCreateDate] = useState<string>("Create Date")

    return (
        <Dropdown
            buttonLabel={labelCreateDate}
            style={CREATE_DATE_STYLE} 
            show={showCreateDate}
            setShow={setShowCreateDate}>
            <CreateDateMenuItems 
                show={showCreateDate}
                setShow={setShowCreateDate}
                setButtonLabel={setLabelCreateDate}
                currentPosts={currentPosts}
                setCurrentPosts={setCurrentPosts}
            />
      </Dropdown>
    )
}