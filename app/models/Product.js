const mongoose = require("mongoose");
const { Schema } = mongoose;

const productModal = new Schema(
  {
    name: { type: String, require: true },
    thumbnail: { type: String, default: "default.png" },
    discount: { type: Number, default: 0 },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    quantity: { type: Number, require: true, default: 0 },
    slug: { type: String, require: true, lowercase: true },
    images: { type: Array },
    totalRaiting: { type: Number, default: 0 },
    raitings: [
      {
        star: { type: Number, require: true },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String, require: true },
      },
    ],
    variants: [
      {
        title: { type: String },
        color: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        images: { type: Array },
      },
    ],
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productModal);
