const slugify = require("slugify");
const Product = require("../models/Product");
const Category = require("../models/Category");
const data = require("../data/data");
const cloudinary = require("cloudinary").v2;

class ProductController {
  // Get All
  async getAll(req, res, next) {
    try {
      let queryObj = { ...req.query };
      const excludedFields = ["sort", "limit", "page", "fields", "color"];
      excludedFields.forEach((item) => delete queryObj[item]);

      if (req.query.color) {
        const colorArray = req.query.color
          .split(",")
          .map((item) => item.toUpperCase());

        queryObj.variants = {
          $elemMatch: {
            label: "Color",
            variants: {
              $elemMatch: { value: { $in: colorArray } },
            },
          },
        };
      }

      let queryString = JSON.stringify(queryObj);
      queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
        return `$${match}`;
      });

      let query = Product.find(JSON.parse(queryString));

      // Pagination
      const pageOptions = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
      };

      let skip = (pageOptions.page - 1) * pageOptions.limit;
      query = query.skip(skip);
      query = query.limit(pageOptions.limit);

      // Sort
      if (req.query?.sort) {
        let sort = req.query?.sort;
        query = query.sort(sort);
      } else {
        query = query.sort("-createdAt");
      }

      const products = await query;

      const total_page = Math.ceil(products.length / pageOptions.limit);

      res.json({
        success: true,
        results: products.length,
        total_page,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }
  // test
  async test(req, res, next) {
    try {
      const { color } = req.query;

      const product = await Product.find({
        variants: {
          $elemMatch: {
            label: "Color",
            variants: { $elemMatch: { value: { $in: color.split(",") } } },
          },
        },
      });

      res.json({
        result: product.length,
        product,
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
  // Seeding
  async insert(req, res, next) {
    try {
      data?.map(async (product, index) => {
        const category = product.category[1];
        const getCate = await Category.findOne({ name: category });
        let data = {};

        if (getCate) {
          const cateId = getCate._id;
          const price = +product.price.split(",")[0].split(".").join("");

          data.category_id = cateId;
          data.name = product.name;
          data.thumbnail = product.thumb;
          data.description = product.description;
          data.price = price;
          data.quantity = Math.floor(Math.random() * 20);
          data.slug = slugify(product.name, {
            replacement: "-",
            remove: undefined,
            lower: true,
            strict: false,
            locale: "vi",
            trim: true,
          });
          data.images = product.images;
          //   variants: [
          //     {
          //       label: "Internal",
          //       variants: ["32GB", "64GB", "128GB"],
          //     },
          // ]
          data.variants = product.variants.map((item) => {
            return {
              label: item.label,
              variants: item.variants.map((v) => {
                return {
                  value: v,
                  quantity: Math.floor(Math.random() * 15),
                  price: Math.floor(Math.random() * price) + 1000000,
                };
              }),
            };
          });
        }

        const newProduct = await new Product(data);
        newProduct.save();
        console.log(`>>> product ${newProduct.name} created!`);
      });

      // categories?.map((ct) => {
      //   let cate = new Category({ name: ct });
      //   cate.save();
      //   console.log(`>>> category ${cate.name} created!`);
      // });

      res.json(">>> insert product success!");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
