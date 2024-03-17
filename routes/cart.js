const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");
const isAdmin = require("../app/middlewares/isAdmin");
const CartController = require("../app/controllers/CartController");

router.post("/", verifyToken, CartController.add);
router.put("/", verifyToken, CartController.update);
router.delete("/", verifyToken, CartController.delete);
router.delete("/delete-all", verifyToken, CartController.deleteAll);

module.exports = router;
