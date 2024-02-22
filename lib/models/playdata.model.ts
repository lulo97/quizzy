import mongoose from "mongoose";

const playdataSchema = new mongoose.Schema({
    user_id: {
      type: String,
      required: true,
    },
    post_id: {
      type: String,
      required: true,
    },
    time_taken: {
      type: Number,
      require: true,
    },
    answers: [[{ type: Number }]],
    createdAt: Date
  });

const PlayData = mongoose.models.PlayData || mongoose.model("PlayData", playdataSchema);

export default PlayData;