import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import VideoPlayer from './components/VideoPlayer.jsx';
import EventsList from './components/EventsList.jsx';
import FavoriteArtists from './components/FavoriteArtists.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import { getEvents } from '../apiMaster.js';
const container = document.getElementById('app');
const root = createRoot(container);

function App() {
  const [currentVideoInfo, setCurrentVideoInfo] = useState({ videoTitle: 'Yellow Claw presents The OG Trap Set Part 1', videoId: '_Aw0aSzJAcg' });
  const [eventsCollection, setEventsCollection] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  function handleCity(e) {
    e.preventDefault();

    getEvents('08401')
      .then(({ data }) => {
        setEventsCollection(data);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    if (!isLoaded) {
      getEvents('08401')
        .then(({ data }) => {
          setEventsCollection(data);
          // console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
        setIsLoaded(true);
    }

    console.log('RAN')
  })

  return (
    <Router>
      <div className="app">
        <div className="main">
          <Navbar />
          <Routes>
            <Route exact path="/" element={
              <div className="container">
                <section className="body-content-container">
                  <div className="user-city">
                    <form className="search-form" onSubmit={(e) => { handleCity(e) }}>
                      <label className="text-spacing" htmlFor="city-zip">City/Zip</label>
                      <input className="input-field" type="text" autoComplete="home city" placeholder="city or zip code" />
                      <input className="btn-primary" type="submit" />
                    </form>
                  </div>
                  <VideoPlayer currentVideoInfo={currentVideoInfo} />
                </section>
                <section>
                  <div className="events-container">
                    <EventsList eventsCollection={eventsCollection} handleVideoSelect={setCurrentVideoInfo} />
                  </div>
                </section>
              </div>
            } />
            <Route exact path="favoriteArtists" element={
              <FavoriteArtists />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

root.render(<App />);

/*
useState
useEffect


*/