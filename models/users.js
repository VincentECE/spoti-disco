const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  session_id: {
    type: String,
    required: true,
  },
  favoriteArtists: {
    type: Array,
    default: [],
  }
});

usersSchema.index({sessionId: 1, username: 1});

module.exports = mongoose.model('Users', usersSchema);