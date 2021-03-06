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
  const [eventsCollection, setEventsCollection] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentVideoInfo = useStore(state => state.currentVideoInfo);
  const setCurrentVideoInfo = useStore((state) => state.currentVideoInfo);


  function handleCity(marketId) {
    getEvents(marketId)
      .then(({ data }) => {
        console.log('DATA', data);
        setEventsCollection(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    if (!isLoaded) {
      getEvents(40)
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
              <Home handleCity={handleCity}
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
