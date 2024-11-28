import React from "react";
import { Link } from "react-router-dom";
import "./NavbarAdm.css";

function NavbarAdm() {
  return (
    <header className="navbar">
      <Link to="/signin" className="navLink">
        <div className="logo">HARU NOTE</div>
      </Link>

      <nav>
        <ul className="navList">
          <div className="navLine"></div>

          <li className="navLinkWrapper">
            <Link to="/signup" className="navLink">
              Logout
            </Link>
          </li>
          <li className="navItem2">
            <Link to="/signin" className="navLinkSignin">
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavbarAdm;
