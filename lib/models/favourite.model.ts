import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
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

/*
Model not create util there is a record create 

try {
  const Favourite = mongoose.model("Favourite", favouriteSchema)
  const test = new Favourite({ post_id: '123', author_id: '123' });
  await test.save();
} catch {

}
*/

const Favourite = mongoose.models.Favourite || mongoose.model("Favourite", favouriteSchema);

export default Favourite;