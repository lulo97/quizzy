import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    post_id: {
      type: String,
      required: true,
    },
    author_id: {
        type: String,
        required: true,
    },
    createdAt: Date
  });

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;