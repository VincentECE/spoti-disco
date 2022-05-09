import React, { Component, useState } from "react";
import VideoPlayer from "./VideoPlayer.jsx";
import EventsList from "./EventsList.jsx";
import { Select } from "@mantine/core";
import markets from "../data.js";

const Home = ({ handleCity, eventsCollection }) => {

  return (
    <div className="container">
      <section className="body-content-container">
        <div className="user-city">
          <form className="search-form">
            <label className="text-spacing" htmlFor="city-zip">
              City
            </label>
            <Select
              className="input-field"
              onChange={(value) => {
                handleCity(value);
              }}
              placeholder="Select City"
              searchable
              nothingFound="No options"
              maxDropdownHeight={110}
              data={markets}
            />
          </form>
        </div>
        <VideoPlayer />
      </section>
      <section>
        <div className="events-container">
          <EventsList eventsCollection={eventsCollection} />
        </div>
      </section>
    </div>
  );
};

export default Home;

