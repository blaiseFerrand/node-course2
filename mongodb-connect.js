// const MongoClient = require('mongodb').MongoClient;
// using restructuring - identical
// const from property
// const {MongoClient} = require('mongodb');
const {MongoClient, ObjectID} = require('mongodb');
// var obj = new ObjectID(); // new instance of ObjectID


// var user = {name: 'steven', age: 48};
// // variable restructuring
// // new variables from structure's properties
// var {name} = user;
// console.log(name);

// port will be set when database is created
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect with mongoDB server');
  }
  console.log('Connected to mongoDB server');

// insert new todo
db.collection('Todos').insertOne({
  text: 'Something todo',
  completed: false
}, (err, result) => {
  if (err) {
    return console.log('unable to insert todo', err.name);
  }
  console.log(JSON.stringify(result.ops, undefined, 2));
});

//
// note: if no _id is assigned, mongo will create an ObjectID
// ObjectID: time stamp + computer id + random number

// // insert new user
db.collection('Users').insertOne({
  name: 'Steven',
  age: 48,
  location: 'Monument'
}, (err, result) => {
  if (err) {
    return console.log('unable to add user', err.name);
  }
  console.log(JSON.stringify(result.ops, undefined, 2));
});

  db.close();
});
