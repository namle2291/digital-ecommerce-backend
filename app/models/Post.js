const mongoose = require("mongoose");
const { Schema } = mongoose;

const postModal = new Schema(
  {
    title: { type: Stringm, require: true },
    thumbnail: { type: String },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    author: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    viewCount: { type: Number, default: 0 },
    description: { type: Stringm, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postModal);
