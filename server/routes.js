const router = require('express').Router();
const {buildEventsData, addArtist, getFavoriteArtists } = require('./controllers');

router.post('/events', (req, res) => {
  const marketId = req.body.marketId;
  console.log('inside/events')
  buildEventsData(marketId, res);
});

router.post('/addArtist', (req, res) => {

  const artistInfo = req.body;
  const session_id = req.session_id;

  addArtist(artistInfo, session_id, res);
});

router.get('/getFavoriteArtists', (req, res) => {

  const session_id = req.session_id;

  getFavoriteArtists(session_id, res);

});

module.exports = router;