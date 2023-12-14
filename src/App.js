
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signu/Signup";
import Artist from "./pages/Artist/Artist";
import Album from "./pages/Album/Album";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/artist/:name" element={<Artist />} />
          <Route path="/album/:id" element={<Album/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


