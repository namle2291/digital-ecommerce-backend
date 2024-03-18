const Post = require("../models/Post");

class PostController {
  // Get All
  async getAll(req, res, next) {
    try {
      const result = await Post.find();
      res.json({ success: true, data: result });
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
      const { id } = req.params;
      const { title, description, category } = req.body;

      if (!title || !description || !category) throw Error("Missing inputs!");

      const result = await Post.findByIdAndUpdate(
        id,
        {
          title,
          description,
          category,
        },
        { new: true }
      );

      res.json({
        success: true,
        message: `Post ${result.title} updated!`,
      });
    } catch (error) {
      next(error);
    }
  }
  // Delete
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Post.findByIdAndDelete(id);

      res.json({
        success: true,
        message: `Post ${result.title} deleted!`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
