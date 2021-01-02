const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class comment extends Model {}

comment.init(
  {
    id: {
      // gives a unique id
      type: DataTypes.UUID,
      // default values
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    comment_content: {
      type: DataTypes.STRING(400),
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = comment;