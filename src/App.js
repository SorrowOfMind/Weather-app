import React, {useState, useEffect} from 'react';
import './App.css';

import GeolocationInfo from './components/GeolocationInfo';
import DateTimePanel from './components/DateTimePanel';
import SearchBox from './components/SearchBox';
import WeatherBox from './components/WeatherBox';

const api = {
  key: '82005d27a116c2880c8f0fcb866998a0',
  url: 'https://api.openweathermap.org/data/2.5/'

}


function App() {

  const [weather, setWeather] = useState({});

  const checkGeolocation = () => 'geolocation' in navigator;
  const getUserPosition = () => navigator.geolocation.getCurrentPosition(setUserPosition);

  const setUserPosition = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    fetchWeather(lat, long);
  }

  const fetchWeather = async (latitude, logitude) => {
    let composedURL = `${api.url}weather?lat=${latitude}&lon=${logitude}&appid=${api.key}`;
    const response = await fetch(composedURL);
    const weatherData = await response.json();
    setWeather(weatherData);
  }

 
  useEffect(() => {
    getUserPosition();
  },[], console.log(weather.main))

  return (
    <div className="App">
      {checkGeolocation() ? null : <GeolocationInfo />}
      <header className="App-header">
        <DateTimePanel />
        <SearchBox />
      </header>
      <main>
        <WeatherBox weather={weather} />
      </main>
    </div>
  );
}

export default App;
