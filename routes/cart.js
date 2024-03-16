const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");
const isAdmin = require("../app/middlewares/isAdmin");
const CartController = require("../app/controllers/CartController");

router.post("/", verifyToken, CartController.add);

module.exports = router;
