const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");

const UserController = require("../app/controllers/UserController");

router.get("/", verifyToken, UserController.getAll);

router.get("/me", verifyToken, UserController.getCurrent);

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.put("/me", verifyToken, UserController.updateCurrentUser);
// CRUD
router.post("/create", UserController.create);

module.exports = router;
