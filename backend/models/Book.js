import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true},
  author: { type: String, required: true },
  genre: String,
  year: Number,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who added book
});

export default mongoose.model("Book", bookSchema);
