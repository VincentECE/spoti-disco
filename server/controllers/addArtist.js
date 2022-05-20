const { Users } = require('../models');

function addArtist(artistInfo, session_id, res) {

  const filter = {session_id: session_id};
  const update = {$push: {favoriteArtists: artistInfo}};
  const options = {upsert: true};

  Users.findOneAndUpdate(filter, update, options)
  .then(()=>{
    res.send();
  })
  .catch((err)=>{
    console.log('Something went wrong in addArtist', err.message);
  });
}

module.exports = {
  addArtist,
}