'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',{
    name:{
      type: DataTypes.STRING,
      allowNull: false
    }, 
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin:{ 
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    }
  },{
    clasMethods: {
      associate: function(models){
        models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);
    },

  } 
 })
  
  return User;
};