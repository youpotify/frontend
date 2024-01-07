import React, { useEffect, useState } from 'react';
import './Album.scss';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

function Album() {

    const [albumInfo, setAlbumInfo] = useState(null);

    //Link를 통해서 넘겨준 props 받기
    const location = useLocation();
    const {albumData, youtubeId} = location.state;
    
    useEffect(()=>{
        fetchAlbumInfo(albumData,youtubeId);
        setLikedSongs(JSON.parse(localStorage.getItem('likedSongs') || '[]'));
        setHateSongs(JSON.parse(localStorage.getItem('hateSongs') || '[]'));
    }, [albumData, youtubeId]);

    //API 연결
    const fetchAlbumInfo = async (albumData, youtubeId) => {
        if (!albumData) return;

        try{
            const response = await axios.post(`http://localhost:8000/album`,{
                albumData : albumData, youtubeId : youtubeId
            });
            setAlbumInfo(response.data);
        }catch(err){
            console.error(err);
        }
    };

    //console.log(albumInfo);

    //좋아요, 싫어요 기능 추가
    // 좋아요와 싫어요 상태 추가
    const [likedSongs, setLikedSongs] = useState([]);
    const [hateSongs, setHateSongs] = useState([]);


    // 좋아요 버튼 클릭 핸들러
    const handleThumbUpClick = (song) => {
        let newLikedSongs = [...likedSongs];
        let newHateSongs = [...hateSongs];
        
        const songIndexInLiked = newLikedSongs.findIndex(s => s.id === song.id);
        const songIndexInHated = newHateSongs.findIndex(s => s.id === song.id);
    
        // 좋아요 상태 업데이트
        if (songIndexInLiked > -1) { //이미 있는 경우 좋아요 취소하기
            newLikedSongs.splice(songIndexInLiked, 1);
        } else {
            newLikedSongs.push(song);
            // 싫어요 목록에서는 제거 (좋아요와 싫어요 동시에 불가능하게)
            if (songIndexInHated > -1) {
                newHateSongs.splice(songIndexInHated, 1);
            }
        }
    
        setLikedSongs(newLikedSongs);
        setHateSongs(newHateSongs);
        localStorage.setItem('likedSongs', JSON.stringify(newLikedSongs));
        localStorage.setItem('hateSongs', JSON.stringify(newHateSongs));
    };

    // 싫어요 버튼 클릭 핸들러
    const handleHateSongClick = (song) => {
        let newLikedSongs = [...likedSongs];
        let newHateSongs = [...hateSongs];
        
        const songIndexInLiked = newLikedSongs.findIndex(s => s.id === song.id);
        const songIndexInHated = newHateSongs.findIndex(s => s.id === song.id);
    
        // 싫어요 상태 업데이트
        if (songIndexInHated > -1) { //이미 싫어요를 눌렀을 경우 싫어요리스트에서 제거
            newHateSongs.splice(songIndexInHated, 1);
        } else {
            newHateSongs.push(song);
            // 싫어요를 눌렀을 경우, 좋아요 리스트에 해당곡이 있으면 좋아요 목록에서 제거
            if (songIndexInLiked > -1) {
                newLikedSongs.splice(songIndexInLiked, 1);
            }
        }
    
        setLikedSongs(newLikedSongs);
        setHateSongs(newHateSongs);
        localStorage.setItem('likedSongs', JSON.stringify(newLikedSongs));
        localStorage.setItem('hateSongs', JSON.stringify(newHateSongs));
    };

    //렌더링시 좋아요된 곡인지 확인
    const isLikedSong = (song) => {
        const likedSongs = JSON.parse(localStorage.getItem('likedSongs') || '[]');
        return likedSongs.some(s => s.id === song.id);
    };

    const isHateSong = (song) => {
        const hateSongs = JSON.parse(localStorage.getItem('hateSongs') || '[]');
        return hateSongs.some(s => s.id === song.id);
    }

    //분 환산 함수
    function convertSecondsToMinutes(seconds) {
        const minutes = Math.floor(seconds / 60000);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    if(!albumInfo) {
        return <div>데이터 없음</div>
    }

    return (
        <div className='album-page'>
            <div className='cont'>
                {/* <div className="search-bar">
                    <input type="text" placeholder="검색..." />
                    <button onClick={handleSearch}></button>
                </div> */}

                <div className='content'>
                    <section className='album-info'>
                        <div className='left-cont'>
                            <img className='album-img' src={albumInfo.images[0].url}/>
                        </div>

                        <div className='right-cont'>
                            <h2>{albumInfo.name}</h2>
                            <div>
                                <span>{albumInfo.artists[0].name} / </span> 
                                <span>{albumInfo.release_date}</span>
                            </div>
                            <div>
                                <span>{albumInfo.tracks.items.length}곡 / </span>
                                <span>duration</span>
                            </div>

                            <div className='btns'>
                                <button>재생</button>
                                <button><span className='material-icons'>favorite</span></button>
                            </div>
                        </div>
                    </section>

                    <ul className='song-list'>
                        {albumInfo.tracks.items.map((song, index) => (
                            <li key={index} className='song-li'>
                                <div className='song-main'>
                                    <span className='song-no'>{song.track_number}</span>
                                    <span className='song-title'>{song.name}</span>
                                    <span className='song-duration'>{convertSecondsToMinutes(song.duration_ms)}</span>
                                </div>
                                <div className='song-actions'>
                                <span class={isLikedSong(song) ? "material-icons" : "material-symbols-outlined"} onClick={() => handleThumbUpClick(song)}>thumb_up</span>
                                    <span class={isHateSong(song) ? "material-icons" : "material-symbols-outlined"} onClick={() => handleHateSongClick(song)}>thumb_down</span>
                                    <span class="material-icons">add_box</span>
                                    <span class="material-icons">share</span>
                                </div>
                            </li>
                        ))}
                    </ul>


                </div>
            </div>
            
        </div>
    );
}

export default Album;