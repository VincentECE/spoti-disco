import React from 'react';
import EventTile from './EventTile.jsx';
import { v4 as uuidv4 } from 'uuid';

const EventsList = ({ eventsCollection }) => {

  return(
    <div className="events-list">
      {eventsCollection.map((event) => {
        return <EventTile key={uuidv4()} event={event}/>
      })}
    </div>
  );
}

export default EventsList;