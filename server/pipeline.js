
const {
  getChannelId,
  getPlaylist,
  getPlaylistVideos,
} = require('./youtubeApi');

function makeEventsArray(events) {

  let filteredEvents = [];
  let flag = true; // DELETE THIS AFTER TESTING

  events.forEach((event) => {
    if (flag) {
      let filteredEvent = addArtistsList(event);
      if (filteredEvent !== -1) {
        filteredEvents.push(filteredEvent);
      }
      flag = false;
    }
  });

  filteredEvents.forEach((event) => {
    addYoutubeVideos(event.artistsAndYouTube);
    // console.log(JSON.stringify(event.artistsAndYouTube))
  });

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
function addArtistsList(event) {
  let artistsAndYouTube = [];

  // console.log(JSON.stringify(event, null, 2))

  const {
    name,
    dates,
    images,
    priceRanges,
    _embedded, //don't send this back
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
      artistsAndYouTube: artistsAndYouTube,
    })
  } else {
    return (-1);
  }
}

//adds youtube videos to the artistsArray by reference
function addYoutubeVideos(artistsArray) {

  let flag = true; // DELETE THIS. It's testing so one loop would run

  artistsArray.forEach(async (artistInfo) => {

    if (flag) {
      const { youtubeChannel } = artistInfo;

      //will assign videos to this
      // artistInfo.youtubeVideos = ['poop'];

      if (youtubeChannel.includes('https://www.youtube.com/user')) {
        const username = youtubeChannel.substring(29);

        try {
          let { data: channel } = await getChannelId(username);
          let { data: playlist } = await getPlaylist(channel.items[0].id);
          let {data: videos } = await getPlaylistVideos(playlist.items[0].id);
          console.log(videos);
        }
        catch(err) {
          console.log('something went wrong working with youtubeAPI', err.message);
        }

      } else {
        const channelId = youtubeChannel.substring(32);
        getPlaylist(channelId)
      }
      flag = false;
    }

  })

}

module.exports = {
  makeEventsArray
}