import React, { useState } from "react";
import "./Sidebar.scss";

export default function Sidebar() {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  return isMenuClicked ? (
    <div>
      <div className="sidebar-clicked">
        <div className="route-list">
          <div
            class="material-symbols-outlined"
            id="menu"
            onClick={() => setIsMenuClicked(false)}
          >
            menu
          </div>
          <div>홈</div>
          <div>보관함</div>
          <div>추천곡</div>
          <div>+ 새 재생목록</div>
          <div>좋아요 표시한 음악</div>
          <div>
            <div>재생목록1</div>
            <div>재생목록2</div>
            <div>재생목록3</div>
            <div>재생목록4</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="sidebar">
      <div
        class="material-symbols-outlined"
        id="menu"
        onClick={() => setIsMenuClicked(true)}
      >
        menu
      </div>
      <div class="material-symbols-outlined">home</div>
      <div class="material-symbols-outlined">library_music</div>
      <div class="material-symbols-outlined">recommend</div>
    </div>
  );
}
