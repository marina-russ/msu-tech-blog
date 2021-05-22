const { Model, DataTypes } = require('sequelize');
const { User } = require('.');
const sequelize = require('../config/connection');

// creates user model
class Post extends Model {}

// defines table configuration
Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
  }
);

module.exports = Post;