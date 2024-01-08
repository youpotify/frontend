import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Weather() {

    const [weatherInfo, setWeatherInfo] = useState(null);

    useEffect(()=>{
        handleGetWeather();
    },[]);

    const handleGetWeather = async () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const response = await axios.post('http://localhost:8000/getWeather', {
                lat: latitude,
                lon: longitude
            });

            setWeatherInfo(response.data); //온도 기본값 세팅이 켈빈으로 되어있음 -> 섭씨로 변경 필요
            //섭씨로 환산 : °C = K - 273.15
        })
    }

    let iconUrl, currentTemp, currentDesc;
    if (weatherInfo) {
        iconUrl = `http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`; //api에서 제공해주는 날씨 아이콘
        currentTemp = (weatherInfo.main.temp - 273.15).toFixed(1);
        currentDesc = weatherInfo.weather[0].description;
    }
    
    if(!weatherInfo){
        return <span>날씨에러</span>
    }

    return (
        <span>현재 날씨
            <img src={iconUrl}/>
            <span>{currentTemp}도, {currentDesc}</span>
            
        </span>
    );
}

export default Weather;