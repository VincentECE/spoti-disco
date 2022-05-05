import React from 'react';
import ArtistTile from './ArtistTile.jsx';
import { v4 as uuidv4 } from 'uuid';

const EventTile = ({ event, handleVideoSelect }) => {
  console.log(event)

  const {
    images,
    name,
    dates,
    url,
  } = event;

  const startDate = dates.start.localDate;

  return (
    <div className="event-tile">
      <img className="event-image" src={images[1].url} width="100" height="56" />
      <h2 className="event-name" onClick={()=>{window.open(url, "_blank")}}>{name}</h2>
      <p className="event-date">{`Event Date: ${startDate}`}</p>
      <div className="artists">
        {event.artistsAndYouTube.map((artist) => {
          return <ArtistTile key={uuidv4()} artist={artist} handleVideoSelect={handleVideoSelect}/>
        })}
      </div>
    </div>
  )
}

export default EventTile;