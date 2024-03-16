const Order = require("../models/Order");
const User = require("../models/User");

class OrderController {
  // Get ALl
  async getALl(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  // Add
  async add(req, res, next) {
    try {
      const { _id } = req.user;

      const user = await User.findById(_id);

      if (!user) throw Error("User not found!");

      const order = await new Order(data).save();

      res.json({
        order,
      });
    } catch (error) {
      next(error);
    }
  }
  // Update
  async update(req, res, next) {
    try {
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
