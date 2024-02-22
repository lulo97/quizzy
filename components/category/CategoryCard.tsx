"use client"

/*
A data showing in parent only be change if it declare with useState in it is component

A data showing in a parent can't be change if it declare with useState in child component

Async in QuizCard function cause error when click dropdown button
*/

import { Post } from "@/interfaces/DashboardInterface";
import QuizCardArray from "../shared/QuizCardArray";
import { useState } from "react";
import Dropdown from "../ui/MyDropdown";
import CreateDateMenuItems from "./CreateDateMenuItem";
import { ATTEMPTS_STYLE, CREATE_DATE_STYLE } from "./Utils";
import AttemptsMenuItems from "./AttemptsMenuItems";

interface Props {
    posts: Post[],
}

export default function CategoryCard({posts}: Props) {
    const [currentPosts, setCurrentPosts] = useState(posts)

    const [showCreateDate, setShowCreateDate] = useState<boolean>(false);
    const [labelCreateDate, setLabelCreateDate] = useState<string>("Create Date")
    const [showAttempts, setShowAttempts] = useState<boolean>(false);
    const [labelAttempts, setLabelAttempts] = useState<string>("Attempts")

    return (
        <div className="w-full flex flex-col items-center justify-center gap-3">
            
            {/*Sorting section*/}
            <div className="w-5/6 bg-white flex flex-row items-center shadow-md rounded p-4">
                <div className="flex flex-row items-center gap-2">
                    SORT BY <i className="fa fa-sliders"></i>
                </div>
                <div className="ml-12 flex flex-row gap-4">

                    {/*Create Date*/}
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

                    {/*Attempts*/}
                    <Dropdown
                      buttonLabel={labelAttempts}
                      style={ATTEMPTS_STYLE} 
                      show={showAttempts}
                      setShow={setShowAttempts}>
                        <AttemptsMenuItems 
                          show={showAttempts}
                          setShow={setShowAttempts}
                          setButtonLabel={setLabelAttempts}
                          currentPosts={currentPosts}
                          setCurrentPosts={setCurrentPosts}
                        />
                    </Dropdown>
                </div>
            </div>

            {/*Quiz card section*/}
            <div className="w-full h-full flex flex-col items-center">
              <QuizCardArray posts={currentPosts} />
            </div>
        </div>
    )
}