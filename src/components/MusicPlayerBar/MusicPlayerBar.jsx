import React, { useState, useEffect } from 'react';
import './MusicPlayerBar.scss';
import { FaPlay, FaPause, FaBackward, FaForward, FaVolumeUp, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import axios from 'axios';
const MusicPlayerBar = ({ playing, song, onPlay, onPause, onNext, onPrevious, onVolumeChange, progress, onProgressChange, currentTime }) => {
    const [musicPlaying, setIsMusicPlaying] = useState(false);
    const [reaction, setReaction] = useState(null);

    useEffect(() => {
        setIsMusicPlaying(playing);
    }, [playing]);


    // 좋아요, 싫어요 상태불러오기
    useEffect(() => {
        setReaction(null);
        const fetchReaction = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/reactions/${song.title}`);
                setReaction(response.data.reactionType);
                console.log(response.data.reactionType);
            } catch (error) {
                console.error('Error fetching reaction:', error);
            }
        };

        if (song) {
            fetchReaction();
        }
    }, [song]);

    const togglePlay = () => {
        if (musicPlaying) {
            onPause(); // 재생 중이면 정지
        } else {
            onPlay(); // 정지 상태면 재생
        }
        setIsMusicPlaying(!musicPlaying);
    };

    const handleProgressBarChange = (e) => {
        const newProgress = e.target.value;
        onProgressChange(newProgress);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };


    // 좋아요, 싫어요
    const sendReaction = async (reactionType) => {
        if (song) {
            try {
                // 이미 같은 반응을 했으면 반응 취소
                if (reaction === reactionType) {
                    await axios.delete(`http://localhost:5000/reactions/${song.title}`);
                    setReaction(null);
                } else {
                    // 다른 반응을 한 경우 (예: 좋아요 상태에서 싫어요 누르기)
                    // 먼저 기존 반응을 삭제
                    if (reaction) {
                        await axios.delete(`http://localhost:5000/reactions/${song.title}`);
                    }
                    // 새로운 반응을 서버에 보내기
                    const response = await axios.post('http://localhost:5000/reactions', {
                        songTitle: song.title,
                        reactionType: reactionType
                    });
                    setReaction(reactionType);
                }
            } catch (error) {
                console.error('Error handling reaction:', error);
            }
        }
    };

    return (
        <div className="music-player-bar">
            <input
                type="range"
                className="progress-bar"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressBarChange}
            />
            <div className="player-controls">
                {/* 왼쪽 - 재생 컨트롤 */}
                <FaBackward className="icon" onClick={onPrevious} />
                {musicPlaying ? (
                    <FaPause className="icon" onClick={togglePlay} />
                ) : (
                    <FaPlay className="icon" onClick={togglePlay} />
                )}
                <FaForward className="icon" onClick={onNext} />

                <div className="current-time">
                    {formatTime(currentTime)}
                </div>
            </div>

            <div className="player-info">
                {/* 중앙 - 노래 정보 */}
                {song && (
                    <>
                        <img src={song.thumbnail} width={45} height={45} alt={song.title} />

                        <div className="music-info">
                            <div className="music-name">{song.title}</div>
                            <div className="music-artist">{song.artist}</div>
                        </div>
                        <div className="reaction-icons">
                            <FaThumbsDown
                                className={`dislike-icon ${reaction === 'dislike' ? 'dislike-active' : ''}`}
                                onClick={() => sendReaction('dislike')}
                            />
                            <FaThumbsUp
                                className={`like-icon ${reaction === 'like' ? 'like-active' : ''}`}
                                onClick={() => sendReaction('like')}
                            />


                        </div>
                    </>
                )}
            </div>

            <div className="player-extra">
                {/* 오른쪽 - 볼륨, 옵션 */}
                <FaVolumeUp className="volume-icon" />
                <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    onChange={(e) => onVolumeChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default MusicPlayerBar;
