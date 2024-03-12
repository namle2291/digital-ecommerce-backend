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
    phone: { type: String, require: true },
    avatar: { type: String },
    refresh_token: { type: String },
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
};

module.exports = mongoose.model("User", UserModel);
