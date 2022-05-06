import React from 'react';
import VideoPlayer from './VideoPlayer.jsx';
import EventsList from './EventsList.jsx';

const Home = ({ handleCity, currentVideoInfo, eventsCollection, setCurrentVideoInfo }) => {

  return (
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
  )
}

export default Home;

