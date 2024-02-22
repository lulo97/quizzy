import { deleteQuiz } from "@/lib/actions/quiz.actions";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const body = await request.json()
    const quiz_id = body.quiz_id;
    const result = await deleteQuiz(quiz_id);
    return NextResponse.json({"msg": "Message from api delete", "result": result})
}