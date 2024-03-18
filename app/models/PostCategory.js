const mongoose = require("mongoose");
const { Schema } = mongoose;

const postCategoryModel = new Schema(
  {
    title: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post_Category", postCategoryModel);
