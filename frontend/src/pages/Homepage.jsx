// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import "../css/homepage.css";
import SearchPlaces from "../components/SearchPlaces";

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <main className="home-content">
        <section className="hero-section">
          <h1 className="hero-title">Discover. Plan. Roam Smart.</h1>
          <p className="hero-subtitle">Your smart travel companion for curated adventures.</p>
        </section>

        <section className="search-section">
          <SearchPlaces />
        </section>

        <section className="itinerary-highlight">
          <div className="itinerary-box">
            <h3>Generate Itinerary</h3>
            <p>
              Input destination, budget, days and people – get your personalized plan instantly!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
