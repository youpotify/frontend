import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.scss";
import Weather from "../Weather/Weather";

export default function Header() {
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
      {/* <div className="left-items">
        <img src="menu.png" alt="menu button" id="menu-btn" />
        <img src="youpotify.png" alt="google logo" id="youpotify-btn" />
      </div> */}
      <div>
        <SearchBar />
      </div>
      <div>
        <span onClick={onClcikWeather}>{
          weather ? "날씨" : <Weather/>
        }</span>
        {/* 클릭 시 날씨와 함께 관련 플레이리스트 팝업? */}
        <img src="profile.png" onClick={NavigateToProfile} id="profile-btn" />
      </div>
    </div>
  );
}
