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
     // gives a unique id
     type: DataTypes.UUID,
     // default values
     defaultValue: Sequelize.UUIDV4,
     allowNull: false,
     primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(25),
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
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updateUserData) {
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