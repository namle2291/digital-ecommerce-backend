const express = require("express");
const router = require("./routes");
const connectDB = require("./config/database");
const bodyParse = require("body-parser");
require("dotenv").config();

const app = express();
const port = 5000;
// Config
app.use(bodyParse.json());
app.use(
  bodyParse.urlencoded({
    extended: true,
  })
);
// Connect DB
connectDB();
// Init router
app.use("/api", router);

app.listen(port, () => {
  console.log("server is running on port " + port);
});
