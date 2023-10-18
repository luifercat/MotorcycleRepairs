import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";
import { encryptedPassword } from "../config/plugins/encriptedPassword.plugin.js";

const User = sequelize.define(
  "user",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      field: "Use_Id",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("client", "employee"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "not available"),
      allowNull: false,
      defaultValue: "available",
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await encryptedPassword(user.password);
      },
    },
  }
);

export default User;
