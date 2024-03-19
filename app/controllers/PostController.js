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
  // Get detail
  async detail(req, res, next) {
    try {
      const { id } = req.params;

      const result = await Post.findById(id).populate(
        "likes",
        "_id first_name last_name"
      ).populate(
        "dislikes",
        "_id first_name last_name"
      );

      if (!result) throw Error("Post not found!");

      res.json({
        success: true,
        data: result,
      });
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
  // Like post
  async like(req, res, next) {
    try {
      const { id } = req.params;
      const { _id } = req.user;

      if (!id) throw Error("Missing inputs!");

      const post = await Post.findById(id);

      const userLiked = post.likes.some(
        (item) => item.toString() === _id.toString()
      );

      if (userLiked) {
        await Post.findByIdAndUpdate(id, { $pull: { likes: _id } });
      } else {
        await Post.findByIdAndUpdate(id, {
          $push: { likes: _id },
          $pull: { dislikes: _id },
        });
      }

      res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  // Dislike post
  async dislike(req, res, next) {
    try {
      const { id } = req.params;
      const { _id } = req.user;

      if (!id) throw Error("Missing inputs!");

      const post = await Post.findById(id);

      const userDisLiked = post.dislikes.some(
        (item) => item.toString() === _id.toString()
      );

      if (userDisLiked) {
        await Post.findByIdAndUpdate(id, { $pull: { dislikes: _id } });
      } else {
        await Post.findByIdAndUpdate(id, {
          $push: { dislikes: _id },
          $pull: { likes: _id },
        });
      }

      res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
