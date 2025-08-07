import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const History = () => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("api/place-search/itinerary/saved", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setItineraries(res.data.data || []);
      } catch (err) {
        console.error("Error fetching itinerary history:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="history-page" style={{ padding: "2rem" }}>
        <h2>Saved Itineraries</h2>
        {itineraries.length === 0 ? (
          <p>No itineraries found.</p>
        ) : (
          <div>
            {itineraries.map((item, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #ccc",
                  margin: "1rem 0",
                  padding: "1rem",
                  borderRadius: "8px",
                }}
              >
                <h3>{item.mainPlace}</h3>
                <p>
                  <strong>Budget:</strong> ₹{item.budget}
                </p>
                <p>
                  <strong>Days:</strong> {item.days}
                </p>
                <p>
                  <strong>Selected Places:</strong>{" "}
                  {item.selectedPlaces?.join(", ")}
                </p>
                <details>
                  <summary style={{ cursor: "pointer", marginTop: "0.5rem" }}>
                    View Full Itinerary
                  </summary>
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      backgroundColor: "#f7f7f7",
                      padding: "1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {item.itinerary}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
