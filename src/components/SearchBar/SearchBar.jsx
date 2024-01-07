import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.scss";

export default function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState("");

  function SearchKeyword() {
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  }

  return (
    <div className="search-bar">
      <div className="search-icon-box">
        <div class="material-symbols-outlined" id="search-icon">
          search
        </div>
      </div>

      <input
        placeholder="노래, 앨범, 아티스트, 팟캐스트 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (keyword === "");
            else SearchKeyword();
          }
        }}
        id="search-input"
      />

      {keyword && (
        <span
          class="material-symbols-outlined"
          id="delete-button"
          onClick={() => setKeyword("")}
        >
          close
        </span>
      )}
    </div>
  );
}
