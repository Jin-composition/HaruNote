import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Calendar from "./Calendar";
import Diary from "./Diary";
import Blog from "./Blog";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/diary/:date" element={<Diary />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
