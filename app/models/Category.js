const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoryModal = new Schema(
  {
    name: { type: String, require: true },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categoryModal);
