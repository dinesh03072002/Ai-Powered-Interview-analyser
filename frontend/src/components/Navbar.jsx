import React from "react";

const Navbar = () => {
  return (
    <div
      style={{
        width: "100%",
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        gap: "0.75rem",
        fontWeight: 600,
        color: "#6B7280",
        height: "5rem",
        borderBottomWidth: "2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "white",
        zIndex: 50,
      }}
    >
      interview <span className="gradient-text"> analyzer</span>
    </div>
  );
};

export default Navbar;
