const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect with mongoDB server');
  }
  console.log('Connected to mongoDB server');


  // using promise methed (then) instead of callback
  // .findOneAndUpdate(filter, update, options, callback)
  db.collection('Todos').findOneAndUpdate(
    {
      // filter
      text: 'do homework'
    }, {
      // update operators -- requried for monogo
      $set: {
        completed: true
      }
    }, {
      // options
      returnOriginal: false
    }
  ).then(
    // promise - could have been handled with callback function

    (result) => {
      console.log(result);
  }, (err) => {
    console.log('Unable to update file', err.name);
  });



  db.collection('Users').findOneAndUpdate(
    {
      // filter
      name: 'Steven'
    }, {
      // update operators -- requried for monogo
      $inc: {
        age: -1
      }
    }, {
      // options
      returnOriginal: false
    }
  ).then(
    // promise - could have been handled with callback function

    (result) => {
      console.log(result);
  }, (err) => {
    console.log('Unable to update file', err.name);
  });




  db.close();
});
