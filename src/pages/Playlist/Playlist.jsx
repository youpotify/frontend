import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Playlist.scss';
import NewPlaylist from '../../components/Playlist/Popup';
import { Link } from 'react-router-dom';

function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/playlist/playlists');
        setPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddPlaylist = (newPlaylist) => {
    setPlaylists([...playlists, newPlaylist]);
  };

  return (
    <div className="playlist-page">
      <h1>User님의 플레이리스트</h1>

      <div className="playlist-actions">
        <button className="action-btn" onClick={handleOpenPopup}>
          <span className='material-icons'>playlist_add</span> 새로운 플레이리스트 만들기
        </button>

        {showPopup && <NewPlaylist onClose={handleClosePopup} onAddPlaylist={handleAddPlaylist} />}
      </div>



      <div className="playlist-grid">
        <div className="playlist-card">
          <div className="playlist-thumbnail">
            <div className='like-imgs'>
              <span className='material-icons'>recommend</span>
            </div>
          </div>

          <div className="playlist-details">
            <h3 className="playlist-title"><Link to={`/playlist/like`}>좋아하는 음악</Link></h3>
            <p className="playlist-description">User님이 좋아요 표시한 음악</p>
          </div>
          <div className="playlist-interact">
            <button className="play-btn"><span className='material-icons'>play_circle</span></button>
            <button className="like-btn"><span className='material-icons'>favorite</span></button>
          </div>
        </div>
        <div className="playlist-card">
          <div className="playlist-thumbnail">
            <div className='dislike-imgs'>
              <span className='material-icons'>recommend</span>
            </div>
          </div>

          <div className="playlist-details">
            <h3 className="playlist-title"><Link to={`/playlist/like`}>싫어하는 음악</Link></h3>
            <p className="playlist-description">User님이 싫어요 표시한 음악</p>
          </div>
          <div className="playlist-interact">
            <button className="play-btn"><span className='material-icons'>play_circle</span></button>
            <button className="like-btn"><span className='material-icons'>favorite</span></button>
          </div>
        </div>
        {playlists.map((playlist, index) => (
          <div className="playlist-card" key={index}>

            <div className="playlist-thumbnail">
              <img src={playlist.image || `https://picsum.photos/200?random=${index}`} alt="Playlist" />
            </div>
            <div className="playlist-details">
              <h3 className="playlist-title">
                <Link to={`/playlist/${playlist._id}`}>{playlist.title}</Link>
              </h3>
              <p className="playlist-description">{playlist.description}</p>
            </div>
            <div className="playlist-interact">
              <button className="play-btn"><span className='material-icons'>play_circle</span></button>
              <button className="like-btn"><span className='material-icons'>favorite</span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;
