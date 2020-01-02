var MongoClient = require('mongodb').MongoClient;
var express = require("express");
var config = require("../config");
var app = express();
var http = require('http');
var port = 3000;


var list;
MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
  if (err) throw err;

  var coll = db.collection('list');

  coll.find({}).toArray(function (err, result) {
    list = result;
  });
  db.close();
});


// get all todos
app.get('/api/todos', (req, res) => {
  res.set(config.headers);
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: list
  })
});

var server = http.createServer(app);
server.listen(port, () => {
  console.log('serve is start ' + port);
});
