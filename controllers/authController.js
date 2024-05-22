const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class AuthController {
  static async register(req, res, next) {
    try {
      const { name, age, email, password } = req.body;
      if (!name) throw { name: "Name is required" };
      if (!age) throw { name: "Age is required" };
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const findEmail = await User.findOne({
        where: { email },
      });
      if (findEmail) throw { name: "Email already exist" };

      const data = await User.create({
        name,
        age,
        email,
        password,
      });
      res.status(201).json({
        id: data.id,
        name: data.name,
        age: data.age,
        email: data.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const data = await User.findOne({ where: { email } });
      if (!data) throw { name: "Invalid email/password" };

      const checkPassword = comparePassword(password, data.password);
      if (!checkPassword) throw { name: "Invalid email/password" };

      const payload = { id: data.id };
      const access_token = signToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
