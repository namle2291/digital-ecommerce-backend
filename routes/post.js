const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");
const isAdmin = require("../app/middlewares/isAdmin");
const PostController = require("../app/controllers/PostController");

router.get("/", verifyToken, PostController.getAll);
router.get("/:id", PostController.detail);
router.post("/", verifyToken, PostController.add);
router.put("/:id/like", verifyToken, PostController.like);
router.put("/:id/dislike", verifyToken, PostController.dislike);
router.put("/:id", verifyToken, PostController.update);
router.delete("/:id", verifyToken, PostController.delete);

module.exports = router;
