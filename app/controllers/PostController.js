const Post = require("../models/Post");

class PostController {
  // Get All
  async getAll(req, res, next) {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  }
  // Add
  async add(req, res, next) {
    try {
      const { _id } = req.user;

      const { title, description, category } = req.body;

      if (!title || !description || !category) throw Error("Missing inputs!");

      await new Post({ title, description, category, author: _id }).save();

      res.json({
        success: true,
        message: "Create Post success!",
      });
    } catch (error) {
      next(error);
    }
  }
  // Update
  async update(req, res, next) {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  }
  // Delete
  async delete(req, res, next) {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
