import React from "react";
import "./Sidebar.scss";

export default function Sidebar({ isOpen }) {
  return isOpen ? (
    <div>
      <div className="sidebar-open">
        <div className="route-list">
          <div className="menu-list-box-open">
            <div className="menu-item-open">
              <span className="material-symbols-outlined">home</span>
              <span id="menu-item-text-open">홈</span>
            </div>
            <div className="menu-item-open">
              <span className="material-symbols-outlined">library_music</span>
              <span id="menu-item-text-open">보관함</span>
            </div>
            <div className="menu-item-open">
              <span className="material-symbols-outlined">recommend</span>
              <span id="menu-item-text-open">추천곡</span>
            </div>
          </div>

          <hr className="divider" />
          <div className="playlist-box">
            <div className="add-playlist">
              <div>+ 새 재생목록</div>
            </div>
            <div className="playlist">
              <div className="menu-item-open">좋아요 표시한 음악</div>
              <div className="menu-item-open">재생목록1</div>
              <div className="menu-item-open">재생목록2</div>
              <div className="menu-item-open">재생목록3</div>
              <div className="menu-item-open">재생목록4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="sidebar">
      <div className="menu-list-box">
        <div className="menu-item">
          <div className="material-symbols-outlined">home</div>
          <div className="menu-item-text">홈</div>
        </div>
        <div className="menu-item">
          <div className="material-symbols-outlined">library_music</div>
          <div className="menu-item-text">보관함</div>
        </div>
        <div className="menu-item">
          <div className="material-symbols-outlined">recommend</div>
          <div className="menu-item-text">추천곡</div>
        </div>
      </div>
    </div>
  );
}
