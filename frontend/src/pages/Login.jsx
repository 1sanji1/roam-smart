import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/login.css";
import logo from "../images/RoamSmart Logo.png";

const Login = () => {
  const location = useLocation();
  const incomingMessage = location.state?.message || "";
  const [alertMessage, setAlertMessage] = useState(incomingMessage);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (incomingMessage) {
      setAlertMessage(incomingMessage);
      const timeout = setTimeout(() => setAlertMessage(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [incomingMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.name || email);
      setMessage("Login successful!");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/homepage");
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="login-layout animate">
        <div className="login-left">
          <div className="form-wrapper">
            {alertMessage && <div className="alert">{alertMessage}</div>}
            <h2>Welcome Back</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
            {message && (
              <p className={`msg ${message.includes("successful") ? "success" : "error"}`}>
                {message}
              </p>
            )}
            <p className="reg-redirect">
              Don’t have an account? <a href="/">Register</a>
            </p>
          </div>
        </div>

        <div className="login-right">
          <div className="branding">
            <img src={logo} alt="RoamSmart Logo" height={180} width={180} style={{ borderRadius: "50%" }} />
            <h1>RoamSmart</h1>
            <p className="tagline">
              Explore smarter. Plan better.
              <br />
              Your intelligent travel partner.
            </p>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast-success">🎉 Login successful! Redirecting...</div>
      )}
    </div>
  );
};

export default Login;
