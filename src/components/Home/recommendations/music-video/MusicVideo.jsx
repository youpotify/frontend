import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MusicVideo.scss";

export default function MusicVideo() {
  const [data, setData] = useState([]);

  const fetchVideos = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=5&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      )
      .then((res) => {
        setData(res.data.items);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="music-video">
      <h2>추천 뮤직비디오</h2>
      <div className="item-list">
        {data.map((e, index) => {
          const src = `https://www.youtube.com/embed/${e.id}`;
          return (
            <div className="item-container" key={index}>
              <iframe
                id="ytplayer"
                type="text/html"
                width="320"
                height="180"
                src={src}
                style={{ border: "none" }}
                allowFullScreen
              ></iframe>
              <div>타이틀</div>
              <div>영상 주인 - 조회 수</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
