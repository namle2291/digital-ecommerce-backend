const express = require("express");
const app = express();
const { notFoundHandler, handlerError } = require("../app/exceptions/handler");

const homeRouter = require("./home");
const userRouter = require("./user");
const categoryRouter = require("./category");
const productRouter = require("./product");
const orderRouter = require("./order");
const cartRouter = require("./cart");
const postCategoryRouter = require("./postCategory");
const postRouter = require("./post");

app.use("/home", homeRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/cart", cartRouter);
app.use("/post-category", postCategoryRouter);
app.use("/posts", postRouter);

// Handler Error
app.use(notFoundHandler);
app.use(handlerError);

module.exports = app;
