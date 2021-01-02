const user = require('./user');
const post = require('./post');
const comment = require("./comment");
const { DataTypes } = require('sequelize/types');

post.belongsTo(user, {
  foreignKey: 'user_id',
  type: DataTypes
});

comment.belongsTo(user, {
  foreignKey: "user_id",
});

comment.belongsTo(post, {
  foreignKey: 'post_id'
});

user.hasMany(post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

user.hasMany(comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

post.hasMany(comment, {
  foreignKey: 'post_id', 
  onDelete: 'CASCADE'
});


module.exports = { user, post, comment };