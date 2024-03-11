const User = require("../models/User");

class UserController {
  constructor() {}

  async register(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Missing inputs");
      }

      const user = new User({ email, password });

      user.save();

      res.json({
        message: user ? "Register success, please login!" : "Register fail!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
