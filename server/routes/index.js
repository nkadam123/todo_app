const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoitems;
const usersController = require('../controllers').users;
const transactionsController = require('../controllers').transactions;
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welocme to ToDos App!',
  }));

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.put('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);
  app.post('/api/todos/:todoId/items', upload.single('avatar'), todoItemsController.create);
  app.post('/api/users', usersController.create);
  app.get('/api/users/:userId', usersController.retrieve);
  app.post('/api/transactions', transactionsController.create);
  app.get('/api/transactions/:userId', transactionsController.list);
};
