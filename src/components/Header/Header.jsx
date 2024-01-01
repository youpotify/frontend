import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.scss";

export default function Header() {
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
            id="menu-btn"
            onClick={() => setIsMenuClicked(true)}
          >
            menu
          </div>
        </div>
        <div className="youpotify-logo">spotify</div>
      </div>
      <div className="center-content">
        <SearchBar />
      </div>
      <div>
        <span>날씨</span>
        {/* 클릭 시 날씨와 함께 관련 플레이리스트 팝업? */}
        <img src="profile.png" onClick={NavigateToProfile} id="profile-btn" />
      </div>
    </div>
  );
}
