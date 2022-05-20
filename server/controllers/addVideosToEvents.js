const { getChannelId, getPlaylist, getPlaylistVideos } = require("../models");

function addVideosToEvents(filteredEvents, resolve) {
  let promiseObject = [];
  for (let i = 0; i < filteredEvents.length; i++) {
    let reducedVideosObj = addVideosToEvent(
      filteredEvents[i].artistsAndYouTube
    );
    filteredEvents[i].artistsAndYouTube.youtubeVideos = reducedVideosObj;
    promiseObject = promiseObject.concat(reducedVideosObj);
  }

  Promise.all(promiseObject).then((data) => {
    resolve(filteredEvents);
  })
  .catch(()=>{
    resolve('No events found!');
  })
}

function addVideosToEvent(artistsArray) {
  return artistsArray.map(async (artistInfo) => {
    const { youtubeChannel } = artistInfo;

    if (youtubeChannel.includes("https://www.youtube.com/user")) {
      const username = youtubeChannel.substring(29);
      try {
        let { data: channel } = await getChannelId(username);
        let { data: playlist } = await getPlaylist(channel.items[0]?.id);
        let { data: videosObj } = await getPlaylistVideos(
          playlist.items[0]?.id
        );
        let reducedVideosObj = reduceVideoObj(videosObj);
        return Object.assign(artistInfo, { youtubeVideos: reducedVideosObj });
      } catch (err) {
        console.log(
          "something went wrong working with youtubeAPI",
          err.message
        );
      }
    } else {
      const channelId = youtubeChannel.substring(32);
      let { data: playlist } = await getPlaylist(channelId);
      let { data: videosObj } = await getPlaylistVideos(playlist.items[0]?.id);
      let reducedVideosObj = reduceVideoObj(videosObj);
      return Object.assign(artistInfo, { youtubeVideos: reducedVideosObj });
    }
  });
}

//input: large videosObj
//output: reducedVideosObj with title and videoId
function reduceVideoObj(videosObj) {
  let reducedVideosObj = [];
  // console.log('videosObj', videosObj)
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
  addVideosToEvents,
};
