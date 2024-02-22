import { NextResponse } from "next/server";
import { createComment, deleteComment, editComment } from "@/lib/actions/comment.actions";
import { Comment } from "@/interfaces/QuizInterface";

export async function POST(request: Request) {
    const body: Comment = await request.json()
    const {post_id, author_id, text} = body
    const cmt = await createComment(post_id, text, author_id)
    return NextResponse.json({"msg": "Message from api post", "cmt": cmt})
}

export async function DELETE(request: Request) {
    const body = await request.json()
    const comment_id = body.comment_id;
    const result = await deleteComment(comment_id);
    return NextResponse.json({"msg": "Message from api delete", "result": result})
}

export async function PUT(request: Request) {
    const body = await request.json()
    const new_comment: Comment = body.comment;
    console.log("PUT:", new_comment)
    const result = await editComment(new_comment._id, new_comment.text);
    return NextResponse.json({"msg": "Message from api put", "result": result})
}