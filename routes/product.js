const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/verifyToken");
const isAdmin = require("../app/middlewares/isAdmin");
const uploadCloud = require("../config/cloudinary");

const ProductController = require("../app/controllers/ProductController");

router.get("/", ProductController.getAll);

router.post("/", uploadCloud.single("thumbnail"), ProductController.add);
router.put("/:id", uploadCloud.single("thumbnail"), ProductController.update);
router.delete("/:id", ProductController.delete);

module.exports = router;
