import React from 'react';

// @@@@@@@@@@@ Change this to events list

/*
  some events can have performers without youtube links
  future improvements should find video links for artists without
  youtube links too.
*/
const ArtistTile = ({ event }) => {
  // console.log(event);
  const {
    name,
    dates,
    images,
    priceRanges,
    _embedded,
  } = event;

  //artist perfoming at this event
  //this is the first item of the array that has
  //all the artists perfoming at this event
  const attractions = _embedded.attractions;
  let artistsAndYouTube = [];

  //extracts artist names and youtube links
  //this does not display artists without youtube links
  attractions.forEach((artistInfo) => {
    let artistName = artistInfo.name;
    if (artistInfo.externalLinks?.youtube){
      // artistsAndYouTube.push({ [artistName]: artistInfo.externalLinks?.youtube[0].url});
    }
  });

  // console.log(artistsAndYouTube);

  return(
    <div className="">

    </div>
  )
}

export default ArtistTile;