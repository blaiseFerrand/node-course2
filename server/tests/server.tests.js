const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');


const todos = [{
  _id: new ObjectID(),
  text: 'First todo'
}, {
  _id: new ObjectID(),
  text: 'Second todo'
}];

// to make test iondependent of current state of db
beforeEach((done) => {
  Todo.remove({}).then(() => {
    // clear data base
    // done());
    // or use dummy content
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
      var text = 'Test todo text';

      request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if (err) {
            // stop function and show error
            return done(err);
          }

          // return all todos  find()
          // or return matches to text above
          Todo.find({text}).then((todos) => {
            // assumes db is empty
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e) => done(e));
        });
  });

  it('should not create a new todo with invalid body', (done) => {
      var text = 'Test todo text';

      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            // stop function and show error
            return done(err);
          }

          // return all todos  find()
          // or return matches to text above
          Todo.find().then((todos) => {
            // assumes db is empty
            expect(todos.length).toBe(2);
            done();
          }).catch((e) => done(e));
        });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    // super test request
    request(app)
    // use template string 'inject'
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    // super test request
    var badID = new ObjectID();
    request(app)
    // use template string 'inject'
    .get(`/todos/${badID}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 non object ids', (done) => {
    // super test request
    request(app)
    // use template string 'inject'
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  });
});
