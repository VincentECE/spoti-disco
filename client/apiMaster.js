import axios from 'axios';

const url = 'http://localhost:1128/';

export function getEvents(zipCode) {
  const data = {
    zipCode: zipCode,
  };

  return axios({
    method: 'post',
    url: url+'events',
    data: data,
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
