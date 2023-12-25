import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Callback from "./pages/Callback/Callback";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import SearchResult from "./pages/SearchResult/SearchResult";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
