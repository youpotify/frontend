import React, { useState } from 'react';
import './Playlist.scss';
import NewPlaylist from '../../components/Playlist/Popup';
import { Link } from 'react-router-dom';


function Playlist() {

        const [showPopup, setShowPopup] = useState(false);
      
        const handleOpenPopup = () => {
          setShowPopup(true);
        };
      
        const handleClosePopup = () => {
          setShowPopup(false);
        };
    

    return (
        <div className="playlist-page">
            <h1>User님의 플레이리스트</h1>
          {/* <div className="search-container">
            <input className="search-input" type="text" placeholder="Search playlists..." />
          </div> */}
          <div className="playlist-actions">
            <button className="action-btn" onClick={handleOpenPopup}><span className='material-icons'>playlist_add</span> 새로운 플레이리스트 만들기</button>
            {showPopup && <NewPlaylist onClose={handleClosePopup} />}
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
            
            {/* 백엔드 연결 후 수정 */}
            {Array(10).fill().map((_, index) => (
              <div className="playlist-card" key={index}>
                <div className="playlist-thumbnail">
                  <img src={`https://picsum.photos/200?random=${index}`} alt="Playlist" />
                </div>
                <div className="playlist-details">
                  <h3 className="playlist-title">플리{index + 1}</h3>
                  <p className="playlist-description">어쩌구 저쩌구 플레이리스트</p>
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
};

export default Playlist;