const Category = require("../models/Category");

class CategoryController {
  // Get All
  async getAll(req, res, next) {
    try {
      const categories = await Category.find();
      res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }
  async getChilds(req, res, next) {
    try {
      // Handle get childs in parent
      const categories = await Category.aggregate([
        {
          $sort: { order: 1 },
        },
        {
          $graphLookup: {
            from: "categories",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parent_id",
            as: "children",
          },
        },
        {
          $match: {
            parent_id: null,
          },
        },
      ]);
      res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }
  // Create new category
  async create(req, res, next) {
    try {
      const data = req.body;

      if (Object.keys(data).length < 0) throw Error("Missing inputs!");

      const category = await new Category(data).save();

      res.json({
        success: category ? true : false,
        message: `Create category ${category.name} success!`,
      });
    } catch (error) {
      next(error);
    }
  }
  // Update
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!id) throw Error("Missing id!");
      if (Object.keys(data).length < 0) throw Error("Missing inputs!");

      const category = await Category.findByIdAndUpdate(id, data, {
        new: true,
      });

      res.json({
        success: category ? true : false,
        message: `Category ${category.name} updated!`,
      });
    } catch (error) {
      next(error);
    }
  }
  // Delete
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) throw Error("Missing id!");

      const category = await Category.findByIdAndDelete(id);

      res.json({
        success: category ? true : false,
        message: `Category ${category.name} deleted!`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
