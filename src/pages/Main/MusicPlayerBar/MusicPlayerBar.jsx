import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MusicPlayerBar.scss';
import { FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa';

const MusicPlayerBar = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="music-player-bar">
            <div>
                {/* 왼쪽 */}
                <FaBackward />
                {isPlaying ? <FaPause onClick={togglePlay} /> : <FaPlay onClick={togglePlay} />}
                <FaForward />
            </div>
            <div>
                {/* 중앙 */}
                <div className="music-thumbnail">
                    <img width={45} height={30} />
                </div>
                <div className="music-info">
                    <div className="music-title">
                        작업해야할 칸
                    </div>
                    <div className="music-artist">
                        아티스트명
                    </div>
                </div>
            </div>
            <div>
                {/* 오른쪽 */}
                오른쪽
            </div>
        </div>
    );
};

export default MusicPlayerBar;
