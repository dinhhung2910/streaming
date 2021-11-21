const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express();

var server  = require('http').createServer(app);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Init middleware
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3001, function () {
  console.log('Server listening on port 3001')
})
