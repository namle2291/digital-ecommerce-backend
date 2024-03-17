const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderModal = new Schema(
  {
    order_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    total_price: { type: Number, require: true, default: 0 },
    payment_method: { type: String, default: "COD", require: true },
    ship_address: { type: String, require: true },
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
    status: {
      type: String,
      default: "Processing",
      enum: ["Processing", "Canceled", "Successed"],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderModal);
