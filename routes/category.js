const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");
const isAdmin = require("../app/middlewares/isAdmin");
const CategoryController = require("../app/controllers/CategoryController");

router.get("/", verifyToken, CategoryController.getAll);
router.get("/getChilds", CategoryController.getChilds);
router.post("/", verifyToken, CategoryController.create);
router.put("/:id", verifyToken, CategoryController.update);
router.delete("/:id", verifyToken, CategoryController.delete);

module.exports = router;
