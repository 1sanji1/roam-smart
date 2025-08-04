// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css"; // global styles
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";
import ItineraryForm from "./components/ItineraryForm";
import ItineraryResult from "./components/ItineraryResult";
import Error from "./pages/Error";

function App() {
  const rawToken = localStorage.getItem("token");
  const token =
    rawToken && rawToken !== "undefined" && rawToken !== "null"
      ? rawToken
      : null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/homepage"
          element={
            token ? (
              <HomePage />
            ) : (
              <Navigate
                to="/login"
                replace
                state={{ message: "Please log in to access the homepage." }}
              />
            )
          }
        />
        <Route
          path="/generate-itinerary"
          element={
            token ? (
              <ItineraryForm />
            ) : (
              <Navigate
                to="/login"
                replace
                state={{
                  message: "You need to be logged in to generate an itinerary.",
                }}
              />
            )
          }
        />
        <Route
          path="/itinerary-result"
          element={
            token ? (
              <ItineraryResult />
            ) : (
              <Navigate
                to="/login"
                replace
                state={{ message: "Login required to view itinerary results." }}
              />
            )
          }
        />
        <Route path="*" element={<Error></Error>}></Route>;
      </Routes>
    </Router>
  );
}

export default App;
