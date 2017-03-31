const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect with mongoDB server');
  }
  console.log('Connected to mongoDB server');

  // deleteMany()

  // db.collection('Todos').deleteMany({text: 'Eat lunch'});
  // or with promise
  db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete file', err.name);
  });

  // deleteOne() - deletes first one that meets the criteria


  // findOneAndDelete() - tells you what you deleted


  // db.close();
});
