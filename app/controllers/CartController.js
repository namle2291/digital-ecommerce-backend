const User = require("../models/User");

class CartController {
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

      if (!product && !title && !price && !quantity && !thumbnail && !color)
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
}

module.exports = new CartController();