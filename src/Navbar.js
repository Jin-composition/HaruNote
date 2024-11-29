import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("user_id");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/signin");
  };

  const handleNavigation = (path) => {
    if (!user_id) {
      alert("로그인이 필요한 서비스 입니다.");
    } else {
      navigate(path);
    }
  };

  return (
    <header className="navbar">
      <Link to="/signin" className="navLink">
        <div className="logo">HARU NOTE</div>
      </Link>

      <nav>
        <ul className="navList">
          <div className="navLine"></div>
          <li className="navItem">
            <Link
              to="/calendar"
              className="navLink"
              onClick={(event) => {
                event.preventDefault();
                handleNavigation("/calendar");
              }}
            >
              Calendar
            </Link>
          </li>
          <li className="navItem">
            <Link
              to="/blog"
              className="navLink"
              onClick={(event) => {
                event.preventDefault();
                handleNavigation("/blog");
              }}
            >
              Blog
            </Link>
          </li>
          <li className="navLinkWrapper">
            <Link to="/signup" className="navLink">
              Sign up
            </Link>
          </li>
          <li className="navItem2">
            {user_id ? (
              <button
                style={{ cursor: "pointer" }}
                className="navLinkSignin"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to="/signin" className="navLinkSignin">
                Sign in
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
