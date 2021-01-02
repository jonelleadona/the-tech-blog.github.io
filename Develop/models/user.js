const { Model, DataTypes, Sequelize} = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class user extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

user.init(
  {
    id: {
     type: DataTypes.INTEGER,
     allowNull: false,
     primaryKey: true,
     autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // only allow values with length between 2 and 12
        len: [2,12]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      }
    },
  },
  {
    hooks: {
        beforeCreate: async(newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
        beforeUpdate: async(updateUserData) => {
        updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
        return updateUserData;
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = user;