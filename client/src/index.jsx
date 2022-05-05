import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import VideoPlayer from './components/VideoPlayer.jsx';
import getEvents from '../apiMaster.js';
import EventsList from './components/EventsList.jsx';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
const container = document.getElementById('app');
const root = createRoot(container);

function App() {
  const [currentVideoInfo, setCurrentVideoInfo] = useState({ videoTitle: 'Yellow Claw presents The OG Trap Set Part 1', videoId: '_Aw0aSzJAcg' });
  const [eventsCollection, setEventsCollection] = useState([]);


  function handleCity(e) {
    e.preventDefault();
    console.log('making request');

    getEvents('08401')
      .then(({ data }) => {
        setEventsCollection(data);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <Router>
      <div className="app">
        <div className="main">
        <Navbar/>
          <Routes>
            <Route exact path="/" element={
              <div className="container">
                <section className="body-content-container">
                  <div className="user-city">
                  <form  className="search-form" onSubmit={(e) => { handleCity(e) }}>
                    <label className="text-spacing" htmlFor="city-zip">City/Zip</label>
                    <input className="input-field" type="text" autoComplete="home city" placeholder="city or zip code"/>
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