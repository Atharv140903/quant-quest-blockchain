import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>My Quiz App</h1>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/learn" style={styles.link}>
            Learn
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/create" style={styles.link}>
            Create
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  title: {
    margin: 0,
    fontSize: "24px",
  },
  navLinks: {
    display: "flex",
    justifyContent: "flex-start",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginRight: "40px", // Add some spacing between the items
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default Navbar;
