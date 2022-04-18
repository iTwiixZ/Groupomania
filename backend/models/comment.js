'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment',{
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    dateAdd: DataTypes.DATE,
    media: DataTypes.STRING,
    likes: DataTypes.INTEGER
  },{
    clasMethods: {
      associate: function(models){
        models.Comment.belongsTo(models.User, {
          foreignKey: 'userId'
        })
        models.Comment.belongsTo(models.Post, {
          foreignKey: 'postId'
        })
    },

  } 
 })
  
  return Comment;
};