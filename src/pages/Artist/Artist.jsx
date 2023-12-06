import React, { useEffect, useState } from 'react';
import './Artist.scss';

function Artist() {

    //더미데이터
    const artistData = {
        "name":"EPIK HIGH",
        "info":"에픽하이는 2002년부터 활동하고 있는 대한민국의 3인조 힙합 그룹이다. ‘Epik High’란 이름은 영어의 ‘epic’과 ‘high’를 변형 및 결합하여 ‘Epik High’가 만들어졌고 ‘시에 만취된 상태’, 또는 ‘서사적인 높음’이라는 뜻을 지니고 있다. “Two MCs and one DJ. No genre, just music ”이라고 소개하기도 한다. 멤버로는 타블로, DJ 투컷, 미쓰라 진이 있다. 무브먼트와 맵더소울 크루 소속이다. 2001년 결성 후 CB 매스를 비롯한 여러 아티스트들의 피쳐링으로 활동을 시작하였으나 VIP 사건으로 인하여 데뷔 음반 발매 시기가 늦춰졌다. 이후 2003년, 정규 1집 《Map of the Human Soul》으로 데뷔하였으나 대중에게서 큰 주목을 받지 못했고 그 후 2004년에 정규 2집 《High Society》부터 활발한 방송 활동과 〈평화의 날〉을 통해 서서히 이름을 알렸다. 2005년에는 정규 3집 《Swan Songs》의 타이틀곡인 'Fly'와 2007년에 정규 4집 《Remapping the Human Soul》의 'Fan'으로 각각 16만 장, 13만 장의 판매고를 기록하였고 골든디스크, MKMF, KBS 연예대상에서 연속 수상하는 연이은 큰 성공을 거두면서 대중적인 가수로 자리잡았다.",
        "song":[
            {"title":"Screen Time(feat.hoshi of seventeen)", "artist":"Epik High", "album":"Screen Time", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
            {"title":"우산(feat. 윤하)", "artist":"Epik High", "album":"Pieces, Part One", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
            {"title":"Love Love Love", "artist":"Epik High", "album":"Remapping The Human Soul", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
            {"title":"연애소설(feat. IU)", "artist":"Epik High", "album":"WE'VE DONE SOMETHING WONDERFUL", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
            {"title":"빈차(feat.오혁)", "artist":"Epik High", "album":"WE'VE DONE SOMETHING WONDERFUL", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
        ],
        "Album":[
            {"title":"title","releaseYear":"2023", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
            {"title":"title2","releaseYear":"2022", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
            {"title":"title3","releaseYear":"2021", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
            {"title":"title4","releaseYear":"2020", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
            {"title":"title5","releaseYear":"2019", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
            {"title":"title6","releaseYear":"2018", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
            {"title":"title7","releaseYear":"2017", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
            {"title":"title8","releaseYear":"2016", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
            {"title":"title9","releaseYear":"2015", "img":"https://lh3.googleusercontent.com/01jmkleTG7B3ty1nMHTY48874tQrRGdt7lO2ziuttE1E87LHLfZli99-LdXcyZ08CqnqIk5-dn-9Ab3W0Q=w544-h544-l90-rj"},
        ]

    };

    const handleSearch = () => {
        // 검색
    };

    //텍스트 더보기 관련 상태관리
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    }

    //슬라이더 관련 상태관리
    const [currentStartIndex, setCurrentStartIndex] = React.useState(0);
    const maxIndex = artistData.Album.length - 5;

    const moveLeft = () => {
        setCurrentStartIndex(currentStartIndex => Math.max(0, currentStartIndex - 1));
    };

    const moveRight = () => {
        setCurrentStartIndex(currentStartIndex => Math.min(maxIndex, currentStartIndex + 1));
    };


    return (
        <div className='artist-page'>
        <div className='backgroud'></div>

        <div className="container">
        <div className="search-bar">
            <input type="text" placeholder="검색..." />
            <button onClick={handleSearch}></button>
        </div>

        <section className="artist-content">
            <h1>{artistData.name}</h1>
            <p className={isExpanded ? 'expanded' : '' }>{artistData.info}</p>
            <button className="outline-btns" onClick={toggleText}>{isExpanded ? '접기' : '더보기'}</button>

            <ul className='likebtns'>
                <li><span class="material-icons">shuffle</span> 셔플</li>
                <li><span class="material-icons">share</span> 공유</li>
            </ul>
        </section>

        <section className="top-songs inner-cont">
            <h2>노래</h2>
            <ul>
                {artistData.song.map((s,index)=>(
                    <li key={index} className='song'>
                        <ul>
                            <img className='song-img' src={s.img}/>
                            <li className='song-title'>{s.title}</li>
                            <li className='song-artist'>{s.artist}</li>
                            <li className='song-album'>{s.album}</li>
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
                    {artistData.Album.map((album, index)=>(
                        <li key={index} className='album'>
                            <div className='album-img-wrapper'>
                                <img className='album-img' src={album.img}/>
                                <span className='play-icon'>▶</span>
                            </div>
                            
                            <span>{album.title}</span>
                            <span>{album.releaseYear}</span>
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