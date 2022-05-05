const router = require('express').Router();
const { getEvents } = require('./apiRelay');
const { addArtist, getFavoriteArtists } = require('../controllers');

router.post('/events', (req, res) => {
  const zipCode = req.body.zipCode;
  console.log('inside/events')
  getEvents(zipCode, res);
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