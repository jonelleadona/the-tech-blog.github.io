const { Model, Datatypes} = require("sequelize");
const sequelize = require("../config/connection");

class post extends Model {}

post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_body: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: Datatypes.DATE,
      allowNull: false,
      // default value of the current timestamp
      defaultValue: Datatypes.NOW,
    },
    user_id: {
      type:Datatypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = post;