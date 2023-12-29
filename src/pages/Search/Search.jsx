import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import HashTag from "../../components/Home/Hashtag";
import SearchResult from "../../components/SearchResult/SearchResult";
import Sidebar from "../../components/Siderbar/Sidebar";
import "./Search.scss";

export default function Search() {
  const [results, setResults] = useState({ spotify: null, youtube: null });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("q");

  useEffect(() => {
    async function fetchData() {
      if (!keyword) return;

      try {
        // YouTube API call
        const options = {
          method: "GET",
          url: "https://youtube-v31.p.rapidapi.com/search",
          params: {
            q: keyword,
            part: "snippet,id",
            regionCode: "KR",
            maxResults: "3",
            order: "date",
          },
          headers: {
            "X-RapidAPI-Key":
              "2bee14e051mshbd976b2ec07a273p1c69d0jsna02a62834802",
            "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
          },
        };

        const youtubeResponse = await axios.request(options);
        setResults({ youtube: youtubeResponse.data.items });

        // Spotify API call
        const spotifyToken = localStorage.getItem("accessToken");
        const spotifyResponse = await axios.get(
          "https://api.spotify.com/v1/search",
          {
            headers: { Authorization: `Bearer ${spotifyToken}` },
            params: { q: `artist:${keyword}`, type: "artist" },
          }
        );

        // extract the Spotify artist ID and then make another call for top tracks
        const artistId = spotifyResponse.data.artists.items[0].id;
        const topTracksResponse = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`,
          {
            headers: { Authorization: `Bearer ${spotifyToken}` },
          }
        );

        // Batch state update
        setResults({
          spotify: topTracksResponse.data.tracks,
          youtube: youtubeResponse.data.items,
        });
      } catch (error) {
        console.error("API error: ", error);
      }
    }

    fetchData();
  }, [keyword]);
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
