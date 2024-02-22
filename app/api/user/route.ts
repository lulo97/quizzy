import { User } from "@/interfaces/UserInterface";
import { editUser } from "@/lib/actions/user.actions";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const body = await request.json()
    const new_user: User = body.user;
    console.log("PUT:", new_user)
    const result = await editUser(new_user._id, new_user.name, new_user.bio);
    return NextResponse.json({"msg": "Message from api put", "result": result})
}