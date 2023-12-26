export default function SearchResult({ props }) {
  const searchResult = props;
  console.log(`searchResult : ${searchResult}`);
  return (
    <div className="search-result">
      <div>
        <h3>노래</h3>
        {searchResult &&
          searchResult.map((item) => (
            <div>
              <img src={item.snippet.thumbnails.default.url} alt="" />
              <div key={item.id}>{item.snippet.title}</div>
            </div>
          ))}
      </div>
      <h3>앨범</h3>
      <h3>아티스트</h3>
    </div>
  );
}
