import axios from 'axios';

const url = 'http://localhost:1128/';
// const url = 'http://192.168.86.80:1128/';

export function getEvents(marketId) {
  const data = {
    marketId: marketId,
  };

  return axios({
    method: 'get',
    url: `${url}events?marketId=${marketId}`,
  })
}

export function saveFavoriteArtist(artistInfo) {

  return axios({
    method: 'post',
    url: url+'addArtist',
    data: artistInfo,
  })
}

export function getFavoriteArtists() {

  return axios({
    method: 'get',
    url: url+'getFavoriteArtists',
  })
}
