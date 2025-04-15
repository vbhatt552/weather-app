import React, { useState } from 'react';
import Weather from './comp/Weather.jsx';
import History from './comp/history.jsx';
import styled from 'styled-components';
export default function App() {
  const [id,setId] = useState(null);

  return (
    <Container>
      <Weather setId={setId}/>
      {id&&<History id={id}/>}
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;