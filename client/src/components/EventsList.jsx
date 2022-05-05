import React from 'react';
import EventTile from './EventTile.jsx';
import { v4 as uuidv4 } from 'uuid';

const EventsList = ({ eventsCollection, handleVideoSelect }) => {

  console.log(eventsCollection);

  return(
    <div className="events-list">
      {eventsCollection.map((event) => {
        return <EventTile key={uuidv4()} event={event} handleVideoSelect = {handleVideoSelect}/>
      })}
    </div>
  );
}

export default EventsList;