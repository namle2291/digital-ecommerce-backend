const express = require("express");
const app = express();
const { notFoundHandler, handlerError } = require("../app/exceptions/handler");

const homeRouter = require("./home");
const userRouter = require("./user");

app.use("/home", homeRouter);
app.use("/users", userRouter);

// Handler Error
app.use(notFoundHandler);
app.use(handlerError);

module.exports = app;
