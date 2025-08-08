// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "./App.css"; // global styles
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";
import ItineraryForm from "./components/ItineraryForm";
import ItineraryResult from "./components/ItineraryResult";
import Error from "./pages/Error";
import History from "./components/History";
import AdminDashboard from "./pages/AdminDashboard"; // create this page

// Helper: verify token and role
const getDecodedToken = () => {
  const rawToken = localStorage.getItem("token");
  if (!rawToken || rawToken === "undefined" || rawToken === "null") return null;
  try {
    return jwtDecode(rawToken);
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
};

// Private route for logged-in users
const PrivateRoute = ({ children }) => {
  const decoded = getDecodedToken();
  if (!decoded) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Please log in to continue." }}
      />
    );
  }
  return children;
};

// Private route for admins only
const AdminPrivateRoute = ({ children }) => {
  const decoded = getDecodedToken();
  if (!decoded || decoded.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/register" element={<Register />} />

        {/* User routes */}
        <Route
          path="/homepage"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/generate-itinerary"
          element={
            <PrivateRoute>
              <ItineraryForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/itinerary-result"
          element={
            <PrivateRoute>
              <ItineraryResult />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
