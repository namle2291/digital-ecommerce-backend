const Order = require("../models/Order");
const User = require("../models/User");

class OrderController {
  // Get ALl
  async getALl(req, res, next) {
    try {
      const result = await Order.find().populate(
        "order_by",
        "_id first_name last_name"
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  // Get Detail
  async detail(req, res, next) {
    try {
      const { id } = req.params;

      const result = await Order.findById(id).populate(
        "order_by",
        "_id first_name last_name"
      );

      if (!result) throw Error("Order not found!");

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

      const { payment_method, ship_address } = req.body;

      if (!payment_method || !ship_address) {
        throw Error("Missing inputs!");
      }

      const user = await User.findById(_id);

      const totalPrice = user?.cart?.reduce((prev, item) => {
        return prev + item.quantity * item.price;
      }, 0);

      const order = await new Order({
        order_by: _id,
        total_price: totalPrice,
        payment_method,
        ship_address,
        products: user?.cart,
      }).save();

      if (order) {
        await User.findByIdAndUpdate(_id, { cart: [] });
      }

      res.json({
        success: true,
        message: "Thank you for your order!",
      });
    } catch (error) {
      next(error);
    }
  }
  // Update
  async update(req, res, next) {
    try {
      const { _id } = req.user;
      const { order_id } = req.params;
      const { status } = req.body;

      if (!status) throw Error("Missing inputs!");

      await Order.findByIdAndUpdate(
        order_id,
        { status, employee_id: _id },
        { runValidators: true }
      );

      res.json({
        status: true,
        message: "Update order success!",
      });
    } catch (error) {
      next(error);
    }
  }
  // Delete
  async delete(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
