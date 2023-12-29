import React, { useState, useEffect } from 'react';
import './MusicPlayerBar.scss';
import { FaPlay, FaPause, FaBackward, FaForward, FaVolumeUp, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const MusicPlayerBar = ({ playing, song, onPlay, onPause, onNext, onPrevious, onVolumeChange, progress, onProgressChange, currentTime }) => {
    const [musicPlaying, setIsMusicPlaying] = useState(false);

    useEffect(() => {
        setIsMusicPlaying(playing);
    }, [playing]);

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
                            <FaThumbsDown className="dislike-icon" />
                            <FaThumbsUp className="like-icon" />
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
