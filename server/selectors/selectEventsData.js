
function selectEventsData(events) {
  let filteredEvents = [];
  let flag = true; // Limits API calls for testing
  events.forEach((event) => {
    if (flag) {
      let filteredEvent = filterEvents(event);
      if (filteredEvent !== -1) {
        filteredEvents.push(filteredEvent);
      }
      // flag = false;
    }
  });

  return filteredEvents;

}

/*
takes in an event and filters out information that is not needed
returns:
   name: name,
      dates: dates,
      images: images,
      priceRanges: priceRanges,
      artistsAndYouTube: artistsAndYouTube,
*/
function filterEvents(event) {
  let artistsAndYouTube = [];

  const {
    name,
    dates,
    images,
    priceRanges,
    url,
    _embedded, //don't send this back
  } = event;

  //artist perfoming at this event
  //this is the first item of the array that has
  //all the artists perfoming at this event
  const attractions = _embedded.attractions;

  //extracts artist names and youtube links
  //this does not display artists without youtube links
  if(!Array.isArray(attractions)) return (-1)

  attractions.forEach((artistInfo) => {
    let artistName = artistInfo.name;
    if (artistInfo.externalLinks?.youtube) {
      artistsAndYouTube.push({
        artistName: artistName,
        youtubeChannel: artistInfo.externalLinks?.youtube[0].url,
        youtubeVideos: [],
      });
    }
  });

  //this only returns if these are events with youtube links
  if (artistsAndYouTube.length) {
    return ({
      name: name,
      dates: dates,
      images: images,
      priceRanges: priceRanges,
      url: url,
      artistsAndYouTube: artistsAndYouTube,
    })
  } else {
    return (-1);
  }
}

module.exports = {
  selectEventsData,
}