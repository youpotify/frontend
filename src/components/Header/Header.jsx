import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import Search from "./Search";

export default function Header() {
  const navigate = useNavigate();

  function NavigateToProfile() {
    navigate("/profile");
  }

  return (
    <div className="header">
      {/* <div className="left-items">
        <img src="menu.png" alt="menu button" id="menu-btn" />
        <img src="youpotify.png" alt="google logo" id="youpotify-btn" />
      </div> */}
      <div>
        <Search />
      </div>
      <div>
        <span>날씨</span>
        {/* 클릭 시 날씨와 함께 관련 플레이리스트 팝업? */}
        <img src="profile.png" onClick={NavigateToProfile} id="profile-btn" />
      </div>
    </div>
  );
}
