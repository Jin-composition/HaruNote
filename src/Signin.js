import React, { useState } from "react";
import title from "./assets/title.png";
import "./Signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div>
      <main className="signin-main">
        <img src={title} className="signin-title" alt="description" />
        <div className="signin-container">
          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signin-input"
          />

          <div className="password-container">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />

            <button
              type="button"
              onClick={handleSignin}
              className="signin-button"
            >
              Sign in
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signin;
