import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import VideoPlayer from './components/VideoPlayer.jsx';
import getEvents from '../apiMaster.js';
import ArtistsList from './components/ArtistsList.jsx';
const container = document.getElementById('app');
const root = createRoot(container);

function App() {
  const [count, setCount] = useState(0);
  const [artists, setArtists] = useState([]);

  function handleCity(e) {
    e.preventDefault();
    console.log('making request');

    getEvents('08401')
    .then(({ data })=>{
      setArtists(data);
      console.log(data);
    })
    .catch((err)=>{
      console.log(err.message);
    });
  }

  return (
    <div className="main">
      <form onSubmit={(e)=>{handleCity(e)}} className="user-city">
        <label>City/Zip</label>
        <input type="text" />
        <input type="submit" />
      </form>
      <VideoPlayer/>
      {/* <ArtistsList artists={artists}/> */}
    </div>
  );
}

root.render(<App />);

/*
useState
useEffect


*/