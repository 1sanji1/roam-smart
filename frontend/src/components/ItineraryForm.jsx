// src/components/ItineraryForm.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/itinerary.css';

const ItineraryForm = () => {
  const { state } = useLocation();
  const place = state?.place;
  const navigate = useNavigate();
  const selectedPlaces = state?.selectedPlaces || [];

  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [people, setPeople] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!budget || !days || !people) return;

    navigate('/itinerary-result', {
  state: {
    place,
    selectedPlaces,
    budget,
    days,
    people
    }
    });
  };

  return (
    <div className="itinerary-form-container">
  <h2>Generate Itinerary for {(place && place.toUpperCase()) || 'Selected Place'}</h2>
  <div className="subheading">
    {selectedPlaces.length
      ? `Prioritizing: ${selectedPlaces.map((p) => p.name).join(', ')}`
      : 'No specific place selected. We will suggest top attractions.'}
  </div>

  {selectedPlaces.length > 0 && (
    <div className="selected-places" aria-label="Selected places">
      {selectedPlaces.map((p, i) => (
        <div key={i} className="place-chip">
          {p.name}
          <span className="count">{i + 1}</span>
        </div>
      ))}
    </div>
  )}

  <form onSubmit={handleSubmit}>
    <div className="form-grid">
      <div className="field">
        <label htmlFor="budget">Budget (₹)</label>
        <input
          id="budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g., 15000"
          required
        />
        <div className="helper-text">Total budget for the trip</div>
      </div>

      <div className="field">
        <label htmlFor="days">Days</label>
        <input
          id="days"
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="e.g., 3"
          required
        />
        <div className="helper-text">Number of days to plan</div>
      </div>

      <div className="field">
        <label htmlFor="people">No. of People</label>
        <input
          id="people"
          type="number"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          placeholder="e.g., 2"
          required
        />
        <div className="helper-text">Traveling together</div>
      </div>
    </div>

    <div className="button-row">
      <button
        type="submit"
        className="primary-btn"
        disabled={!budget || !days || !people}
      >
        Get Plan
      </button>
    </div>
  </form>
  <div className="tagline">
    Smart, practical, and budget-aware plans made just for you.
  </div>
  <div className="go-back-wrapper">
  <button className="go-back-btn" onClick={() =>window.history.back()}>
    ← Go Back
  </button>
</div>


</div>

  );
};

export default ItineraryForm;
