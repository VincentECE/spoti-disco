const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan'); // logger
const sessionHandler = require('./middleware/session-handler');
const rateLimit = require('express-rate-limit');
const cacheHandler = require('./middleware/cache-handler');
require('./db');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded());
var router = require('./routes.js');

app.use(sessionHandler);
app.use('/', router); // this sends stuff to the router

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}`);
});

// app.listen(port, '192.168.86.80', (err) => {
//   console.log('jawn:', err)
// } ,function() {
//   console.log(`listening on port ${port}`);
// });