
const {
  getChannelId,
  getPlaylist,
  getPlaylistVideos,
} = require('./youtubeApi');

function makeEventsArray(events, res) {

  let filteredEvents = [];
  let flag = true; // Limits API calls for testing

  events.forEach((event) => {
    if (flag) {
      let filteredEvent = filterEvents(event);
      if (filteredEvent !== -1) {
        filteredEvents.push(filteredEvent);
      }
      flag = false;
    }
  });

  let promiseObject = [];

  for(let i = 0; i < filteredEvents.length; i++) {
    // console.log(filteredEvents);
    let reducedVideosObj = addYoutubeVideos(filteredEvents[i].artistsAndYouTube);
    filteredEvents[i].artistsAndYouTube.youtubeVideos = reducedVideosObj;
    promiseObject = promiseObject.concat(reducedVideosObj);
  }

  Promise.all(promiseObject)
  .then(()=>{
    // console.log(JSON.stringify(filteredEvents, null, 2))
    res.send(filteredEvents);
  })

  // console.log(filteredEvents.map(async (event) => {
  //   return await addYoutubeVideos(event.artistsAndYouTube);
  //  }));
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

  // console.log(JSON.stringify(event, null, 2))

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

//adds youtube videos to the artistsArray by reference
function addYoutubeVideos(artistsArray) {

  return artistsArray.map(async (artistInfo) => {
      const { youtubeChannel } = artistInfo;

      if (youtubeChannel.includes('https://www.youtube.com/user')) {
        const username = youtubeChannel.substring(29);
        try {
          let { data: channel } = await getChannelId(username);
          let { data: playlist } = await getPlaylist(channel.items[0].id);
          let {data: videosObj } = await getPlaylistVideos(playlist.items[0].id);
          let reducedVideosObj = reduceVideoObj(videosObj);
         return Object.assign(artistInfo, { youtubeVideos: reducedVideosObj })
        } catch(err) {
          console.log('something went wrong working with youtubeAPI', err.message);
        }

      } else {
        const channelId = youtubeChannel.substring(32);
          let { data: playlist } = await getPlaylist(channelId);
          let {data: videosObj } = await getPlaylistVideos(playlist.items[0].id);
          let reducedVideosObj = reduceVideoObj(videosObj);
          return Object.assign(artistInfo, { youtubeVideos: reducedVideosObj })
      }
  });

}

//input: large videosObj
//output: reducedVideosObj with title and videoId
function reduceVideoObj(videosObj) {
  let reducedVideosObj = [];

  videosObj.items.forEach((videos) => {
    const videoTitle = videos.snippet.title;
    const videoId = videos.snippet.resourceId.videoId;

    reducedVideosObj.push({
      videoTitle: videoTitle,
      videoId: videoId,
    });
  });
  return reducedVideosObj;
}

module.exports = {
  makeEventsArray
}