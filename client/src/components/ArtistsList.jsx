import React from 'react';
import ArtistTile from './ArtistTile.jsx';

const ArtistsList = ({ artists }) => {

  console.log(artists)

  return(
    <div>{
      artists.map((event, index) => {
      return <ArtistTile key={ index } event={event}/>
    })
    }</div>
  )

}

export default ArtistsList;