// use object id methods
const {ObjectID} = require('mongodb');

const {mongoose} = require('./server/db/mongoose');
const {Todo} = require('./server/models/todo');
const {User} = require('./server/models/user');

var id = '58dda667c0f6361b9924192a';
//
// if (!ObjectID.isValid(id)) {
//   console.log('id not valid');
// };

// Todo.find({
//   // mogoose will convert this to an object for us, i.e. no new ObjectID...
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//    _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('id not found');
  }
  console.log('Todo by id', todo);
}).catch((e) => console.log(e.message));
// catch looks for invalid ids, etc


id = '58ddae3aa8f8f9459e3ff631';

User.findById(id).then((user) => {
    if (!user) {
      return console.log('id not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
  }, (e) => {
    console.log('User not found');
  }).catch((e) => console.log(e.message));
  // catch looks for invalid ids, etc

  User.find({
     name: 'Steven'
  }).then((user) => {
    console.log('user', user);
  });

  User.find().then((users) => {
    console.log(JSON.stringify(users, undefined, 2));
  });
