const express = require('express');
const app = express();
const morgan = require('morgan'); // logger
const sessionHandler = require('../middleware/session-handler');
const rateLimit = require('express-rate-limit');
require('../db');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded());
var router = require('./routes.js');

let port = 1128;

app.use(sessionHandler);
app.use('/', router); // this sends stuff to the router

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// app.listen(port, '192.168.86.80', (err) => {
//   console.log('jawn:', err)
// } ,function() {
//   console.log(`listening on port ${port}`);
// });