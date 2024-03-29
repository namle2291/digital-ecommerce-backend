const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");
const isAdmin = require("../app/middlewares/isAdmin");

const UserController = require("../app/controllers/UserController");

router.get("/me", verifyToken, UserController.getCurrent);
router.get("/order-history", verifyToken, UserController.orderHistory);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/refresh-token", UserController.refreshToken);
router.put("/me", verifyToken, UserController.updateCurrentUser);
// Admin
router.post("/forgot-password", UserController.forgotPassword);
router.put("/reset-password", UserController.resetPassword);
router.post("/create", verifyToken, isAdmin, UserController.create);
router.put("/:id", verifyToken, isAdmin, UserController.update);
router.delete("/:id", verifyToken, isAdmin, UserController.delete);
router.get("/", verifyToken, UserController.getAll);

module.exports = router;
