import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./TopChart.scss";
import { Link } from 'react-router-dom';


function TopChart() {

    //차트 데이터 상태관리
    const [chartData, setChartData] = useState();

    //백엔드 연결함수
    const fetchTopChart = async () => {
        // console.log("fetch 함수 실행");
        try{
            const response = await axios.get('http://localhost:8000/spotify/topChart');
            setChartData(response.data);
        } catch (e) {
            console.error(e);
        }
    };



    console.log(chartData);

    useEffect(() => {
        fetchTopChart();
    }, []);

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

    return (
        <div className='top-songs'>
            <h2>Top 50</h2>
            <ul>
                    {chartData && chartData.tracks.items.slice(0,5).map((s,index)=>(
                        <li key={index} className='song-li'>
                            <ul>
                                <li>{index+1}</li>
                                {/* 앨범커버 클릭시 해당 앨범페이지로 이동 */}
                                <Link to={`/album/${s.track.album.name}`} state={{albumData:s.track.album, youtubeId:""}}>
                                    <img className='song-img' src={s.track.album.images[0].url}/>
                                </Link>
                                {/* 곡 제목 클릭시 재생 */}
                                <li className='song-title' onClick={()=> onClickMusicPlay(s)}>{s.name}</li>
                                {/* 아티스트명 클릭시 해당 아티스트 페이지로 이동 */}
                                <li className='song-artist'>{s.track.artists[0].name}</li>
                                <li className='song-album'>{s.track.album.name}</li>
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
        </div>
    );
}

export default TopChart;