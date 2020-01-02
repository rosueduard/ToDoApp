var express = require('express');
var http = require('http');
var path = require('path');

var port = 3000;

var app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

var server = http.createServer(app);
server.listen(port, () => {
  console.log('serve is start ' + port);
});
