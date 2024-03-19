const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");
const isEmployee = require("../app/middlewares/isEmployee");
const OrderController = require("../app/controllers/OrderController");

router.get("/", verifyToken, OrderController.getALl);
router.get("/:id", verifyToken, OrderController.detail);
router.put("/:order_id", verifyToken, isEmployee, OrderController.update);
router.post("/", verifyToken, OrderController.add);

module.exports = router;
