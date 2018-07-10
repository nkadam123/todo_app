const Transaction = require('../models').Transaction;
const User = require('../models').User;

module.exports = {
  create(req, res) {
    return Transaction
      .create({
        amount: req.body.amount,
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
      })
      .then(transaction => res.status(200).send(transaction))
      .catch(error => res.status(404).send(error));
  },
  list(req, res) {
    return Transaction
      .findAll({
        where: { senderId: req.params.userId },
        include: [{
          model: User,
          as: 'sender',
        },{
          model: User,
          as: 'receiver',
        }],
      })
      .then(transactions => res.status(200).send({ transactions: transactions }))
      .catch(error => res.status(404).send(error));
  },
};