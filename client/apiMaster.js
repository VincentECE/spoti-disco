import axios from 'axios';

const url = 'http://localhost:1128/';

function getEvents(zipCode) {
  const data = {
    zipCode: zipCode,
  };

  return axios({
    method: 'post',
    url: url+'events',
    data: data,
  })
}

function saveFavoriteArtist(artistInfo) {

  return axios({
    method: 'post',
    url: url+'addArtist',
    data: artistInfo,
  })
}

export default getEvents;
