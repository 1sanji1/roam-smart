import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../css/itinerary.css";

const ItineraryResult = () => {
  const { state } = useLocation();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  if (!state)
    return <p className="itinerary-error">No itinerary data provided.</p>;

  const { place, selectedPlaces = [], budget, days, people } = state;

  useEffect(() => {
    const fetchItinerary = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const payload = {
          mainPlace: place?.name || place,
          selectedPlaces: selectedPlaces.map((p) => p.name || p),
          budget: Number(budget),
          days: Number(days),
          people: Number(people),
        };

        const res = await axios.post(
          "/api/place-search/itinerary/generate",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setItinerary(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to generate itinerary. Try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchItinerary();
  }, [place, selectedPlaces, budget, days, people]);

  const handleSave = async () => {
    setSaveStatus("Saving...");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/place-search/itinerary/save",
        itinerary, // send back the entire response from generate
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSaveStatus("Itinerary saved successfully!");
    } catch (err) {
      console.error(err);
      setSaveStatus("Failed to save itinerary.");
    }
  };

  if (loading)
    return <div className="itinerary-loading">Generating itinerary...</div>;
  if (error) return <div className="itinerary-error">{error}</div>;
  if (!itinerary)
    return <div className="itinerary-error">No itinerary received.</div>;

  const rawText = itinerary.itinerary || itinerary["custom itinerary"] || "";
  let humanReadable = rawText;
  let structured = null;

  const separator = "---JSON---";
  if (rawText.includes(separator)) {
    const [before, after] = rawText.split(separator);
    humanReadable = before.trim();
    try {
      structured = JSON.parse(after.trim());
    } catch (e) {
      console.warn("Failed to parse structured JSON part:", e);
    }
  }

  return (
    <div className="itinerary-result-container">
      <h2>Itinerary</h2>

      <div className="summary">
        <p>
          <strong>Budget:</strong> ₹{budget}
        </p>
        <p>
          <strong>Days:</strong> {days}
        </p>
        <p>
          <strong>People:</strong> {people}
        </p>
        <p>
          <strong>Based on:</strong>{" "}
          {selectedPlaces.length
            ? selectedPlaces.map((p) => p.name).join(", ")
            : place?.name || place}
        </p>
      </div>

      <div className="plan-box">
        {structured ? (
          structured.dayPlans ? (
            structured.dayPlans.map((day, idx) => (
              <div key={idx} className="day-block">
                <div className="day-title">Day {idx + 1}:</div>
                <div className="section">
                  <div className="section-title">Travel:</div> {day.travel}
                </div>
                <div className="section">
                  <div className="section-title">Stay:</div> {day.stay}{" "}
                  {day.stayCost ? `(${day.stayCost})` : ""}
                </div>
                <div className="section">
                  <div className="section-title">Visit:</div>{" "}
                  {day.visits &&
                    day.visits.map((v, vi) => (
                      <div key={vi}>
                        • {v.name} {v.entryFee ? `(Entry: ₹${v.entryFee})` : ""}{" "}
                        — {v.description || ""}
                      </div>
                    ))}
                </div>
                <div className="section">
                  <div className="section-title">Meals:</div>{" "}
                  {day.meals && (
                    <div>
                      Breakfast: {day.meals.breakfast || "-"}, Lunch:{" "}
                      {day.meals.lunch || "-"}, Dinner:{" "}
                      {day.meals.dinner || "-"}
                    </div>
                  )}
                </div>
                {day.tips && (
                  <div className="section">
                    <div className="section-title">Tips:</div> {day.tips}
                  </div>
                )}
              </div>
            ))
          ) : (
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
              {humanReadable}
            </pre>
          )
        ) : (
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
            {humanReadable}
          </pre>
        )}

        {structured && structured.breakdown && (
          <div className="cost-breakdown">
            <div className="section">
              <div className="section-title">Cost Breakdown:</div>
              {structured.breakdown.dailyCosts &&
                structured.breakdown.dailyCosts.map((c, i) => (
                  <div key={i}>
                    Day {i + 1}: ₹{c}
                  </div>
                ))}
            </div>
            {structured.breakdown.totalCost && (
              <div className="total-cost">
                Total Estimated Cost: ₹{structured.breakdown.totalCost}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <button className="primary-btn" onClick={handleSave}>
          Save Itinerary
        </button>
        {saveStatus && <p className="helper-text">{saveStatus}</p>}
      </div>
      <div className="go-back-wrapper">
        <button className="go-back-btn" onClick={() =>window.history.back()}>
        ← Go Back
        </button>
      </div>


    </div>
  );
};

export default ItineraryResult;
