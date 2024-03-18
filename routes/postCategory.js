const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");
const isAdmin = require("../app/middlewares/isAdmin");
const PostCategory = require("../app/controllers/PostCategoryController");

router.get("/", verifyToken, PostCategory.getAll);
router.post("/", verifyToken, PostCategory.add);
router.put("/:id", verifyToken, PostCategory.update);
router.delete("/:id", verifyToken, PostCategory.delete);

module.exports = router;
