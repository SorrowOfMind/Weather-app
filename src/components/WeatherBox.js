import React from 'react';
import '../styles/weatherBox.css';


const WeatherBox = ({weather, kelvin}) => {
    return (
        <div className="weather-box">
            {typeof weather.main !== 'undefined' ? 
            (<div className="weather-box__content">
                <img className="weather-box__icon" src={`./icons/${weather.weather[0].icon}.png`} />
                <p className="weather-box__temp">{Math.floor(weather.main.temp - kelvin)}°C</p>
                <p className="weather-box__dscr">{weather.weather[0].main}</p>
                <p className="weather-box__country">{weather.sys.country}, {weather.name}</p>
            </div>)
            : ''}
        </div>
    )
}

export default WeatherBox;
