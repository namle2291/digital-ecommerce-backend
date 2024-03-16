const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderModal = new Schema(
  {
    orderBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    totalPrice: { type: Number },
    status: {
      type: String,
      default: "Processing",
      enum: ["Processing", "Canceled", "Successed"],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        title: { type: String },
        quantity: { type: Number },
        price: { type: Number },
        color: { type: String },
        thumbnail: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderModal);
