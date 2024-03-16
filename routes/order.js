const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");
const isAdmin = require("../app/middlewares/isAdmin");
const OrderController = require("../app/controllers/OrderController");

router.post("/", verifyToken, OrderController.add);

module.exports = router;
