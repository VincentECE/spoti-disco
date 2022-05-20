const { Users } = require('../models');

async function getFavoriteArtists(session_id, res) {
  const filter = {session_id: session_id };

  Users.find(filter).select("-_id favoriteArtists")
  .then(( favoriteArtists )=>{
    console.log('found this inside the database!', JSON.stringify(favoriteArtists[0].favoriteArtists, null, 2));
    res.send(favoriteArtists[0].favoriteArtists);

  })
  .catch((err)=>{
    console.log('something went wrong in getFavoriteArtists'. err.message);
    res.send(err.message);
  })

}

module.exports = {
  getFavoriteArtists,
}