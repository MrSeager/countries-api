import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Nav, Card, CardTitle} from 'react-bootstrap';
import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef } from 'react';

const MainPage = () => {
  const [data, setData] = useState(null);

  useEffect (() => {
    fetch('https://raw.githubusercontent.com/MrSeager/countries-api/main/src/data.json')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error', error));
  }, []);

  if (!data) {
    return <p>Loading data...</p>;
  }

  return (
    <Container fluid>
      <Nav>

      </Nav>
      <Container fluid className='cs-grid'>
        {data.map((country, index) => (
          <Card key={index} className='pb-3'>
            <Card.Img fluid variant='top' src={country.flag} className='cs-img' />
            <Card.Title className='px-3 mt-3 h6 fw-bold'>{country.name}</Card.Title>
            <Card.Text className='px-3 m-0 cs-fs'><b>Population:</b> {country.population}</Card.Text>
            <Card.Text className='px-3 m-0 cs-fs'><b>Region:</b> {country.region}</Card.Text>
            <Card.Text className='px-3 m-0 cs-fs'><b>Capital:</b> {country.capital}</Card.Text>
          </Card>
        ))}
      </Container>
    </Container>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
