import React from "react";
import "./Home.scss";
import HashTag from "../../components/Home/Hashtag";
import MusicVideo from "../../components/Home/recommendations/music-video/MusicVideo";
import TopChart from "../../components/Home/TopChart/TopChart";

export default function Home() {
  return (
    <div className="home">
      <HashTag />
      {/* 해시태그에 다양한 종류의 플레이리스트들을 추천하는건? 
          my own ,forgotten ,weather ,mood, vibes,  */}
      <div className="section">
        <MusicVideo />
      </div>

      <div>추천 플레이리스트</div>

      <div>잊고 있던 좋은 음악</div>


          <TopChart/>


        </div>
      </div>
    </div>
  );
}
