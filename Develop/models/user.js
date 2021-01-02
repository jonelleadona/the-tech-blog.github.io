const { Model, DataTypes, Sequelize} = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class user extends Model {

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
        len: [8,12]
      }
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);