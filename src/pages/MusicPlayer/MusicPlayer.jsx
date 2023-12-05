import React, { useEffect, useState } from 'react';
import './MusicPlayer.scss';
import MusicPlayerBar from '../Main/MusicPlayerBar/MusicPlayerBar';
import axios from 'axios';

const MusicPlayer = () => {

    const [youtubePlayer, setYoutubePlayer] = useState(null);
    const [token, setToken] = useState('');
    const [spotifyMusic, setSpotifyMusic] = useState([]);
    const [currentPlayingSongId, setCurrentPlayingSongId] = useState([]);


    // youtube 비디오 호출
    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            setYoutubePlayer(new window.YT.Player('player', {
                height: '450', // 숨김 처리
                width: '450',  // 숨김 처리
                videoId: '',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                },
            }));
        };
    }, []);

    const onPlayerReady = (event) => {
        // 플레이어 준비 완료 시 호출되는 함수
    };

    // 노래 상태 변경 시 호출되는 함수
    const onPlayerStateChange = (event) => {

        if (event.data === window.YT.PlayerState.ENDED) {
            console.log("Current song ended, attempting to play next song."); // 현재 노래 종료 로그
            playNextSong(); // 노래가 끝나면 다음 노래 재생
        }
    };

    // 다음 노래 재생 함수
    const playNextSong = () => {
        console.log("다음 노래 비디오 아이디");
        const currentSongIndex = spotifyMusic.findIndex(song => song.id === currentPlayingSongId);
        console.log("Current song index:", currentSongIndex); // 현재 노래 인덱스 로그
        const nextSong = spotifyMusic[currentSongIndex + 1];
        if (nextSong) {
            console.log("Next song found:", nextSong.name); // 다음 노래 정보 로그
            fetchData(nextSong); // 다음 노래 YouTube ID 가져와서 재생
        } else {
            console.log("No next song found."); // 다음 노래 없음 로그
        }
    };

    // YouTube API 호출
    const fetchData = async (music) => {
        // console.log(music.name);
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    maxResults: 1,
                    q: music.name, // 검색어
                    type: 'video',
                    videoCategoryId: '10', // 음악 카테고리
                    key: ''
                }
            });

            console.log(music);
            playVideo(response.data.items[0].id.videoId);
            console.log(music.id);
            setCurrentPlayingSongId(music.id);
        } catch (error) {
            console.error('YouTube API 요청 중 오류 발생:', error);
        }
    };

    // YouTube 비디오 재생 함수
    const playVideo = (video) => {
        if (youtubePlayer && video) {
            // console.log("Loading video ID:", video); // 로드되는 비디오 ID 로그
            youtubePlayer.loadVideoById(video);
            youtubePlayer.playVideo();
        } else {
            console.log("YouTube player not initialized or no video ID provided."); // 플레이어 또는 비디오 ID 문제 로그
        }
    };

    const stopVideo = () => {
        if (youtubePlayer) {
            youtubePlayer.stopVideo();
        }
    };


    // 스포티파이 토큰값 호출
    useEffect(() => {
        const fetchToken = async () => {
            const clientId = ''; // 클라이언트 ID
            const clientSecret = ''; // 클라이언트 비밀번호
            const authString = `${clientId}:${clientSecret}`;
            const authBase64 = window.btoa(authString);

            try {
                const response = await axios.post('https://accounts.spotify.com/api/token',
                    'grant_type=client_credentials', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${authBase64}`
                    }
                }
                );

                setToken(response.data.access_token);
            } catch (error) {
                console.error('Spotify 토큰 요청 중 오류 발생:', error);
            }
        };

        fetchToken();
    }, []);


    useEffect(() => {

        if (!token) return;
        const fetchRecommendations = async () => {
            const accessToken = token;
            const apiUrl = 'https://api.spotify.com/v1/recommendations';
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    params: {
                        seed_genres: 'pop', // 예시: 팝 장르를 기반으로 추천
                        limit: 15 // 추천받을 트랙 수
                    }
                });
                setSpotifyMusic(response.data.tracks);
            } catch (error) {
                console.error('Spotify API 요청 중 오류 발생:', error);
            }
        };

        fetchRecommendations();
    }, [token]);




    return (
        <div className="music-player-layout">
            <div className="top-nav">  </div>
            <div className="side-nav"></div>
            <div className="content">
                {/*음악 커버 이미지 화면*/}
                <div id="player"></div>
                <div className="content-left">
                    {spotifyMusic.length > 0 && (
                        <div key={spotifyMusic[0].id}>
                            <img src={spotifyMusic[0].album.images[0].url} width={400} alt={spotifyMusic[0].name} />
                        </div>
                    )}

                </div>

                {/* 현재노래, 다음노래 재생화면 */}
                <div className="content-right">
                    {spotifyMusic.map(music => (
                        <div className="music-item" key={music.id} onClick={() => fetchData(music)}>
                            <div className="music-thumbnail">
                                <img src={music.album.images[0].url} width={40} height={35} />
                            </div>
                            <div className="music-info">
                                <div className="music-title">{music.name}</div>
                                <div className="music-artist">{music.artists[0].name}</div>
                            </div>
                            <div className="music-info">
                                <div className="music-time">
                                    {Math.floor(music.duration_ms / 60000)}:
                                    {((music.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <MusicPlayerBar />
        </div>
    );
};

export default MusicPlayer;