import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = () => {
    if (!city) return;  // Don't do anything if the city is empty

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`)
      .then((response) => {
        setWeather(response.data);
        setError(null);
      })
      .catch((err) => {
        setError('Failed to fetch weather data. Please try again.');
        setWeather(null);
      });
  };

  return (
    <div>
      <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city" />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
