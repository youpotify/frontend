import React, { useEffect, useRef, useState } from 'react';
import './MusicPlayer.scss';
import MusicPlayerBar from '../component/MusicPlayerBar/MusicPlayerBar';
import axios from 'axios';
import { FaPause, FaStop, FaPlay } from 'react-icons/fa';

const MusicPlayer = () => {
    const [token, setToken] = useState(''); // 스포티파이 토큰 값
    const [spotifyMusic, setSpotifyMusic] = useState([]); // 스포티파이 노래 호출


    const [musicPlaying, setMusicPlaying] = useState(true); // 노래 플레이 상태
    const [currentSongIndex, setCurrentSongIndex] = useState(null);


    const [currentSong, setCurrentSong] = useState(null); // 노래 정보담기

    const [progress, setProgress] = useState(0); // 재생 진행률 상태
    const [currentTime, setCurrentTime] = useState(0); // 현재 재생 시간 상태


    const [isPlayerBarVisible, setIsPlayerBarVisible] = useState(false); // 뮤직플레이어바 올리기

    const spotifyMusicRef = useRef(spotifyMusic);
    const youtubePlayerRef = useRef(null);

    useEffect(() => {
        spotifyMusicRef.current = spotifyMusic;
    }, [spotifyMusic]);


    // 스포티파이 토큰값, 노래추천 호출
    useEffect(() => {
        const fetchToken = async () => {
            const clientId = '';                // 클라이언트 아이디
            const clientSecret = '';            // 클라이언트 비밀번호
            const authString = `${clientId}:${clientSecret}`;
            const authBase64 = window.btoa(authString);

            try {
                const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${authBase64}`
                    }
                });
                return response.data.access_token;
            } catch (error) {
                console.error('Spotify 토큰 요청 중 오류 발생:', error);
                return null;
            }
        };

        const fetchRecommendations = async (accessToken) => {
            if (accessToken && spotifyMusic.length === 0) {
                const apiUrl = 'https://api.spotify.com/v1/recommendations';
                try {
                    const response = await axios.get(apiUrl, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        },
                        params: {
                            seed_genres: 'pop',
                            limit: 13
                        }
                    });
                    setSpotifyMusic(response.data.tracks);
                } catch (error) {
                    console.error('Spotify API 요청 중 오류 발생:', error);
                }
            }
        };

        const getTokenAndFetchRecommendations = async () => {
            const token = await fetchToken();
            if (token) {
                fetchRecommendations(token);
            }
        };

        getTokenAndFetchRecommendations();
    }, []);


    // youtube 비디오 호출
    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            const player = new window.YT.Player('player', {
                height: '0',
                width: '0',
                videoId: '',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                },
            });

            // youtubePlayerRef에 player 인스턴스 저장
            youtubePlayerRef.current = player;
        };

        return () => {
            window.onYouTubeIframeAPIReady = null;
        };
    }, []);


    const onPlayerReady = (event) => {
        // console.log("YouTube Player 준비 완료");
        // 플레이어 재생 시 기본 볼륨 50
        youtubePlayerRef.current.setVolume(50);
    };

    // 노래 상태 변경 시 호출되는 함수
    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.ENDED) {
            console.log("다음 노래 재생 확인");
            playNextSong(); // 노래가 끝나면 다음 노래 재생
        }
    };

    // 다음 노래 재생 함수
    const playNextSong = () => {
        const currentSpotifyMusic = spotifyMusicRef.current;

        const storedIndex = localStorage.getItem('currentSongIndex'); // localStorage에 넣어둔 인덱스 받아오기
        const currentIndex = storedIndex ? parseInt(storedIndex, 10) : 0;

        // 다음 곡의 인덱스 계산 (마지막 곡이면 재생 중지)
        if (currentIndex + 1 >= currentSpotifyMusic.length) {
            setMusicPlaying(false);

        } else {
            const nextSongIndex = currentIndex + 1;
            const nextSong = currentSpotifyMusic[nextSongIndex];
            youtubeAPI(nextSong, nextSongIndex);
        }
    };

    // 이전 노래 재생 함수
    const playPreviousSong = () => {
        const currentSpotifyMusic = spotifyMusicRef.current;
        const storedIndex = localStorage.getItem('currentSongIndex');
        const currentIndex = storedIndex ? parseInt(storedIndex, 10) : 0;
        const currentTime = youtubePlayerRef.current ? youtubePlayerRef.current.getCurrentTime() : 0;

        // 현재 노래가 3초 이하로 재생되었다면 이전 곡을 재생
        if (currentTime <= 3) {
            if (currentIndex === 0) {
                // 첫 번째 곡인 경우 아무런 동작도 하지 않음
                return;
            }
            const previousSongIndex = currentIndex - 1;
            const previousSong = currentSpotifyMusic[previousSongIndex];
            youtubeAPI(previousSong, previousSongIndex);
        } else {
            // 현재 곡이 3초 이상 재생되었다면 현재 곡을 처음부터 재생
            youtubePlayerRef.current.seekTo(0);

        }
    };


    // YouTube API 호출
    const youtubeAPI = async (music, index) => {
        const searchQuery = `${music.name} ${music.artists[0].name}`;

        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    maxResults: 1,
                    q: searchQuery + "audio", // 검색어
                    type: 'video',
                    videoCategoryId: '10', // 음악 카테고리
                    key: ''         // 유튜브 api key
                }
            });

            setCurrentSong({
                thumbnail: music.album.images[0].url,
                title: music.name,
                artist: music.artists[0].name,
                playing: true // 재생 중인지의 상태
            });

            const videoId = response.data.items[0].id.videoId;
            playVideo(videoId);

            setMusicPlaying(true);
            setCurrentSongIndex(index);
            localStorage.setItem('currentSongIndex', index); // index가 다음노래 호출시에 추적이안돼서 localStorage 사용
        } catch (error) {
            console.error('YouTube API 요청 중 오류 발생:', error);
        }
    };


    // YouTube 비디오 재생 함수
    const playVideo = (videoId) => {
        if (youtubePlayerRef.current) {
            setMusicPlaying(true);
            setIsPlayerBarVisible(true);
            youtubePlayerRef.current.loadVideoById(videoId);
            youtubePlayerRef.current.playVideo();
        } else {
            console.error("YouTube Player 인스턴스 없음");
        }
    };

    const pauseVideo = () => {
        if (youtubePlayerRef.current) {
            setMusicPlaying(false);
            youtubePlayerRef.current.pauseVideo();
        } else {
            console.error("YouTube Player 인스턴스 없음");
        }
    };

    const handleSongClick = (music, index) => {
        // 현재 선택된 곡이 다시 클릭된 경우
        if (currentSongIndex === index) {
            if (musicPlaying) {
                pauseVideo();

            } else {
                playVideo(music.videoId);

            }
        } else {
            // 새로운 곡이 선택된 경우
            youtubeAPI(music, index);
            setCurrentSongIndex(index); // 인덱스 업데이트
        }
    };

    // 볼륨 조절 함수
    const handleVolumeChange = (volume) => {
        if (youtubePlayerRef.current) {
            youtubePlayerRef.current.setVolume(volume);
        }
    }

    // YouTube Player의 현재 재생 시간과 전체 길이를 가져와 진행률을 계산
    const updateProgress = () => {
        if (youtubePlayerRef.current && youtubePlayerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
            const currentTime = youtubePlayerRef.current.getCurrentTime();
            const duration = youtubePlayerRef.current.getDuration();
            const progress = (currentTime / duration) * 100;
            setProgress(progress);
        }
    };

    // 일정 간격으로 진행률 업데이트
    useEffect(() => {
        const interval = setInterval(updateProgress, 1000); // 1초마다 진행률 업데이트
        return () => clearInterval(interval);
    }, [youtubePlayerRef.current]);


    // 노래 시간 이동
    const handleProgressChange = (newProgress) => {
        if (youtubePlayerRef.current && youtubePlayerRef.current.getPlayerState() !== window.YT.PlayerState.UNSTARTED) {
            const duration = youtubePlayerRef.current.getDuration();
            const newTime = duration * (newProgress / 100);
            youtubePlayerRef.current.seekTo(newTime);
        }
    };



    // 현재 재생하는 노래영상 시간체크해서 뮤직플레이어바에 넣어주려고 했으나 유튜브에서 불러오는 비디오 길이와 스포티파이에서 제공해주는 노래시간 길이가 일치하지않아서 보류
    // 현재 재생 시간을 주기적으로 업데이트
    useEffect(() => {
        const interval = setInterval(updateCurrentTime, 1000); // 1초마다 현재 시간 업데이트
        return () => clearInterval(interval);
    }, [youtubePlayerRef.current]);


    // 현재 재생 시간 업데이트 함수
    const updateCurrentTime = () => {
        if (youtubePlayerRef.current) {
            const time = youtubePlayerRef.current.getCurrentTime();
            setCurrentTime(time);
        }
    };

    return (
        <div className="music-player-layout">
            <div className="top-nav"><div id="player"></div></div>
            <div className="side-nav"></div>
            <div className="content">

                {/*음악 커버 이미지 화면*/}
                <div className="content-left">
                    {spotifyMusic.length > 0 && (
                        <div key={spotifyMusic[0].id}>
                            {currentSongIndex == null ? <img src={spotifyMusic[0].album.images[0].url} width={400} alt={spotifyMusic[0].name} /> :
                                <img src={spotifyMusic[currentSongIndex].album.images[0].url} width={400} alt={spotifyMusic[0].name} />}
                        </div>
                    )}

                </div>

                {/* 현재노래, 다음노래 재생화면 */}
                <div className="content-right">

                    {spotifyMusic.map((music, index) => (
                        <div
                            className={`music-item ${currentSongIndex === index ? 'selected' : ''}`}
                            key={music.id}
                            onClick={() => handleSongClick(music, index)}
                        >
                            <div className="music-thumbnail">
                                <img src={music.album.images[0].url} width={40} height={35} />
                                {currentSongIndex === index && musicPlaying && (
                                    <div className="stop-icon">
                                        <FaPause /> {/* 정지 아이콘 */}
                                    </div>
                                )}
                                {currentSongIndex === index && !musicPlaying && (
                                    <div className="play-icon">
                                        <FaPlay /> {/* 재생 아이콘 */}
                                    </div>
                                )}
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

            {/* 노래 클릭해서 재생시 뮤직플레이어 바 나타남 */}
            {isPlayerBarVisible && (
                <MusicPlayerBar
                    playing={musicPlaying}
                    song={currentSong}
                    onPlay={playVideo}
                    onPause={pauseVideo}
                    onNext={playNextSong}
                    onPrevious={playPreviousSong}
                    onVolumeChange={handleVolumeChange}
                    progress={progress}
                    onProgressChange={handleProgressChange}
                    currentTime={currentTime}
                />
            )}
        </div>
    );
};

export default MusicPlayer;