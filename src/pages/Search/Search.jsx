import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import HashTag from "../../components/Home/Hashtag";
import SearchResult from "../../components/SearchResult/SearchResult";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Search.scss";

export default function Search() {
  const [results, setResults] = useState({ spotify: null, youtube: null });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("q");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    console.log("effect 실행");
    async function fetchData() {
      if (!keyword || !accessToken) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/search`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: {
              text: keyword,
            },
          }
        );
        setResults(response.data.searchResult);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    }

    fetchData();
  }, [keyword, accessToken]);

  const { spotify, youtube } = results;

  return (
    <div className="search">
      <Sidebar />
      <div className="body">
        <Header />
        <div className="contents">
          <HashTag />
          {spotify && youtube && (
            <SearchResult spotifyResults={spotify} youtubeResults={youtube} />
          )}
        </div>
      </div>
    </div>
  );
}
