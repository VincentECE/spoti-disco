const axios = require('axios');
const { TICKET_MASTER_KEY } = require('../config');
const { makeEventsArray } = require('./pipeline');
const ticketMasterUrl = 'https://app.ticketmaster.com/discovery/v2/events?';


//this funciton will break down the data a bunch to send only what's needed in the front end
//this needs to get artist info, date, etc and give it to react in the front end
//this needs to get youtube link, and return multiple videos to the front
// by takign the link and then sending it to the API to return videso

const getEvents = function (zipCode, res) {
  const ticketMasterQuery = '&locale=*&city=Austin&genreId=KnvZfZ7vAvF';

  axios({
    method: 'get',
    url: ''.concat(ticketMasterUrl,TICKET_MASTER_KEY,ticketMasterQuery),
    responseType: 'JSON',
  })
  .then(({ data }) => {
    //passes in res as a callback
    makeEventsArray(data._embedded.events, res);
    // res.send(data._embedded.events);
  })
  .catch((err)=>{
    console.log('something went wrong in apiRelay', err.message);
    res.send(err.message);
  });
}


module.exports = {
  getEvents,
}