//this is the server index.js

const express = require('express');
const app = express();
const morgan = require('morgan'); // logger
const rateLimit = require('express-rate-limit');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded());
var router = require('./routes.js');

let port = 1128;

app.use('/', router); // this sends stuff to the router

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
