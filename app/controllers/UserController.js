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
        const payload = { _id: user._id, userType: user?.userType };
        const token = genarateToken(payload);
        res.json({
          message: "Login success!",
          access_token: token,
        });
      } else {
        res.json({
          message: "Login fail!",
        });
      }
    } catch (error) {
      next(error);
    }
  }
  // Get current user
  async getCurrent(req, res, next) {
    try {
      const { _id } = req.user;

      const user = await User.findOne({ _id }).select(
        "-password -createdAt -updatedAt"
      );

      if (!user) {
        res.json({ message: "User not found!" });
      }

      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }
  // Update current user
  async updateCurrentUser(req, res, next) {
    try {
      const { userType, ...data } = req.body;

      const { _id } = req.user;

      const user = await User.findOneAndUpdate({ _id }, data, {
        new: true,
      });

      res.json({
        success: user ? true : false,
        message: `User with email ${user.email} updated!`,
      });
    } catch (error) {
      next(error);
    }
  }
  // Get all user
  async getAll(req, res, next) {
    try {
      const users = await User.find().select("-password");

      res.json({
        success: users ? true : false,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
  // create new user
  async create(req, res, next) {
    try {
      const { first_name, last_name, phone, email, password } = req.body;

      if (!email || !password || !first_name || !last_name || !phone) {
        throw new Error("Missing inputs");
      }

      const checkUser = await User.findOne({ email, phone });

      if (checkUser) {
        throw new Error(`User with email ${email} exists!`);
      }

      const user = await User({
        first_name,
        last_name,
        phone,
        email,
        password,
      }).save();

      res.json({
        message: user
          ? `User with email ${email} created!`
          : "Something went wrong!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
