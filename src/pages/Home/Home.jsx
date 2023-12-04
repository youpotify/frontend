import React from "react";
import "./Home.scss";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Siderbar/Sidebar";
import HashTag from "../../components/Home/Hashtag";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <div className="body">
        <Sidebar />
        <div className="home_contents">
          <HashTag />
          {/* 해시태그에 다양한 종류의 플레이리스트들을 추천하는건? 
          my own ,forgotten ,weather ,mood, vibes,  */}

          <div>***의 다시 듣기</div>

          <div>추천 뮤직 비디오</div>

          <div>추천 플레이리스트</div>

          <div>잊고 있던 좋은 음악</div>

          <div>인기 차트</div>
        </div>
      </div>
    </div>
  );
}
