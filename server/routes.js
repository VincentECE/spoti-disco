const router = require('express').Router();
const {buildEventsData, addArtist, getFavoriteArtists } = require('./controllers');
const { cache } = require('./middleware/cache-handler');

router.get('/events', cache, (req, res) => {
  const marketId = req.query?.marketId;
  console.log('the marketID is', marketId)
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