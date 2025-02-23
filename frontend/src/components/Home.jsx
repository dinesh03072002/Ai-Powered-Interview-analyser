import React from "react";
import { Link } from "react-router-dom";
import AniText from "./Anitext";

const Home = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "50rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3.75rem",
          color: "#4B5563",
          fontWeight: 600,
        }}
      >
        interview{" "}
        <span
          className="gradient-text"
        >
          analyzer
        </span>
      </h1>
      <p
        style={{
          marginTop: "2.5rem",
          fontSize: "1.125rem",
          color: "#6B7280",
          fontWeight: 600,
        }}
      >
        A quick way to prepare for your next interview in
      </p>
      <h2>
        <AniText />
      </h2>
      <p
        style={{
          marginTop: "5rem",
          marginBottom: "1.25rem",
          color: "#6B7280",
          fontWeight: 500,
          textAlign: "center",
          fontSize: "1.25rem",
          width: "50rem",
        }}
      >
        Get comfortable with common interview questions, build confidence, and
        get feedback in real-time.
      </p>
      <Link
        style={
          {
            /* Add your button styles here */
            background: "linear-gradient(to right, #6366f1, #3b82f6)",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            textDecoration: "none",
          }
        }
        to={"/topics"}
      >
        Start Practicing
      </Link>
    </div>
  );
};

export default Home;
