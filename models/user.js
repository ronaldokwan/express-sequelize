"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Note, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name cannot be null" },
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Age cannot be null" },
          notEmpty: { msg: "Age cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: { msg: "Email format is not correct" },
          notNull: { msg: "Email cannot be null" },
          notEmpty: { msg: "Email cannot be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6],
            msg: "Password at least 6 characters",
          },
          notNull: { msg: "Password cannot be null" },
          notEmpty: { msg: "Password cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
