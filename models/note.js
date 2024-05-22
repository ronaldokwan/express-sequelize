"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Note.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Title cannot be null" },
          notEmpty: { msg: "Title cannot be empty" },
        },
      },
      description: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "UserId cannot be null" },
          notEmpty: { msg: "UserId cannot be empty" },
        },
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
