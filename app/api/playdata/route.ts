import { NextResponse, NextRequest } from "next/server";
import { createPlayData, fetchUserByPostId } from "@/lib/actions/playdata.actions";
import { PlayDataJSON } from "@/interfaces/PlayDataInterface";
import { parseStringTo2DArray } from "@/components/quiz-result/Utils";

export async function POST(request: Request) {
    const body: PlayDataJSON = await request.json()
    const {user_id, post_id, time_taken, answers_string} = body
    const answers = parseStringTo2DArray(answers_string)
    const playdata = await createPlayData(user_id, post_id, time_taken, answers)
    return NextResponse.json({"msg": "Message from api post", "playdata": playdata})
}

export async function GET(request: NextRequest) {
    console.log("request:", request)
    const post_id = request.url.split("/api/playdata?post_id=")[1];
    const users_play = await fetchUserByPostId(post_id);
    return NextResponse.json({"post_id": post_id, "users_play": users_play})
}