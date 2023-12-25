import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./SearchResult.scss";

export default function SearchResult() {
  const [searchResult, setSearchResult] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const youtube_api_url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${keyword}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
        console.log(youtube_api_url);
        const res = await axios.get(youtube_api_url);
        setSearchResult(res.data);
      } catch (error) {
        console.error("YouTube API error: ", error);
      }
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  return (
    <div>
      <div>SearchResult</div>
    </div>
  );
}
