import React from 'react';
import EventTile from './EventTile.jsx';
import { v4 as uuidv4 } from 'uuid';

const EventsList = ({ eventsCollection }) => {

  if(Array.isArray(eventsCollection)) {

    return(
      <div className="events-list">
        {eventsCollection.map((event) => {
          return <EventTile key={uuidv4()} event={event}/>
        })}
      </div>
    );
  } else {
    return(
      <div className="events-list">
      <h1> No events found. Please try another city </h1>
    </div>
    )
  }

}

export default EventsList;