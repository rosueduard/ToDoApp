var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var config = require("../config");
var http = require('http');
var app = express();

var bodyParser = require('body-parser');
var cors = require('cors');
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

// get all todos
app.get('/api/todos', (req, res) => {

  MongoClient.connect(config.dbUrl, function (err, db) {
    if (err) throw err;
    var coll = db.collection('list');
    coll.find({}).toArray(function (err, result) {

      res.set(config.headers);
      res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        data: result
      });
    });
    db.close();
  });
});

app.post('/api/add', (req, res) => {
  // create connection and insert new item
  MongoClient.connect(config.dbUrl, function(err, db) {
    if (err) throw err;
    var newItem = req.body;
    db.collection("list").insertOne(newItem, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted ", req.body);
      db.close();
    });

    res.set(config.headers);
    res.status(200).send({
      success: 'true',
      message: 'Item retrieved successfully',
      data: req.body
    })
  });
});

app.delete('/api/deleteAll', (req, res) => {

  MongoClient.connect(config.dbUrl, function(err, db) {
    if (err) throw err;
    db.collection("list").deleteMany({});
    db.close();
    // res.set(config.headers);
    res.status(200).send({
      success: 'true',
      message: 'Item retrieved successfully',
      data: req.body
    })
  });
});

app.delete('/api/delete/:id', (req, res) => {

  // res.set(config.headers);

  MongoClient.connect(config.dbUrl, function(err, db) {
    if (err) throw err;
    console.log(req.params.id);

    db.collection("list").deleteOne({ "_id" : ObjectId(req.params.id)}, (error, result) => {
      console.log(result.deletedCount);
      db.close();
      if (result.deletedCount > 0 ) {
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
});

var port = 3000;
var server = http.createServer(app);
server.listen(port, () => {
  console.log('serve is start ' + port);
});
