// var mongoose = require('mongoose');
//
// // use promise over callback
// // promises are easier to chain and scale
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp2');

// replaces all of the above stuff
var {mongoose} = require('./db/mongoose.js');

// used for checking for valid id
const {ObjectID} = require('mongodb');

// other modules
var express = require('express');
var bodyParser = require('body-parser');

// create model
// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });

// do as constructor function
// var newTodo = new Todo({
//   text: ' shovel snow ',
//   completed: false,
//   completedAt: 1234
// });

// replaces all of the above stuff
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// call method to actually save
// ... with promise
// newTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
//   }, (e) => {
//     console.log('error saving file', e.name);
//   }
// );

var app = express();
// middleware
app.use(bodyParser.json());


// set up routes
app.post('/todos', (req, res) => {
  // allows us to send as JSON
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    // todos is an array
    // send object instead of of array
    // easier to work with
    res.send({todos});
  }, (e) => {
      res.status(400).send(e);
  });
});

// GET /todos/12345
// using url pattern
// variable  :id
app.get('/todos/:id', (req, res) => {
  // send back id
  // res.send(req.params);
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    // return console.log('id not valid');
    return res.status(404).send();
  };

  // findbyid
  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
  // success
    // if todo - send it back
    // if no todo - send 404 with empty body

  // error - 400 with empty body

});



app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};

//mongoose.close();
