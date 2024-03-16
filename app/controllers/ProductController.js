const slugify = require("slugify");
const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;

class ProductController {
  // Get All
  async getAll(req, res, next) {
    try {
      const products = await Product.find();

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }
  // Create
  async add(req, res, next) {
    try {
      const data = req.body;

      if (Object.keys(data).length < 0) throw Error("Missing inputs!");

      if (req?.file) {
        const { path } = req?.file;
        data.thumbnail = path;
      }

      data.slug = slugify(data?.name, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: false,
        locale: "vi",
        trim: true,
      });

      const product = await new Product(data).save();

      res.json({ success: product ? true : false, product });
    } catch (error) {
      next(error);
    }
  }
  // Update
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (Object.keys(data).length < 0) throw Error("Missing inputs!");

      if (req?.file) {
        const { path } = req?.file;
        data.thumbnail = path;
        uploadCloud.des;
      }

      data.slug = slugify(data?.name, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: false,
        locale: "vi",
        trim: true,
      });

      const product = await Product.findByIdAndUpdate(id, data);

      res.json({
        success: product ? true : false,
        message: `Product ${product.name} updated!`,
      });
    } catch (error) {
      next(error);
    }
  }
  // Delete
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByIdAndDelete(id);

      res.json({
        succes: product ? true : false,
        message: `Product ${product.name} deleted!`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
