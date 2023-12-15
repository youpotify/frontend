import React, { useEffect, useState } from 'react';
import './Album.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Album() {

    const [albumInfo, setAlbumInfo] = useState(null);
    const {id} = useParams();
    
    useEffect(()=>{
        fetchAlbumInfo(id);
    }, [id]);

    //API 연결
    const fetchAlbumInfo = async (albumId) => {
        if (!albumId) return;

        try{
            const response = await axios.get(`http://localhost:3000/album`,{
                params:{
                    id : albumId
                }
            });
            setAlbumInfo(response.data);
        }catch(err){
            console.error(err);
        }
    };

    console.log(albumInfo);

    const handleSearch = () => {
        // 검색
    };

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
                <div className="search-bar">
                    <input type="text" placeholder="검색..." />
                    <button onClick={handleSearch}></button>
                </div>

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
                            <li key={index} className='song'>
                                <div className='song-main'>
                                    <span className='song-no'>{song.track_number}</span>
                                    <span className='song-title'>{song.name}</span>
                                    <span className='song-duration'>{convertSecondsToMinutes(song.duration_ms)}</span>
                                </div>
                                <div className='song-actions'>
                                    <span class="material-icons">thumb_up</span>
                                    <span class="material-icons">thumb_down</span>
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