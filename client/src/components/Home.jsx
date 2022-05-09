import React, { Component, useState } from 'react';
import VideoPlayer from './VideoPlayer.jsx';
import EventsList from './EventsList.jsx';
import Select from 'react-select';
import useStore from '../store.js';

const Home = ({ handleCity, currentVideoInfo, eventsCollection }) => {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const customStyles = {
    option: provided => ({
      color: 'black'
    })
  };

  const setCurrentVideoInfo = useStore((state) => state.currentVideoInfo);

  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <div className="container">
      <section className="body-content-container">
        <div className="user-city">
          <form className="search-form">
            <label className="text-spacing" htmlFor="city-zip">City/Zip</label>
            <Select className="input-field" styles={customStyles} value={selectedOption} onChange={(cityId)=>
              {setSelectedOption(cityId);
              handleCity(cityId);
              }} options={options} />
          </form>
        </div>
        <VideoPlayer/>
      </section>
      <section>
        <div className="events-container">
          <EventsList eventsCollection={eventsCollection}/>
        </div>
      </section>
    </div>
  )
}

export default Home;
