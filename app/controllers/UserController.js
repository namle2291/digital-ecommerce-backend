const User = require("../models/User");

class UserController {
  async register(req, res, next) {
    try {
      const { first_name, last_name, phone, email, password } = req.body;

      if (!email || !password || !first_name || !last_name || !phone) {
        throw new Error("Missing inputs");
      }

      const user = await User.findOne({ email });

      if (user) {
        throw new Error(`User with email ${email} exists!`);
      }

      await User({ first_name, last_name, phone, email, password }).save();

      res.json({
        message: "Register success, please login!",
      });
      
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
