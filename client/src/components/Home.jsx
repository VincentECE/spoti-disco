import React, { Component, useState } from 'react';
import VideoPlayer from './VideoPlayer.jsx';
import EventsList from './EventsList.jsx';
import Select from 'react-select';

const Home = ({ handleCity, currentVideoInfo, eventsCollection, setCurrentVideoInfo }) => {

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

// return (
//   <div className="container">
//     <section className="body-content-container">
//       <div className="user-city">
//         <form className="search-form" onSubmit={(e) => { handleCity(e) }}>
//           <label className="text-spacing" htmlFor="city-zip">City/Zip</label>
//           <input className="input-field" type="text" autoComplete="home city" placeholder="city or zip code" />
//           <input className="btn-primary" type="submit" />
//         </form>
//       </div>
//       <VideoPlayer currentVideoInfo={currentVideoInfo} />
//     </section>
//     <section>
//       <div className="events-container">
//         <EventsList eventsCollection={eventsCollection} handleVideoSelect={setCurrentVideoInfo} />
//       </div>
//     </section>
//   </div>
// )