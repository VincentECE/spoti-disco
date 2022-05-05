const router = require('express').Router();
const { getEvents } = require('./apiRelay');

router.post('/events', (req, res) => {
  console.log('the cookie is', req.session_id);
  console.log('made it to /events');
  const zipCode = req.body.zipCode;
  getEvents(zipCode, res);
});

module.exports = router;