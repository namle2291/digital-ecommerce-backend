const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");

const UserController = require("../app/controllers/UserController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me", verifyToken, UserController.getCurrent);

module.exports = router;
