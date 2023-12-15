
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Artist from "./pages/Artist/Artist";
import Album from "./pages/Album/Album";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/artist/:name" element={<Artist />} />
          <Route path="/album/:id" element={<Album/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


