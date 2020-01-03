var express = require('express');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');
var port = 3000;

var config = require('../config');

// connect to db
mongoose.connect(config.dbUrl);

mongoose.connection.on('connected', () => {
  console.log('connected to mongo db server')
});

mongoose.connection.on('error', err => {
  console.log('Error at mongo DB ' + err)
});



var app = express();

// app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Hello');
});

var server = http.createServer(app);
server.listen(port, () => {
  console.log('serve is start ' + port);
});
