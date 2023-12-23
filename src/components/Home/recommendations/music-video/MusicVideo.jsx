import "./MusicVideo.scss";

export default function MusicVideo() {
  return (
    <div className="music-video">
      <h2>추천 뮤직비디오</h2>
      <div className="item-list">
        <div className="item-container">
          <iframe
            id="ytplayer"
            type="text/html"
            width="360"
            height="180"
            src="https://www.youtube.com/embed/M7lc1UVf-VE"
            frameborder="0"
            allowfullscreen="allowfullscreen"
          ></iframe>
          <div id="video-title">타이틀</div>
          <div id="video-owner">채널주인 - 조회수</div>
        </div>
        <div className="item-container">
          <iframe
            id="ytplayer"
            type="text/html"
            width="360"
            height="180"
            src="https://www.youtube.com/embed/M7lc1UVf-VE"
            frameborder="0"
            allowfullscreen="allowfullscreen"
          ></iframe>
          <div id="video-title">타이틀</div>
          <div id="video-owner">채널주인 - 조회수</div>
        </div>
        <div className="item-container">
          <iframe
            id="ytplayer"
            type="text/html"
            width="360"
            height="180"
            src="https://www.youtube.com/embed/M7lc1UVf-VE"
            frameborder="0"
            allowfullscreen="allowfullscreen"
          ></iframe>
          <div id="video-title">타이틀</div>
          <div id="video-owner">채널주인 - 조회수</div>
        </div>
      </div>
    </div>
  );
}
