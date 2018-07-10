'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Transaction, {
      foreignKey: 'senderId',
    }),
    User.hasMany(models.Transaction, {
      foreignKey: 'receiverId',
    })
  };
  return User;
};