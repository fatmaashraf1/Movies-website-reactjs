import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <Link to="/" className="navbar-brand">
        <h3>ShowTime</h3>
      </Link>
      <input type="text" placeholder="Search"></input>
      <ul id="menu">
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
