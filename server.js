const express = require("express");
const router = require("./routes");
const connectDB = require("./config/database");
const bodyParse = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 5000;

require("dotenv").config();

// Config
app.use(cors());
app.use(cookieParser());
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
