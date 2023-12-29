import "./SearchResult.scss";

export default function SearchResult(props) {
  console.log(props);
  const spotifyResult = props.spotifyResults;
  const youtubeResult = props.youtubeResults;

  return (
    <div className="search-result">
      <div>
        <h3>노래</h3>
        {spotifyResult &&
          spotifyResult.map((item) => (
            <div className="song" key={item.id}>
              <img src={item.album.images[2].url} alt="" />
              <div className="text">
                <div id="title">{item.name}</div>
                <div id="sub-text">
                  <span>{item.album.artists[0].name}</span>
                  <span> - </span>
                  <span>{item.album.name}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div>
        <h3>동영상</h3>
        {Array.isArray(youtubeResult) &&
          youtubeResult.map((item) => (
            <div className="video" key={item.id.videoId}>
              <img
                src={item.snippet.thumbnails.default.url}
                alt={item.snippet.title}
              />
              <div className="text">
                <div id="title">{item.snippet.title}</div>
                <div id="sub-text">
                  <span>{item.snippet.channelTitle}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <h3>아티스트</h3>
    </div>
  );
}
