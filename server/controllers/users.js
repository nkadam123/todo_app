const User = require('../models').User;

module.exports = {
  create(req, res) {
    return User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      })
      .then(user => res.status(200).send(user))
      .catch(error => res.status(404).send(error));
  },
  retrieve(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if(!user){
          res.status(404).send({
            message: 'User not found',
          })  
        }
        res.status(200).send(user)
      })
      .catch(error => res.status(404).send(error));
  }
};
