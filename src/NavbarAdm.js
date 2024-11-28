import React from "react";
import { Link } from "react-router-dom";
import "./NavbarAdm.css";

function NavbarAdm() {
  return (
    <header className="navbarAdm">
      <Link to="/signin" className="navLinkAdm">
        <div className="logoAdm">HARU NOTE</div>
      </Link>

      <nav>
        <ul className="navListAdm">
          <div className="navLineAdm"></div>

          <li className="navLinkWrapperAdm">
            <Link to="/signup" className="navLinkAdm">
              Logout
            </Link>
          </li>
          <li className="navItem2Adm">
            <Link to="/signin" className="navLinkAccount">
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavbarAdm;
