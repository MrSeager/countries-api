import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Nav, 
  Card, 
  Navbar, 
  ToggleButton, 
  InputGroup, 
  Form,
  Dropdown,
  Button
} from 'react-bootstrap';
import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faMoon, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {NumericFormat} from 'react-number-format';
import CountryPage from './CountryPage.js';

const MainPage = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [currCard, setCurrCard] = useState('');
  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);   
    }
  }, [parentRef]);

  useEffect (() => {
    axios.get('https://raw.githubusercontent.com/MrSeager/countries-api/main/src/data.json')
    .then((response) => {
      setCountriesData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCardClick = (country) => {
    setCurrCard(country);
  };

  return (
    <Container fluid className={`cs-h pt-5 cs-bg-${darkMode ? 'dark' : 'light'}`}>
      <Navbar fixed="top" className={`shadow p-3 d-flex align-items-center justify-content-between cs-bg-el-${darkMode ? 'dark' : 'light'}`}>
        <Navbar.Brand className={`fw-bold ms-5 cs-text-color-${darkMode ? 'dark' : 'light'}`}>Where in the word?</Navbar.Brand>
        <ToggleButton
          variant='custom' 
          id="tbg-btn-1"
          className={`me-5 cs-text-color-${darkMode ? 'dark' : 'light'}`} 
          onClick={() => setDarkMode(!darkMode)}>
          <FontAwesomeIcon icon={faMoon} /> <span className='cs-fw-600'>Dark Mode</span>
        </ToggleButton>
      </Navbar>
      {currCard === '' ? (
      <Container fluid ref={parentRef}>
        <Nav className='mt-5 mx-lg-5 d-flex flex-lg-row flex-column align-items-lg-center justify-content-between'>
          <InputGroup className={`cs-w-input rounded mb-3 shadow cs-bg-el-${darkMode ? 'dark' : 'light'}`}>
            <InputGroup.Text id='search-addon' className={`border-0 bg-transparent cs-text-color-${darkMode ? 'dark' : 'light'}`}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </InputGroup.Text>
            <Form.Control 
              placeholder='Search for country...'
              aria-label='Search'
              aria-describedby='search-addon'
              className={`border-0 bg-transparent cs-text-color-${darkMode ? 'dark' : 'light'}`}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>
          <Dropdown>
            <Dropdown.Toggle variant='custom' id="dropdown-basic" className={`shadow rounded cs-bg-el-${darkMode ? 'dark' : 'light'} cs-text-color-${darkMode ? 'dark' : 'light'}`}>
              Filter by Region
            </Dropdown.Toggle>
            <Dropdown.Menu className={`shadow cs-bg-el-${darkMode ? 'dark' : 'light'}`}>
              <Dropdown.Item onClick={() => setSelectedRegion('')} className={`cs-dd-item-${darkMode ? 'dark' : 'light'} cs-text-color-${darkMode ? 'dark' : 'light'}`}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedRegion('Africa')} className={`cs-dd-item-${darkMode ? 'dark' : 'light'} cs-text-color-${darkMode ? 'dark' : 'light'}`}>Africa</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedRegion('Americas')} className={`cs-dd-item-${darkMode ? 'dark' : 'light'} cs-text-color-${darkMode ? 'dark' : 'light'}`}>America</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedRegion('Asia')} className={`cs-dd-item-${darkMode ? 'dark' : 'light'} cs-text-color-${darkMode ? 'dark' : 'light'}`}>Asia</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedRegion('Europe')} className={`cs-dd-item-${darkMode ? 'dark' : 'light'} cs-text-color-${darkMode ? 'dark' : 'light'}`}>Europe</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedRegion('Oceania')} className={`cs-dd-item-${darkMode ? 'dark' : 'light'} cs-text-color-${darkMode ? 'dark' : 'light'}`}>Oceania</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <Container fluid className='cs-grid p-5'>
            {countriesData.length > 0 ? (
            countriesData
              .filter((country) => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .filter((country) => selectedRegion === '' || country.region === selectedRegion)
              .map((country, index) => (
              <Card onClick={() => handleCardClick(country)} key={index} className={`pb-3 border-0 shadow cs-bg-el-${darkMode ? 'dark' : 'light'} cs-text-color-${darkMode ? 'dark' : 'light'}`}>
                <Card.Img fluid variant='top' src={country.flag} alt='flag' />
                <Card.Title className='px-3 mt-4 mb-3 h5 fw-bold pe-none'>{country.name}</Card.Title>
                <Card.Text className='px-3 pt-1 m-0 cs-fs pe-none'>
                  <b>Population: </b> 
                  <NumericFormat
                      value={country.population}
                      displayType={'text'}
                      thousandSeparator={true}
                  /></Card.Text>
                <Card.Text className='px-3 pt-1 m-0 cs-fs pe-none'><b>Region: </b>{country.region}</Card.Text>
                <Card.Text className='px-3 pt-1 m-0 cs-fs pe-none'><b>Capital: </b>{country.capital}</Card.Text>
              </Card>
            ))
          ):(
            <p>No countries found.</p>
          )}
        </Container>
      </Container>
      ) : (
        <Container fluid className='cs-grid p-5 d-flex flex-column' ref={parentRef}>
          <Nav> 
            <Button 
              onClick={() => handleCardClick('')}
              variant='custom'
              className={`shadow rounded cs-bg-el-${darkMode ? 'dark' : 'light'} cs-text-color-${darkMode ? 'dark' : 'light'}`}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Button>
          </Nav>
          <CountryPage country={currCard} darkMode={darkMode} />
        </Container>
      )}
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
