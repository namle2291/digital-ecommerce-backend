const User = require("../models/User");

const { generateToken } = require("../jwt/jwt");
const sendMail = require("../../config/mailer");

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
        const token = generateToken(payload);
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
  // Update user
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { ...data } = req.body;

      await User.findByIdAndUpdate(id, data, { new: true }).then((u) => {
        res.json({
          success: true,
          message: `User with email ${u.email} updated!`,
        });
      });
    } catch (error) {
      next(error);
    }
  }
  // Delete user
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndDelete(id);

      res.json({
        success: user ? true : false,
        message: user
          ? `User with email ${user.email} deleted!`
          : "Something went wrong!",
      });
    } catch (error) {
      next(error);
    }
  }
  // Reset Password
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      if (!email) throw Error("Missing email!");

      const user = await User.findOne({ email });

      if (!user) throw Error("User not found!");

      // Update field reset_password_token
      user.updateResetPasswordToken();

      await user.save();

      const html = `<span>Vui lòng click vào đường link sau
       đây để cập nhật mật khẩu <a href='${process.env.SERVER_URL}/reset-password?token=${user.password_reset_token}'>
       Click me</a>, đường link này có hiệu lực 15'</span>`;

      const subject = "Reset your password";

      sendMail({ email, html, subject });

      res.json({
        success: user ? true : false,
        message: "Please check your email!",
      });
    } catch (error) {
      next(error);
    }
  }
  // Reset password
  async resetPassword(req, res, next) {
    try {
      const { password, token } = req.body;

      const user = await User.findOne({ password_reset_token: token });

      if (!user) throw Error("Reset token invalid!");

      if (
        user.password_reset_expires &&
        user.password_reset_expires < Date.now()
      ) {
        user.password_reset_token = "";
        user.password_reset_expires = "";
        throw Error("Token exprised!");
      }

      user.password = password;
      user.password_reset_token = "";
      user.password_reset_expires = "";
      user.save();

      res.json({
        message: "Your password updated!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
