const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/digital-ecommerce");
    console.log("connect database success!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
