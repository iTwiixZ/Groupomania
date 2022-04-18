'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users',{
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
        models.Users.hasMany(models.Post);
        models.Users.hasMany(models.Comment);
    },

  } 
 })
  
  return Users;
};