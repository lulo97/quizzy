'use client'

import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { User } from "@/interfaces/UserInterface";
import { editUserApiCall } from "./Utils";
import { useRouter } from 'next/navigation'

interface Props {
    user: User
}

export default function TopProfile(props: Props) {
    const router = useRouter();

    const [isEditUserMode, setIsEditUserMode] = useState(false)
    const [editedName, setEditedName] = useState(props.user.name);
    const [editedBio, setEditedBio] = useState(props.user.bio);

    const handleSave = () => {
        const new_user = props.user;
        new_user.name = editedName;
        new_user.bio = editedBio;
        console.log("new_user:", new_user)
        editUserApiCall(new_user, router);
        setIsEditUserMode(false);
    };

    return (
        <div className="p-8 mt-10 bg-white shadow-md rounded-lg">
        <div className="flex flex-row items-center justify-start gap-6">
            <Image 
                src={props.user.image}
                alt={editedName}
                width="0"
                height="0"
                sizes="10vh"
                className="rounded-full w-auto"
            ></Image>
            <div className="flex flex-col text-left">
                {isEditUserMode ? 
                (
                <Input 
                placeholder={props.user.name}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                >
                </Input>
                ) : 
                (
                <h2 className="text-2xl font-bold mb-2">
                    {editedName}
                </h2>
                )}
                <p className="text-gray-600 text-left">@{props.user.username}</p>
            </div>
            <div className="flex-1 text-right">
                {isEditUserMode ? 
                (
                    <i className="fa-solid fa-check text-2xl cursor-pointer transition-transform transform hover:scale-125"
                    onClick={handleSave}
                    ></i>
                ) : 
                (
                    <i 
                    className="fas fa-edit text-2xl cursor-pointer transition-transform transform hover:scale-125"
                    onClick={() => setIsEditUserMode(!isEditUserMode)}
                    ></i>
                )}

            </div>
        </div>
        {isEditUserMode ? 
        (
        <Textarea 
        className="mt-2"
        placeholder={props.user.bio}
        value={editedBio}
        onChange={(e) => setEditedBio(e.target.value)}
        >
        </Textarea>
        ) : 
        (
        <p className="text-gray-700 mt-4">
            {editedBio}
        </p>
        )}
    </div>
    )
}