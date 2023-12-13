import React, { useState } from "react";
import "./Sidebar.scss";

export default function Sidebar() {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  return isMenuClicked ? (
    <div>
      <div className="sidebar-clicked">
        <div className="route-list">
          <div>
            <span
              className="material-symbols-outlined"
              id="menu-toggle"
              onClick={() => setIsMenuClicked(false)}
            >
              menu
            </span>
            <span>
              <img src="youpotify.png" alt="google logo" id="youpotify-btn" />
            </span>
          </div>
          <div className="menu-list-clicked">
            <span className="material-symbols-outlined">home</span>
            <span id="menu-item-text">홈</span>
          </div>
          <div className="menu-list-clicked">
            <span className="material-symbols-outlined">library_music</span>
            <span id="menu-item-text">보관함</span>
          </div>
          <div className="menu-list-clicked">
            <span className="material-symbols-outlined">recommend</span>
            <span id="menu-item-text">추천곡</span>
          </div>
          <hr />
          <div className="add-playlist" id="menu-item">
            + 새 재생목록
          </div>
          <div className="playlist">
            <div id="menu-item">좋아요 표시한 음악</div>
            <div id="menu-item">재생목록1</div>
            <div id="menu-item">재생목록2</div>
            <div id="menu-item">재생목록3</div>
            <div id="menu-item">재생목록4</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="sidebar">
      <div>
        <span
          className="material-symbols-outlined"
          id="menu-toggle"
          onClick={() => setIsMenuClicked(true)}
        >
          menu
        </span>
        <span>
          <img src="youpotify.png" alt="google logo" id="youpotify-btn" />
        </span>
      </div>
      <div className="menu-list">
        <div className="material-symbols-outlined">home</div>
        <div id="menu-item-text">홈</div>
      </div>
      <div className="menu-list">
        <div className="material-symbols-outlined">library_music</div>
        <div id="menu-item-text">보관함</div>
      </div>
      <div className="menu-list">
        <div className="material-symbols-outlined">recommend</div>
        <div id="menu-item-text">추천곡</div>
      </div>
    </div>
  );
}
