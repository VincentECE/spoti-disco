import React from 'react';
import VideosList from './VideosList.jsx';
import { v4 as uuidv4 } from 'uuid';
import { saveFavoriteArtist } from '../../apiMaster.js';

const ArtistTile = ({ artist, handleVideoSelect }) => {
  const {
    artistName,
    youtubeVideos,
    youtubeChannel,
  } = artist;
  return (
    <div className="tile-container tile-container-spacing">
      <div className="tile-header-container">
      <label className="artist-name" onClick={() => { window.open(youtubeChannel, "_blank") }}>{artistName}</label>
      <button onClick={()=>{saveFavoriteArtist(artist)}}className="btn-primary" type="button" autoFocus>Favorite</button>
      </div>
      <div className="tile-body-container">
        <ul className="videos-list">
          {youtubeVideos.map(({ videoTitle, videoId }) => {
            return (
              <li key={uuidv4()} onClick={() => { handleVideoSelect({ videoTitle, videoId }) }} className="video-title">
                {videoTitle}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ArtistTile;