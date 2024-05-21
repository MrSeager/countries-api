import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Image, 
  Row,
  Col,
  Badge
} from 'react-bootstrap';
import {NumericFormat} from 'react-number-format';
import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CountryPage = ({country, darkMode}) => {

  return (
    <Row className={`mt-5 cs-text-color-${darkMode ? 'dark' : 'light'}`}>
      <Col xs={12} lg={6}>
        <Image fluid src={country.flag} alt='flag' />
      </Col>
      <Col xs={12} lg={6} className='my-auto'>
        <Row className='mt-4 mt-lg-0'>
          <h1 className='fw-bold h2'>{country.name}</h1>
        </Row>
        <Row>
          <Col xs={12} lg={6} className='mt-4'>
            <p className='m-0'><b>Native Name: </b>{country.nativeName}</p>
            <p className='m-0'>
              <b>Population: </b>{}
              <NumericFormat
                value={country.population}
                displayType={'text'}
                thousandSeparator={true}
                />
            </p>
            <p className='m-0'><b>Region: </b>{country.region}</p>
            <p className='m-0'><b>Sub Region: </b>{country.subregion != null ? country.subregion : 'None'}</p>
            <p className='m-0'><b>Capital: </b>{country.capital != null ? country.capital : 'None'}</p>
          </Col>
          <Col xs={12} lg={6} className='mt-4'>
            <p className='m-0'><b>Top Level Domain: </b>{country.topLevelDomain}</p>
            <p className='m-0'>
              <b>Currencies: </b>
              {country.currencies != null ? (country.currencies.map((currency, index) => (
              <span key={index}>
                  {index > 0 && ', '}
                  {currency.name}
              </span>))) : ('None')}</p>
            <p className='m-0'>
              <b>Languages: </b>
              {country.languages.map((languages, index) => (
              <span key={index}>
                  {index > 0 && ', '}
                  {languages.name}
              </span>))}
            </p>
          </Col>
            <Row className='mt-4'> 
              <p className='m-0'>
                <b>Border Countries: </b>
                {country.borders != null ? (country.borders.map((borders, index) => (
                <Badge bg='custom' key={index} className={`me-1 shadow cs-bg-el-${darkMode ? 'dark' : 'light'} cs-text-color-${darkMode ? 'dark' : 'light'}`}>
                    {index > 0}
                    {borders}
                </Badge>))): ('None')}
              </p>
            </Row>
        </Row>
      </Col>
    </Row>
  );
};

export default CountryPage;