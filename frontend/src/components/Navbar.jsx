// src/components/Navbar.jsx
import React from "react";
import logo from "../images/RoamSmart Logo.png";
import "../css/navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="RoamSmart Logo" className="nav-logo" />
        <span className="brand-name">RoamSmart</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        {/* <li>
          <a href="#search-places">Explore</a>
        </li> */}
        <li>
          <Link to="/history">Itinerary History</Link>
        </li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
