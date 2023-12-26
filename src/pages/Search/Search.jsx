import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import HashTag from "../../components/Home/Hashtag";
import SearchResult from "../../components/SearchResult/SearchResult";
import Sidebar from "../../components/Siderbar/Sidebar";
import "./Search.scss";

export default function Search() {
  const [searchResult, setSearchResult] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const youtube_api_url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${keyword}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
        // console.log(youtube_api_url);
        // const res = await axios.get(youtube_api_url);
        // setSearchResult(res.data);

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

        try {
          const response = await axios.request(options);
          console.log(response.data.items);
          setSearchResult(response.data.items);
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error("YouTube API error: ", error);
      }

      const spotifyToken = localStorage.getItem("accessToken");

      async function searchSpotify(query, type) {
        try {
          const response = await axios.get(
            "https://api.spotify.com/v1/search",
            {
              headers: {
                Authorization: `Bearer ${spotifyToken}`,
              },
              params: {
                q: query,
                type: type,
              },
            }
          );

          // 검색 결과 출력
          console.log(response.data);
        } catch (error) {
          console.error("Spotify Search API 요청 에러:", error);
        }
      }

      searchSpotify("track:감사 artist:Kim Dong Ryul", "track");
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  return (
    <div className="search">
      <Sidebar />
      <div className="body">
        <Header />
        <div className="contents">
          <HashTag />
          {/* 해시태그에 다양한 종류의 플레이리스트들을 추천하는건? 
          my own ,forgotten ,weather ,mood, vibes,  */}
          <SearchResult props={searchResult} />
        </div>
      </div>
    </div>
  );
}
