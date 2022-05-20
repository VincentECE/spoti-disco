const axios = require('axios');
const { TICKET_MASTER_KEY } = require('../../config');
const ticketMasterUrl =  'https://app.ticketmaster.com/discovery/v2/events?apikey=eyKzsAIxTpp4FCwrBJdOsoz0yWrvl35V&locale=*&';

const getEvents = function (marketId) {
  const ticketMasterQuery = `marketId=${marketId}&genreId=KnvZfZ7vAvF`;

  console.log('MarketID', marketId);

 return axios({
    method: 'get',
    url: ''.concat(ticketMasterUrl, ticketMasterQuery),
    responseType: 'JSON',
  })

}

module.exports = {
  getEvents,
}
