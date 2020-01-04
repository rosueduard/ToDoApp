var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var config = require("../config");
var http = require('http');
var app = express();

var bodyParser = require('body-parser');
var cors = require('cors');

// create DB connection
var _db;
var _listCollection;
MongoClient.connect(config.dbUrl, function (err, database) {
  if (err) throw err;
  else {
    _db = database;
    _listCollection = _db.collection('list');
  }
});

// config app
app.use(
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: false
  }),
  cors({
    origin: '*'
  })
);

// create server
var port = 3000;
var server = http.createServer(app);
server.listen(port, () => {
  console.log('serve is start ' + port);
});

// get all todos
app.get('/api/todos', (req, res) => {

  _listCollection.find({}).toArray(function (err, result) {
    res.set(config.headers);
    res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
      data: result
    });
  });
});

app.post('/api/add', (req, res) => {
  var newItem = req.body;

  _listCollection.insertOne(newItem, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted ", req.body);
  });

  res.set(config.headers);
  res.status(200).send({
    success: 'true',
    message: 'Item retrieved successfully',
    data: req.body
  })
});

app.delete('/api/deleteAll', (req, res) => {

  _listCollection.deleteMany({});
  res.status(200).send({
    success: 'true',
    message: 'Item retrieved successfully',
    data: req.body
  })
});

app.delete('/api/delete/:id', (req, res) => {

  _listCollection.deleteOne({"_id": ObjectId(req.params.id)}, (error, result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({
        success: 'true',
        message: 'Item deleted successfully',
        deleted: result.deletedCount
      })
    } else {
      res.status(404).send();
    }
  });
});

app.post('/api/update', (req, res) => {
    var newItem = req.body.item;

    _listCollection.updateOne({"_id": ObjectId(newItem._id)}, {$set: {"done": !newItem.done}}, function (error, result) {
      if (error) throw error;
      if (result.modifiedCount > 0) {
        newItem.done = !newItem.done;
        res.set(config.headers);
        res.status(200).send({
          success: 'true',
          message: 'Item updated successfully',
          updated: result.modifiedCount,
          item: newItem
        })
      } else {
        res.status(400).send({
          success: false,
          message: 'An error occurred!!'
        })
      }
    });
});

