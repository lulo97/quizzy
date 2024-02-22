import Comment from "../models/comment.model";
import { connectToDB } from "../mongoose";
import { fetchQuizById } from "./quiz.actions";

export async function createComment(post_id: string, text: string, author_id: string): Promise<void> {
    try {
    // Create a new comment instance
    const newComment = new Comment({
      text: text,
      post_id: post_id,
      author_id: author_id,
      createdAt: new Date(),
    });

    // Save the comment to the database
    await newComment.save();

    console.log("Comment created successfully");
  } catch (error) {
    console.error("Error while creating comment:", error);
    throw new Error("Unable to create comment");
  }
}

//post_id = post id contain that comments
export async function fetchCommentByParentId(post_id: string) {
  connectToDB();
  try {
    //Find list of comments if a parent
    const comments = await Comment.find({ post_id: post_id }).exec();
    return comments;
  } catch (err) {
    console.error("Error while fetching commemts:", err);
    throw new Error("Unable to fetch commemts");
  }
}

export async function fetchCommentByAuthorId(author_id: string) {
  connectToDB();
  try {
    const comments = await Comment.find({ author_id: author_id }).exec();

    // Fetch and add quiz object to each comment
    const commentsWithParentTitle: any = await Promise.all(
      comments.map(async (comment) => {
        const quiz = await fetchQuizById(comment.post_id);
        if (quiz) {
          const parent_title = quiz.quiz_info.title
          // Add quiz object to the comment
          return { ...comment.toObject(), parent_title };
        }
      })
    );

    return commentsWithParentTitle;
  } catch (err) {
    console.error("Error while fetching commemts:", err);
    //throw new Error("Unable to fetch commemts");
  }
}

export async function deleteComment(commentId: string){
  try {
    await Comment.deleteOne({ _id: commentId }).exec();
    console.log("Comment deleted successfully from deleteComment()");
  } catch (error) {
    console.error("Error while deleting comment:", error);
    throw new Error("Unable to delete comment");
  }
}

export async function editComment(commentId: string, newText: string): Promise<void> {
  try {
    // Find the comment by ID
    const comment = await Comment.findById(commentId).exec();

    if (!comment) {
      throw new Error("Comment not found");
    }

    // Update the comment text
    comment.text = newText;
    comment.updatedAt = new Date();

    // Save the updated comment
    await comment.save();

    console.log("Comment edited successfully");
  } catch (error) {
    console.error("Error while editing comment:", error);
    throw new Error("Unable to edit comment");
  }
}