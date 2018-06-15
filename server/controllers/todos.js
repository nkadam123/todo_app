const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return Todo
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(200).send(todo))
      .catch(error => res.status(404).send(error));
  },
  list(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todos => res.status(200).send({ todos: todos }))
      .catch(error => res.status(404).send(error));
  },
  retrieve(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => {
        if(!todo){
          res.status(404).send({
            message: 'Todo not found',
          })  
        }
        res.status(200).send(todo)
      })
      .catch(error => res.status(404).send(error));
  },
  update(req, res){ 
    return Todo
    .findById(req.params.todoId, {
      include: [{
        model: TodoItem,
        as: 'todoItems',
      }],
    })
    .then(todo => {
      if(!todo){
        res.status(404).send({
          message: 'Todo not found',
        })
      }
      return todo
        .update({
          title: req.body.title || todo.title,
        })
        .then(() => res.status(200).send(todo))
        .catch(error => res.status(404).send(error));
    })
    .catch(error => res.status(404).send(error));
  },
  destroy(req, res){ 
    return Todo
    .findById(req.params.todoId, {
      include: [{
        model: TodoItem,
        as: 'todoItems',
      }],
    })
    .then(todo => {
      if(!todo){
        res.status(404).send({
          message: 'Todo not found',
        })
      }
      return todo
        .destroy()
        .then(() => res.status(200).send({ message: 'Todo deleted successfully.' }))
        .catch(error => res.status(404).send(error));
    })
    .catch(error => res.status(404).send(error));
  }
};
