import React, { useState } from "react";
import signup from "./assets/signup.png";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div>
      <main className="main-container">
        <img src={signup} className="signup-img" alt="description" />
        <div className="container">
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          <div className="passwordContainer">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="passwordInput"
            />

            <button
              type="button"
              onClick={handleSignin}
              className="signinButton"
            >
              Sign up
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
