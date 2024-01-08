import React, { useEffect, useState } from 'react';
import './Artist.scss';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Artist() {

    const [artistInfo, setArtistInfo] = useState(null);
    const [error, setError] = useState('');
    const {name} = useParams();


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

    useEffect(()=>{
        fetchArtistInfo(name);
        setLikedSongs(JSON.parse(localStorage.getItem('likedSongs') || '[]'));
        setHateSongs(JSON.parse(localStorage.getItem('hateSongs') || '[]'));
    }, [name]);

    //렌더링시 좋아요된 곡인지 확인
    const isLikedSong = (song) => {
        const likedSongs = JSON.parse(localStorage.getItem('likedSongs') || '[]');
        return likedSongs.some(s => s.id === song.id);
    };

    const isHateSong = (song) => {
        const hateSongs = JSON.parse(localStorage.getItem('hateSongs') || '[]');
        return hateSongs.some(s => s.id === song.id);
    }

    // 스포티파이 API로부터 아티스트 정보 가져오기
    const fetchArtistInfo = async (artistName) => {
    
        if (!artistName) return;

        try {
            const response = await axios.get(`http://localhost:8000/search`, {
                params: {
                    term: artistName
                }
            });
            setArtistInfo(response.data);
            // console.log(response.data);
            //console.log(response);
            //setMaxIndex(artistInfo.albums.length - 5);
            console.log(`artistInfo: ${artistInfo}`);
        } catch (err) {
            setError('아티스트 정보를 불러오는 데 실패했습니다.');
            console.error(err);
        }
    };

    console.log(artistInfo);

    //검색 관련 상태관리 및 함수
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
       console.log(searchTerm);
        //검색 로직 연결
    };


    //텍스트 더보기 관련 상태관리
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    }

    //슬라이더 관련 상태관리
    const [currentStartIndex, setCurrentStartIndex] = React.useState(0);
    const maxIndex = !artistInfo? 5 : artistInfo.spotify.albums.length - 5;

    const moveLeft = () => {
        console.log(maxIndex);
        setCurrentStartIndex(currentStartIndex => Math.max(0, currentStartIndex - 1));
    };

    const moveRight = () => {
        console.log(maxIndex);
        setCurrentStartIndex(currentStartIndex => Math.min(maxIndex, currentStartIndex + 1));
    };

    //노래제목 클릭시 재생
    const onClickMusicPlay = (song) => {
        console.log(song);
    }


    if(!artistInfo) {
        return <div>데이터 없음</div>
    }


    return (
    <div className='artist-page'>
        <div className="backgroud"
            style={{ 
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
                url(${artistInfo.spotify.img})` }}>
        </div>

        <div className="container">
            {/* <div className="search-bar">
                <input type="text" placeholder="검색..." value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                <button onClick={handleSearch}></button>
            </div> */}

            <section className="artist-content inner-cont">
                <h1>{artistInfo.spotify.name}</h1>
                <p className={isExpanded ? 'expanded' : '' }>{artistInfo.description}</p>
                <button className="outline-btns" onClick={toggleText}>{isExpanded ? '접기' : '더보기'}</button>

                <ul className='likebtns'>
                    <li><span class="material-icons">shuffle</span> 셔플</li>
                    <li><span class="material-icons">share</span> 공유</li>
                </ul>
            </section>

            <section className="top-songs inner-cont">
                <h2>노래</h2>
                <ul>
                    {artistInfo.spotify.songs.slice(0,5).map((s,index)=>(
                        <li key={index} className='song-li'>
                            <ul>
                                {/* 앨범커버 클릭시 해당 앨범페이지로 이동 */}
                                <Link to={`/album/${s.album.name}`} state={{albumData:s.album, youtubeId: artistInfo.youtubeId}}>
                                    <img className='song-img' src={s.album.images[0].url}/>
                                </Link>
                                {/* 곡 제목 클릭시 재생 */}
                                <li className='song-title' onClick={()=> onClickMusicPlay(s)}>{s.name}</li>
                                {/* 아티스트명 클릭시 해당 아티스트 페이지로 이동 */}
                                <li className='song-artist'>{artistInfo.spotify.name}</li>
                                <li className='song-album'>{s.album.name}</li>
                                <li className='song-icons'>
                                    <span class={isLikedSong(s) ? "material-icons" : "material-symbols-outlined"} onClick={() => handleThumbUpClick(s)}>thumb_up</span>
                                    <span class={isHateSong(s) ? "material-icons" : "material-symbols-outlined"} onClick={() => handleHateSongClick(s)}>thumb_down</span>
                                    <span class="material-icons">add_box</span>
                                    <span class="material-icons">share</span>
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
                {/* 버튼 클릭시 해당 아티스트의 전체곡 list 출력 페이지로 이동 */}
                <button className='outline-btns'>모두 보기</button>
            </section>

            <section className='albums inner-cont'>
                <h2>앨범</h2>
                <div className='album-view'>
                    <ul className='album-list' style={{ transform: `translateX(-${currentStartIndex * 20}%)` }}>
                        {artistInfo.spotify.albums.map((album, index)=>(
                            <li key={index} className='album'>
                                <div className='album-img-wrapper'>
                                    <img className='album-img' src={album.images[0].url}/>
                                    <span className='play-icon'>▶</span>
                                </div>
                                
                                <span>
                                    <Link to={`/album/${album.name}`} state={{albumData:album, youtubeId: artistInfo.youtubeId}}>{album.name}</Link>
                                </span>
                                {/* <span>{album.release_date}</span> */}
                            </li>
                        ))}
                    </ul>
                </div>

                <button onClick={moveLeft} disabled={currentStartIndex === 0}>&lt;</button>
                <button onClick={moveRight} disabled={currentStartIndex >= maxIndex}>&gt;</button>
            
            </section>

    </div>
        </div>
        
    );
}

export default Artist;