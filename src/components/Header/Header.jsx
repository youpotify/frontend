import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.scss";
import Weather from "../Weather/Weather";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  function NavigateToProfile() {
    navigate("/profile");
  }

  //날씨 상태관리
  const [weather, setWeather] = useState(false);

  const onClcikWeather = () => {
    setWeather(!weather);
  };

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
      <div>
        <span onClick={onClcikWeather}>{
          weather ? "날씨" : <Weather/>
        }</span>
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
