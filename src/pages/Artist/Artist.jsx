import React, { useEffect, useState } from 'react';
import './Artist.scss';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Artist() {

    const [artistInfo, setArtistInfo] = useState(null);
    const [error, setError] = useState('');
    const {name} = useParams();

    useEffect(()=>{
        fetchArtistInfo(name);
    }, [name]);

    // 스포티파이 API로부터 아티스트 정보 가져오기
    const fetchArtistInfo = async (artistName) => {
    
        if (!artistName) return;

        try {
            const response = await axios.get(`http://localhost:5000/search`, {
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
            <div className="search-bar">
                <input type="text" placeholder="검색..." value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                <button onClick={handleSearch}></button>
            </div>

            <section className="artist-content inner-cont">
                <h1>{artistInfo.spotify.name}</h1>
                {/* <p className={isExpanded ? 'expanded' : '' }>{artistData.info}</p> */}
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
                        <li key={index} className='song'>
                            <ul>
                                <img className='song-img' src={s.album.images[0].url}/>
                                <li className='song-title'>{s.name}</li>
                                <li className='song-artist'>{artistInfo.spotify.name}</li>
                                <li className='song-album'>{s.album.name}</li>
                                <li className='song-icons'>
                                    <span class="material-icons">thumb_up</span>
                                    <span class="material-icons">thumb_down</span>
                                    <span class="material-icons">add_box</span>
                                    <span class="material-icons">share</span>
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
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
                                    <Link to={`/album/${album.name}`} state={{data:album, youtubeId: artistInfo.youtubeId}}>{album.name}</Link>
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