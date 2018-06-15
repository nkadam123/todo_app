const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoitems;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welocme to ToDos App!',
  }));

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.put('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);
  app.post('/api/todos/:todoId/items', todoItemsController.create);
};
