const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect with mongoDB server');
  }
  console.log('Connected to mongoDB server');

  // fetch all Todos; retuns cursor --pointer to documents
  // will use one of many cursor functions
  // toArray returns a promise
  db.collection('Todos').find().toArray().then( (docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err.name);
  });

  // query ones that have completed field = true
  // query by values
  // -------------------------{   put it here  }----------------
  db.collection('Todos').find({completed: false}).toArray().then( (docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err.name);
  });

  // by _id:
  // need to use the new command to create an id object
  db.collection('Todos').find({
    _id: new ObjectID('57abbb...')
  }).toArray().then( (docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err.name);
  });

  // alternatives to '.toArray'
  // count(), filter(), forEach()
  // note: these are mongo not mogoose

  db.collection('Todos').find().count().then( (count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch todos', err.name);
  });

  


  // db.close();
});
