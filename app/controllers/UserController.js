const User = require("../models/User");

const { genarateToken } = require("../jwt/jwt");

class UserController {
  // Register
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
  // Login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw new Error("Missing inputs!");

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error(`User with email ${email} not found!`);
      }

      if (user && (await user.isCorrectPassword(password))) {
        const token = genarateToken({ _id: user._id });
        res.json({
          message: "Login success!",
          access_token: token,
        });
      }

      res.json({
        message: "Login fail!",
      });
      
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
