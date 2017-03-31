var mongoose = require('mongoose');

// use promise over callback
// promises are easier to chain and scale
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp2');

module.exports = {
  mongoose: mongoose
};
