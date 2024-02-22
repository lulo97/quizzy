'use client'

import { useState } from "react";
import TabHeader from "./TabHeader";
import QuizTabContent from "./QuizTabContent";
import CommentTabContent from "./CommentTabContent";
import FavouriteTabContent from "./FavouriteTabContent";

enum TabName {
    MyQuiz, Comment, Favorite
}

interface TabProps {
    userPosts: any,
    userComment: any,
    userFavourite: any,
}

export default function Tab(props: TabProps) {
    const [activeTab, setActiveTab] = useState<TabName>(TabName.MyQuiz);

    const handleTabClick = (tabName: TabName) => {
        setActiveTab(tabName);
    };

    return (
        <div>
            <div className="bg-gray-200 rounded-2xl flex flex-row py-3 mb-5">
                <TabHeader 
                    tab_name="MyQuiz" 
                    icon_dir="/assets/documents.png" 
                    handleTabClick={() => handleTabClick(TabName.MyQuiz)}
                    isActive={activeTab === TabName.MyQuiz ? true : false}
                />
                <TabHeader 
                    tab_name="Comment" 
                    icon_dir="/assets/comments.png" 
                    handleTabClick={() => handleTabClick(TabName.Comment)}
                    isActive={activeTab === TabName.Comment ? true : false}
                />
                <TabHeader 
                    tab_name="Favorite" 
                    icon_dir="/assets/heart-filled.svg" 
                    handleTabClick={() => handleTabClick(TabName.Favorite)}
                    isActive={activeTab === TabName.Favorite ? true : false}
                />
            </div>
  
            <div className="bg-gray-200 py-7 rounded-2xl">
                {activeTab === TabName.MyQuiz && <QuizTabContent 
                    userPosts={props.userPosts} 
                />}
                {activeTab === TabName.Comment && <CommentTabContent 
                    userComment={props.userComment} 
                />}
                {activeTab === TabName.Favorite && <FavouriteTabContent
                    userFavourite={props.userFavourite} 
                />}
            </div>
      </div>
    )
}