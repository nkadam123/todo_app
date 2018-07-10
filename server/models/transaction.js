'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    amount: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'senderId'
    }),
    Transaction.belongsTo(models.User, {
      as: 'receiver',
      foreignKey: 'receiverId'
    })
  };
  return Transaction;
};