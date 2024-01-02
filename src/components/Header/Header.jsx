import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.scss";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  function NavigateToProfile() {
    navigate("/profile");
  }

  return (
    <div className="header">
      <div className="left-content">
        <div className="menu">
          <div
            className="material-symbols-outlined"
            id="menu-button"
            onClick={toggleSidebar}
          >
            menu
          </div>
        </div>
        <div className="youpotify-logo">youpotify</div>
      </div>
      <div className="center-content">
        <SearchBar />
      </div>
      <div className="right-content">
        <div className="weather-button">날씨</div>
        {/* 클릭 시 날씨와 함께 관련 플레이리스트 팝업? */}
        <img
          src="profile.png"
          onClick={NavigateToProfile}
          className="profile-button"
        />
      </div>
    </div>
  );
}
