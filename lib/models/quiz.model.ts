import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  quizzes: {
    type: Array,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  attempts: {
    type: Number,
    default: 0
  },
  quiz_info: {
    type: Object,
    required: true,
  }
});

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;