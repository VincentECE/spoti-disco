const axios = require('axios');
const ticketMasterUrl =  'https://app.ticketmaster.com/discovery/v2/events?';

const getEvents = function (marketId) {
  const ticketMasterQuery = `locale=*&marketId=${marketId}&genreId=KnvZfZ7vAvF&`;

 return axios({
    method: 'get',
    url: ticketMasterUrl.concat(process.env.TICKET_MASTER_KEY, ticketMasterQuery),
    responseType: 'JSON',
  })

}

module.exports = {
  getEvents,
}
