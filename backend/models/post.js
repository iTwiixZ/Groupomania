'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post',{
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    dateAdd: DataTypes.DATE,
    media: DataTypes.STRING,
    likes: DataTypes.INTEGER,
  },{
    
    clasMethods: {
      associate: function(models){
        models.Post.hasMany(models.Comment);
        models.Post.hasMany(models.Likes);
        models.Post.belongsTo(models.Users, {
          foreignKey: 'userId'
        })
        
    },

  } 
 })
  
  return Post;
};
