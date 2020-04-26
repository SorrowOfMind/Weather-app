import React, {useState, useEffect} from 'react';
import './App.css';

import GeolocationInfo from './components/GeolocationInfo';
import DateTimePanel from './components/DateTimePanel';
import SearchBox from './components/SearchBox';
import WeatherBox from './components/WeatherBox';
import Loading from './components/Loading';

const api = {
    key: '82005d27a116c2880c8f0fcb866998a0',
    url: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

    const [weather, setWeather] = useState({});
    const [error, setError] = useState('');

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false)

    const kelvin = 273;
    const checkGeolocation = () => 'geolocation' in navigator;
    const getUserPosition = () => {
        navigator
        .geolocation
        .getCurrentPosition(setUserPosition, showError);
    };

    const setUserPosition = (position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        fetchWeather(lat, long);
    };

    const showError = (err) => setError(err.message);

    const fetchWeather = async (latitude, logitude) => {
        let composedURL = `${api.url}weather?lat=${latitude}&lon=${logitude}&appid=${api.key}`;
        const response = await fetch(composedURL);
        const weatherData = await response.json();
        setWeather(weatherData);
        setLoading(false);
    };

    const handleQuery = e => {
        setQuery(e.target.value);
    };

    const searchQuery = e => {
        let composedURL = `${api.url}weather?q=${query}&APPID=${api.key}`;
        if (e.keyCode === 13) {
            fetch(composedURL)
                .then(response => response.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                });
        } else {return};
    };

    useEffect(() => {
        setLoading(true);
        getUserPosition();
    }, []);

    useEffect(() => {
      let errorTimer = setTimeout(() => {
        if (error) {setError('')}
      }, 2000);
      return () => clearTimeout(errorTimer);
    }, [error]);

    const defineBg = (temp) => {
        switch (true) {
            case temp <= 0:
                return "app freeze";
            case(temp > 0 && temp <= 10):
                return "app cold";
            case(temp > 10 && temp <= 20):
                return "app warm";
            case(temp > 20):
                return "app hot";
            default:
                return "app";
        }
    }

    return (
        <div
            className={(typeof weather.main !== 'undefined')
            ? defineBg(weather.main.temp - kelvin)
            : "app"}>
            <div className="info-box">
                {checkGeolocation() ? null : <GeolocationInfo/>}
                {error}
            </div>
            <div className="bg-wrapper">
                <header className="App-header">
                    <DateTimePanel/>
                    <SearchBox handleQuery={handleQuery} searchQuery={searchQuery} />
                </header>
                <main className="main">
                    {loading === true ? 
                    <Loading />
                    : null}
                    <WeatherBox weather={weather} kelvin={kelvin}/>
                </main>
            </div>
        </div>
    );
}

export default App;
