import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/signin" className="navLink">
        <div className="logo">HARU NOTE</div>
      </Link>

      <nav>
        <ul className="navList">
          <div className="navLine"></div>
          <li className="navItem">
            <Link to="/calendar" className="navLink">
              Calendar
            </Link>
          </li>
          <li className="navItem">
            <Link to="/blog" className="navLink">
              Blog
            </Link>
          </li>
          <li className="navLinkWrapper">
            <Link to="/signup" className="navLink">
              Sign up
            </Link>
          </li>
          <li className="navItem2">
            <Link to="/signin" className="navLinkSignin">
              Sign in
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
