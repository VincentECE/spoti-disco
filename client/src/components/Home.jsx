import React from 'react';

const Home = () => {

  return (
  <form onSubmit={(e) => { handleCity(e) }} className="user-city">
    <label>City/Zip</label>
    <input type="text" autoComplete="home city" />
    <input type="submit" />
  </form>
      <VideoPlayer currentVideoInfo={currentVideoInfo} />
  <div className="events-container">
    <EventsList eventsCollection={eventsCollection} handleVideoSelect={setCurrentVideoInfo} />
  </div>
  )
}

export default Home;