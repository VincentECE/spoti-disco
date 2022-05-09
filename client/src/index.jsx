import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import create from 'zustand';
import useStore from './store.js';
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

  const currentVideo = useStore(state => state.currentVideoInfo);
  const setVideoInfo = useStore((state) => state.currentVideoInfo);



  function handleCity(e) {

      // console.log('THIS IS e: ', e.value)
    getEvents('08401')
      .then(({ data }) => {
        setEventsCollection(data);
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
  })

  return (
    <Router>
      <div className="app">
        <div className="main">
          <Navbar />
          <Routes>
            <Route exact path="/" element={
              <Home handleCity={handleCity} currentVideoInfo={currentVideoInfo}
              eventsCollection={eventsCollection} setCurrentVideoInfo={setCurrentVideoInfo}/>
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