import React, { useState, useEffect } from 'react';
import { getFavoriteArtists } from '../../apiMaster.js';
import { v4 as uuidv4 } from 'uuid';
import ArtistTile from './ArtistTile.jsx';
import VideoPlayer from './VideoPlayer.jsx';

function FavoriteArtists() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [artistsAndYouTube, setArtistsAndYouTube] = useState([]);
  const [currentVideoInfo, setCurrentVideoInfo] = useState({ videoTitle: 'Yellow Claw presents The OG Trap Set Part 1', videoId: '_Aw0aSzJAcg' });

  useEffect(() => {
    if (!isLoaded) {
      getFavoriteArtists()
        .then(({ data }) => {
          setArtistsAndYouTube(data);
        })
      setIsLoaded(true);
    }

  })

  return (
    <div className="container">
      <section className="body-content-container">
        <VideoPlayer currentVideoInfo={currentVideoInfo} />
      </section>
      <section>
        <div className="events-container">
          {artistsAndYouTube.map((artist) => {
            return <ArtistTile key={uuidv4()} artist={artist} handleVideoSelect={setCurrentVideoInfo} />
          })}
        </div>
      </section>
    </div>
  )
}

export default FavoriteArtists;
