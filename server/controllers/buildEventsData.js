const { getEvents, redisClient } = require("../models");
const { selectEventsData } = require("../selectors");
const { addVideosToEvents } = require("./addVideosToEvents");

//this funciton will break down the data a bunch to send only what's needed in the front end
//this needs to get artist info, date, etc and give it to react in the front end
//this needs to get youtube link, and return multiple videos to the front
// by takign the link and then sending it to the API to return videso

//this is where the current work in progress is. The forloop inside makeEventsArray is the next logic we need to move over. We just did the select eventsdata

async function buildEventsData(marketId, res) {
  try {
    let {
      data: {
        _embedded: { events },
      },
    } = await getEvents(marketId);

    if (events[0]._embedded.attractions !== undefined) {
      let filteredEvents = selectEventsData(events);
      let eventsData = await new Promise((resolve, reject) => {
        addVideosToEvents(filteredEvents, resolve);
      });
      res.send(eventsData);
      redisClient.set(marketId, JSON.stringify(eventsData));
    } else {
      res.status(404).send('No events found!');
    }
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
}

module.exports = {
  buildEventsData,
};
