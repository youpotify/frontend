import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MusicVideo.scss";

export default function MusicVideo() {
  const [data, setData] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Youtube 공식 API - ID로 video 가져오기
  // const fetchVideos = async () => {
  //   await axios
  //     .get(
  //       `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
  //     )
  //     .then((res) => {
  //       setData(res.data.items);
  //     })
  //     .catch((error) => console.error("Error fetching data: ", error));
  // };

  // rapid API Youtube API - Suggested Videos by relatedToVideoId
  const fetchVideos = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/search",
      params: {
        relatedToVideoId: "86lWRSio7bw",
        part: "id,snippet",
        type: "music",
        maxResults: "50",
      },
      headers: {
        "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_YOUTUBE_API_KEY}`,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : data.length - 1
    );
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="music-video">
      <h2>추천 뮤직비디오</h2>
      <div className="button-group">
        <button onClick={handlePrev} disabled={currentVideoIndex === 0}>
          <div class="material-symbols-outlined">navigate_before</div>
        </button>
        <button onClick={handleNext}>
          <div class="material-symbols-outlined">navigate_next</div>
        </button>
      </div>
      {/* <div className="item-list">
        <div
          className="carousel-container"
          style={{ transform: `translateX(-${currentVideoIndex * 100}%)` }}
        >
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
      </div> */}
    </div>
  );
}
