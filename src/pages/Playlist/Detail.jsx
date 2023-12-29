import React from 'react';

function Detail() {

    //더미데이터
    const playlistInfo = {
        "name": "User가 좋아하는 음악",
        "description" : "User님이 좋아요 표시한 음악",
        "images":"",
        "update_date": "2023-12-17",
        "tracks":{
            "items":[
                {"name":"song1", "duration_ms":"","artist":"artist1"},
                {"name":"song2", "duration_ms":"","artist":"artist2"},
                {"name":"song3", "duration_ms":"","artist":"artist3"},
            ]
        }
    }

    function convertSecondsToMinutes(seconds) {
        const minutes = Math.floor(seconds / 60000);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    

    return (
        <div className='album-page playlist-page'>
            <div className='cont'>
                <div className='content'>
                    <section className='album-info'>
                        <div className='left-cont'>
                            <img className='album-img' src={playlistInfo.images}/>
                        </div>

                        <div className='right-cont'>
                            <h2>{playlistInfo.name}</h2>
                            
                            <div>
                                <p>{playlistInfo.description}</p>
                            </div>
                            
                            <div>
                                <span>{playlistInfo.tracks.items.length}곡 / </span>
                                <span>duration</span>
                            </div>

                            <div className='btns'>
                                <button>재생</button>
                                <button>셔플</button>
                            </div>
                        </div>
                    </section>

                    <ul className='song-list'>
                        {playlistInfo.tracks.items.map((song, index) => (
                            <li key={index} className='song'>
                                <div className='song-main'>
                                    {/* <span className='song-no'>{song.track_number}</span> */}
                                    <span className='song-title'>{song.name}</span>
                                    <span className='song-title'>{song.artist}</span>
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

export default Detail;