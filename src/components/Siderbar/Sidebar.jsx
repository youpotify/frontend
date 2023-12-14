import React, { useState } from "react";
import "./Sidebar.scss";

export default function Sidebar() {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  return isMenuClicked ? (
    <div>
      <div className="sidebar-clicked">
        <div className="route-list">
          <div>홈</div>
          <div>보관함</div>
          <div>추천곡</div>
        </div>
        <div className="playlist">
          <div>새 재생목록</div>
          <div>플레이 리스트 map 표현</div>
          {/* drawer로 표현 */}
        </div>
      </div>
    </div>
  ) : (
    <div className="sidebar">
      <div>홈</div>
      <div>보관함</div>
      <div>추천곡</div>
    </div>
  );
}
