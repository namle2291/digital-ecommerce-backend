const User = require("../models/User");

class CartController {
  // Add to cart
  async add(req, res, next) {
    try {
      const { _id } = req.user;
      const {
        product,
        title,
        price,
        quantity = 1,
        thumbnail,
        color,
      } = req.body;

      if (!product || !title || !price || !quantity || !thumbnail || !color)
        throw Error("Missing inputs!");

      const user = await User.findById(_id);

      if (!user) throw Error("User not found!");

      const cart = user?.cart;

      const productExists = cart?.find(
        (item) => item?.product?.toString() === product?.toString()
      );

      const productColorExists = cart?.find(
        (item) => item?.color.toString() === color.toString()
      );

      if (productExists && productColorExists) {
        await User.findOneAndUpdate(
          {
            cart: { $elemMatch: { product, color } },
          },
          { $set: { "cart.$.quantity": quantity } },
          { new: true }
        );
      } else {
        await user.updateOne(
          {
            $push: {
              cart: { product, title, price, quantity, thumbnail, color },
            },
          },
          { new: true }
        );
      }

      res.json({
        success: true,
        message:
          productExists && productColorExists
            ? "Updated quantity!"
            : "Add to cart success!",
      });
    } catch (error) {
      next(error);
    }
  }
  //   Update
  async update(req, res, next) {
    try {
      const { _id } = req.user;

      const { product, quantity, color } = req.body;

      if (!product || !quantity) throw Error("Missing inputs!");

      await User.findOneAndUpdate(
        {
          _id,
          cart: { $elemMatch: { product, color } },
        },
        {
          $set: { "cart.$.quantity": quantity },
        }
      );

      res.json({
        success: true,
        message: "Update quantity success!",
      });
    } catch (error) {
      next(error);
    }
  }
  // Delete
  async delete(req, res, next) {
    try {
      const { _id } = req.user;
      const { product, color } = req.body;

      if (!product || !color) throw Error("Missing inputs!");

      const user = await User.findById(_id);

      const productExists = user?.cart?.some(
        (item) =>
          item?.product?.toString() === product.toString() &&
          item?.color?.toString() === color.toString()
      );

      if (!productExists) throw Error("Product not found!");

      await user.updateOne({
        $pull: { cart: { product, color } },
      });

      res.json({
        success: true,
        message: "Delete success",
      });
    } catch (error) {
      next(error);
    }
  }
  // Delete All
  async deleteAll(req, res, next) {
    try {
      const { _id } = req.user;

      const user = await User.findByIdAndUpdate(_id, { cart: [] });

      res.json({
        success: true,
        message: "Your cart is empty!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
