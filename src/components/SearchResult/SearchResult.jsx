import "./SearchResult.scss";

export default function SearchResult({ props }) {
  const searchResult = props;

  console.log(searchResult);
  return (
    <div className="search-result">
      <div>
        <h3>노래</h3>
        {searchResult &&
          searchResult.map((item) => (
            <div className="song" key={item.id}>
              <img src={item.album.images[2].url} alt="" />
              <div className="text">
                <div id="title">{item.name}</div>
                <div id="sub-text">
                  <span>{item.album.artists[0].name}</span>
                  <span>-</span>
                  <span>{item.album.name}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <h3>앨범</h3>
      <h3>아티스트</h3>
    </div>
  );
}
