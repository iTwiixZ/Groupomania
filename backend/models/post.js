'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post',{
    userId: DataTypes.INTEGER,
    // name: DataTypes.STRING,
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
        models.Post.belongsTo(models.User, {
          foreignKey: 'userId'
        })
        
    },

  } 
 })
  
  return Post;
};
