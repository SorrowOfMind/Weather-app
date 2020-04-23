import React from 'react'

const WeatherBox = ({weather}) => {
    const kelvin = 273;
    return (
        <div className="weather-box">
            {typeof weather.main !== 'undefined' ? 
            (<div>
                <p>{weather.sys.country}, {weather.name}</p>
                <p>{Math.floor(weather.main.temp - kelvin)} °C</p>
            </div>)
            : ''}
        </div>
    )
}

export default WeatherBox
