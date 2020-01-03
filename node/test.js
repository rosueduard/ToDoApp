var MongoClient = require('mongodb').MongoClient;
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

app.post('/api/add', function (req, res) {
  // create connection and insert new item
  MongoClient.connect(config.dbUrl, function(err, db) {
    if (err) throw err;
    var newItem = req.body;
    db.collection("list").insertOne(newItem, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
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

var port = 3000;
var server = http.createServer(app);
server.listen(port, () => {
  console.log('serve is start ' + port);
});
