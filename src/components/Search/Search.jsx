import axios from "axios";
import "./Search.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState("");

  function SearchKeyword(e) {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  }

  return (
    <div className="search">
      <span class="material-symbols-outlined" id="search-btn">
        search
      </span>
      <form onSubmit={(e) => SearchKeyword(e)}>
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
