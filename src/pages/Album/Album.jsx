import React from 'react';
import './Album.scss';

function Album() {

    const handleSearch = () => {
        // 검색
    };

    //더미데이터
    const albumData = {
        "name":"sleepless in __________",
        "artist": "EPIK HIGH",
        "description":"Do you have trouble sleeping? Do you have nightmares? Are you heartbroken? Do you feel down depressed hopeless? Do you miss someone? Do you find that things you once enjoyed No longer interest you? Are you lonely? Are you always Sleepless?",
        "relaseYear":"2019",
        "img":"https://lh3.googleusercontent.com/EymnMob2ufzNmPJjcj0IoS8XZNGYtgRse3Ysaj3r1ZUCctBvDXWutfoCLzthj2T3XxODFCLgFLj-bvc9=w544-h544-l90-rj",
        "songs":[
            {"no":1, "title":"Sleepless", "duration":65},
            {"no":2, "title":"In Seoul (feat. 선우정아)", "duration":223},
            {"no":3, "title":"술이 달다 (feat. Crush)", "duration":251},
            {"no":4, "title":"새벽에", "duration":206},
            {"no":5, "title":"No Different (feat. Yuna)", "duration":201},
            {"no":6, "title":"비가 온대 내일도", "duration":180},
            {"no":7, "title":"Lullaby For A Cat", "duration":132},
        ]
    };

    //분 환산 함수
    function convertSecondsToMinutes(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className='album-page'>
            <div className='container'>
                <div className="search-bar">
                    <input type="text" placeholder="검색..." />
                    <button onClick={handleSearch}></button>
                </div>

                <div className='content'>
                    <section className='album-info'>
                        <div className='left-cont'>
                            <img className='album-img' src={albumData.img}/>
                        </div>

                        <div className='right-cont'>
                            <h2>{albumData.name}</h2>
                            <span>{albumData.artist} / </span> 
                            <span>{albumData.relaseYear}</span>
                            <br/>
                            <span>{albumData.songs.length}곡 / </span>
                            <span>duration</span>
                            <br/>
                            <p>{albumData.description}</p>

                            <div className='btns'>
                                <button>재생</button>
                                <button><span className='material-icons'>favorite</span></button>
                            </div>
                        </div>
                    </section>

                    <ul className='song-list'>
                        {albumData.songs.map((song, index) => (
                            <li key={index} className='song'>
                                <div className='song-main'>
                                    <span className='song-no'>{song.no}</span>
                                    <span className='song-title'>{song.title}</span>
                                    <span className='song-duration'>{convertSecondsToMinutes(song.duration)}</span>
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