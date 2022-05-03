const axios = require('axios');
const { YOUTUBE_KEY } = require('../config');
const youtubeUrl = 'https://youtube.googleapis.com/youtube/v3/';

//channelsList
//input: userName
//output: channelId
const getChannelId = function (userName) {
  const route = 'channels?';
  const query = `part=id&forUsername=${userName}&`;

  return axios({
    method: 'get',
    url: ''.concat(youtubeUrl, route, query, YOUTUBE_KEY),
    responseType: 'JSON',
  })
}

//playlists
//input: channelId
//output: playlistId (the first one that was found)
const getPlaylist = function (channelId) {
  const route = 'playlists?';
  const query = `part=contentDetails&channelId=${channelId}&maxResults=1&`;

  return axios({
    method: 'get',
    url: ''.concat(youtubeUrl, route, query, YOUTUBE_KEY),
    responseType: 'JSON',
  })
}

//playlistItems
//input: playlistId
//output: videosObj
const getPlaylistVideos = function (playlistId) {
  const route = 'playlistItems?';
  const query = `part=snippet&maxResults=5&playlistId=${playlistId}&`;

  return axios({
    method: 'get',
    url: ''.concat(youtubeUrl, route, query, YOUTUBE_KEY),
    responseType: 'JSON',
  })
}

module.exports = {
  getChannelId,
  getPlaylist,
  getPlaylistVideos,
}