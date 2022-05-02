
function makeEventsArray(events) {

  // console.log(events);
  events.map((event) => {
    // console.log(event);
    addArtistsList(event);
  })
}

//takes in an event and returns the artists names
//who are playing at the event
// [{artistName : youTube handles}]
//this should probably also use the youtubeAPI
//to get video links
function addArtistsList(event) {
  let artistsAndYouTube = [];

  // console.log(JSON.stringify(event, null, 2))

  const {
    name,
    dates,
    images,
    priceRanges,
    _embedded,
  } = event;

  //artist perfoming at this event
  //this is the first item of the array that has
  //all the artists perfoming at this event
  const attractions = _embedded.attractions;

  //extracts artist names and youtube links
  //this does not display artists without youtube links

  attractions.forEach((artistInfo) => {
    let artistName = artistInfo.name;
    if (artistInfo.externalLinks?.youtube) {
      artistsAndYouTube.push({
        [artistName]: artistInfo.externalLinks?.youtube[0].url,
        youtubeVideos: [],
      });
    }
  });

  console.log('LOOK HEREEE', artistsAndYouTube)
}

module.exports = {
  makeEventsArray
}