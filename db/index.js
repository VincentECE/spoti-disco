const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/Spoti-disco';

mongoose.connect(url, {autoIndex: false}, () => {
  console.log('Database connected!')
}, e => console.log('error: ',e))
