import "./Search.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const Navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  return (
    <div className="search">
      <span class="material-symbols-outlined" id="search-btn">
        search
      </span>
      <form onSubmit={() => Navigate("/search")}>
        <input
          placeholder="노래, 앨범, 아티스트, 팟캐스트 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {keyword && (
        <span
          class="material-symbols-outlined"
          id="delete-btn"
          onClick={() => setKeyword("")}
        >
          close
        </span>
      )}
    </div>
  );
}
