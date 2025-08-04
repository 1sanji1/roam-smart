import React from "react";

const Error = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #007cf0 0%, #00dfd8 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          padding: "40px 60px",
          borderRadius: "20px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          textAlign: "center",
          backdropFilter: "blur(4px)",
        }}
      >
        <h1
          style={{
            fontSize: "5rem",
            margin: 0,
            fontWeight: 700,
            letterSpacing: "2px",
          }}
        >
          404
        </h1>
        <h2 style={{ margin: "10px 0 20px", fontWeight: 400 }}>
          Page Not Found
        </h2>
        <p style={{ marginBottom: "30px", color: "#e0f7fa" }}>
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 32px",
            background: "#fff",
            color: "#007cf0",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          Go Back to Register
        </a>
      </div>
    </div>
  );
};

export default Error;
