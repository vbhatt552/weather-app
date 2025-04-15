import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReactAnimatedWeather from 'react-animated-weather';

const Weather = ({ setId }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeather(response.data);
      setId(response.data.id);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  const getIcon = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return 'CLEAR_DAY';
      case 'clouds':
        return 'CLOUDY';
      case 'rain':
        return 'RAIN';
      case 'snow':
        return 'SNOW';
      case 'thunderstorm':
        return 'WIND';
      case 'drizzle':
        return 'SLEET';
      default:
        return 'PARTLY_CLOUDY_DAY';
    }
  };

  const LiveClock = ({ timezone }) => {
    const [localTime, setLocalTime] = useState('');
  
    useEffect(() => {
      const updateClock = () => {
        const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        const local = new Date(utc + timezone * 1000);
        setLocalTime(local.toLocaleTimeString());
      };
  
      updateClock(); // Initial call
      const interval = setInterval(updateClock, 1000); // Update every second
      return () => clearInterval(interval);
    }, [timezone]);
  
    return <p><strong>Local Time:</strong> ⏰ {localTime}</p>;
  };
  

  return (
    <Container>
      <h2>Weather App 🌤️</h2>
      <input
        className="input"
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="button" onClick={fetchWeather}>
        Get Weather
      </button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <WeatherInfo>
          <h3>{weather.name}, {weather.sys.country}</h3>
          <LiveClock timezone={weather.timezone}/>
          <ReactAnimatedWeather
            icon={getIcon(weather.weather[0].main)}
            color="goldenrod"
            size={64}
            animate={true}
          />
          <p><strong>Temperature:</strong> 🌡️ {(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <p><strong>Humidity:</strong> 💧 {weather.main.humidity}%</p>
          <p><strong>Condition:</strong> ☁️ {weather.weather[0].description}</p>
          <p><strong>Wind:</strong> 💨 {weather.wind.speed} m/s</p>
        </WeatherInfo>
      )}
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  padding: 2rem;

 .input {
  padding: 0.6rem 1rem;
  margin-right: 1rem;
  border: none;
  border-radius: 8px;
  width: 250px;
  font-size: 1rem;
  background: linear-gradient(to right, #fdfbfb, #ebedee);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s ease;
}

.input:focus {
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(100, 149, 237, 0.3); /* Cornflower Blue Glow */
  border: none;
}


 .button {
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 4px 14px rgba(37, 117, 252, 0.4);
  transition: all 0.3s ease;
}

.button:hover {
  background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(37, 117, 252, 0.6);
}


  .error {
    color: red;
    margin-top: 1rem;
  }
`;

const WeatherInfo = styled.div`
  margin-top: 2rem;
  background-color: #f0f8ff;
  border-radius: 10px;
  padding: 1.5rem;
  display: inline-block;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  animation: fadeInUp 0.6s ease;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  p {
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }

  h3 {
    margin-bottom: 1rem;
  }
`;


export default Weather;
