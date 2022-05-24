const { redisClient } = require('../models');

async function cache(req, res, next) {
  const marketId = req.query?.marketId;

  try{
    const data = await redisClient.get(marketId);
    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  } catch(err) {
    console.log('something broke in cache-handler', err.message);
    res.send(err.message);
  }

}

module.exports = {
  cache,
}