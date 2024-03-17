const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");
const isEmployee = require("../app/middlewares/isEmployee");
const OrderController = require("../app/controllers/OrderController");

router.post("/", verifyToken, OrderController.add);
router.put("/:order_id", verifyToken, isEmployee, OrderController.update);

module.exports = router;
