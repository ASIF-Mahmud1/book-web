import mongoose from "mongoose";
// change image file type
const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "name is required",
  },
  author: {
    type: String,
    trim: true,
    required: "author name is required",
  },
  edition: {
    type: String,
    trim: true,
  },
  publication: {
    type: String,
    trim: true,
  },
  images: {
    type: String,
    trim: true,
  },
  uid_isbn: {
    type: String,
    trim: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  uploaded_by: { type: mongoose.Schema.ObjectId, ref: "User" },
});

export default mongoose.model("Book", BookSchema);
