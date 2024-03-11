const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserModel = new Schema(
  {
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    address: { type: String },
    phone: { type: Number, require: true },
    avatar: { type: String },
    refresh_token: { type: String },
  },
  { timestamps: true }
);

UserModel.pre("save", async function () {
  const passwordHashed = await bcrypt.hash(
    this.password,
    +process.env.saltRounds
  );
  this.password = passwordHashed;
});

module.exports = mongoose.model("User", UserModel);
