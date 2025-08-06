// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import "../css/homepage.css";
import SearchPlaces from "../components/SearchPlaces";

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <main className="home-content" id="home">
        {/* <h2>Welcome to RoamSmart</h2>
        <p className="subtitle">Start exploring or generate your perfect itinerary.</p> */}

        <div className="feature-box" id="search-places">
          {/* <h3>Search Places Around</h3>
          <p>A search bar to fetch weather and nearby attractions...</p> */}
          <SearchPlaces />
        </div>

        <div className="feature-box" id="generate-itinerary">
          <h3>Generate Itinerary</h3>
          <p>
            Input budget, days, and destination to get a detailed travel plan...
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
