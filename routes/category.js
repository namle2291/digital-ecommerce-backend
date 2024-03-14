const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");
const isAdmin = require("../app/middlewares/isAdmin");
const CategoryController = require("../app/controllers/CategoryController");

router.get("/", CategoryController.getAll);
router.get("/getChilds", CategoryController.getChilds);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

module.exports = router;
