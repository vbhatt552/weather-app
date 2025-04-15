import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
const History = ({id}) => {
  const [history, setHistory] = useState(null);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  useEffect(() => {
    if(!id) return;
    const fetchHistory = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        console.log(apiKey);
        const response = await axios.get(
          `https://history.openweathermap.org/data/2.5/history/city?id=${id}&type=hour&appid=${apiKey}`
        );
        console.log(response.data);
        setHistory(response.data);
      } catch (err) {
        setError('Failed to load historical weather data');
      }
    };

    fetchHistory();
  }, []);

  return (
    <Container>
      <h2>📜 Historical Weather Data</h2>
      {error && <p className="error">{error}</p>}

      {history?.list?.length > 0 ? (
        <CardContainer>
          {history.list.map((entry, idx) => (
            <Card key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <h4>{new Date(entry.dt * 1000).toLocaleString()}</h4>
              <p>🌡️ Temp: {(entry.main.temp-273.15).toFixed(2)}°C</p>
              <p>💧 Humidity: {entry.main.humidity}%</p>
              <p>💨 Wind: {entry.wind.speed} m/s</p>
              <p>☁️ {entry.weather[0].description}</p>
            </Card>
          ))}
        </CardContainer>
      ) : (
        !error && <p>Loading...</p>
      )}
    </Container>
  );
};

export default History;

const Container = styled.div`
  text-align: center;
  padding: 2rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
  }

  .error {
    color: red;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Card = styled(motion.div)`
  background: #e6f7ff;
  padding: 1rem;
  border-radius: 12px;
  width: 220px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  font-size: 0.95rem;

  &:hover {
    transform: scale(1.03);
    background: #d0f0ff;
  }

  h4 {
    margin-bottom: 0.5rem;
    color: #005b9f;
  }

  p {
    margin: 0.25rem 0;
  }
`;
