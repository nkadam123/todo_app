const TodoItem = require('../models').TodoItem;


module.exports = {
  create(req, res) {
    console.log('req.file', req.file)
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
        avatar: req.file.path,
      })
      .then(todoItem => res.status(200).json({
        message: "Created product successfully",
        createdProduct: {
            content: todoItem.content,
            id: todoItem.id,
            avatar: todoItem.avatar,
            request: {
                type: 'GET',
                url: "http://localhost:3000/products/" + todoItem.id
            }
        }
      }))
      .catch(error => res.status(404).send(error));
  },
};