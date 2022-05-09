import React from 'react';
import ArtistTile from './ArtistTile.jsx';
import { v4 as uuidv4 } from 'uuid';
import useStore from '../store.js';

const EventTile = ({ event, handleVideoSelect }) => {

  const setCurrentVideoInfo = useStore((state) => state.currentVideoInfo);

  const {
    images,
    name,
    dates,
    url,
  } = event;

  const startDate = dates.start.localDate;
  const defaultImage = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

  return (
    <div className="event-tile">
      <img className="event-image" src={images[1].url} width="100" height="56" default-src={defaultImage}/>
      <h2 className="event-name" onClick={()=>{window.open(url, "_blank")}}>{name}</h2>
      <p className="event-date">{`Event Date: ${startDate}`}</p>
      <div className="artists">
        {event.artistsAndYouTube.map((artist) => {
          return <ArtistTile key={uuidv4()} artist={artist}/>
        })}
      </div>
    </div>
  )
}

export default EventTile;