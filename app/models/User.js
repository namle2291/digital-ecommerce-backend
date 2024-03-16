const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");

const UserModel = new Schema(
  {
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    address: { type: String },
    phone: { type: String, require: true, unique: true },
    avatar: { type: String },
    cart: [
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
    userType: {
      type: String,
      enum: ["user", "admin", "employee"],
      default: "user",
    },
    refresh_token: { type: String },
    password_reset_token: { type: String },
    password_reset_expires: { type: Date },
  },
  { timestamps: true }
);
// Hash password trước khi save
UserModel.pre("save", async function (next) {
  try {
    const passwordHashed = await bcrypt.hash(
      this.password,
      +process.env.saltRounds
    );
    this.password = passwordHashed;
  } catch (error) {
    next(error);
  }
});
// Hash password trước khi update
UserModel.pre("findOneAndUpdate", async function (next) {
  if (!this._update.password) {
    return next();
  }
  const passwordHashed = await bcrypt.hash(
    this._update.password,
    +process.env.saltRounds
  );
  this._update.password = passwordHashed;
});

UserModel.methods = {
  isCorrectPassword: async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
  },
  updateResetPasswordToken: function () {
    this.password_reset_token = crypto.randomBytes(48).toString("hex");
    this.password_reset_expires = Date.now() + 15 * 60 * 1000;
  },
};

module.exports = mongoose.model("User", UserModel);
