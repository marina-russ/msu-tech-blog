const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// creates user model
class Comment extends Model { }

// defines table configuration
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

module.exports = Comment;