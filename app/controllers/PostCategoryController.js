const PostCategory = require("../models/PostCategory");

class PostCategoryController {
  // Get all
  async getAll(req, res, next) {
    try {
      const result = await PostCategory.find();
      res.json({
        success: true,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  // Create
  async add(req, res, next) {
    try {
      const { title } = req.body;
      if (!title) throw Error("Missing inputs!");

      await PostCategory({ title }).save();

      res.json({
        success: true,
        message: `Create success!`,
      });
    } catch (error) {
      next(error);
    }
  }
  //  Update
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      if (!title) throw Error("Missing inputs!");

      const result = await PostCategory.findByIdAndUpdate(
        id,
        { title },
        { new: true }
      );

      res.json({
        success: true,
        message: `Update ${result.title} success!`,
      });
    } catch (error) {
      next(error);
    }
  }
  //   Delete
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const result = await PostCategory.findByIdAndDelete(id);

      res.json({
        success: true,
        message: `Delete ${result.title} success!`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostCategoryController();
