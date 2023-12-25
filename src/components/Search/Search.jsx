import "./Search.scss";
import React, { useState } from "react";

export default function Search() {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="search">
      <span class="material-symbols-outlined">search</span>
      <span>
        <input
          placeholder="노래, 앨범, 아티스트, 팟캐스트 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </span>
      <span class="material-symbols-outlined">close</span>
    </div>
  );
}
