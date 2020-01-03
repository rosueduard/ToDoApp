var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var cors = require('cors');
var app = express();

const bodyParser = require('body-parser');


app.use(
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: false
  }),
  cors({
    origin: '*'
  })
);

var config = require("../config");

var http = require('http');
var port = 3000;

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

  // MongoClient.connect(config.dbUrl, function(err, db) {
  //   if (err) throw err;
  //   var myobj2 = { name: "test", done: false};
  //   db.collection("list").insertOne(myobj2, function(err, res) {
  //     if (err) throw err;
  //     console.log("1 document inserted");
  //     db.close();
  //   });
  // });



  console.log(req.body);

  res.set(config.headers);

  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    data: req.body
  })
});


var server = http.createServer(app);
server.listen(port, () => {
  console.log('serve is start ' + port);
});
