import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryListDisplay = ({ country, setFilteredCountries }) => {
  const handleClick = () => {
    setFilteredCountries([country])
  }

  return (
    <div>
      <p>
        {country.name}
        <button onClick={handleClick}>show</button>
      </p>
    </div>
  )
}

const SingleCountryDisplay = ({ filteredCountries }) => {
  const [weatherData, setWeatherData] = useState([])

  const api_key = process.env.REACT_APP_API_KEY
  const {name, capital, population, flag} = filteredCountries[0]

  const kelvinToFahrenheit = (kelvinTemp) => {
    return (
      ( kelvinTemp - 273.15 ) * (9/5) + 32
    )
  }

  const mpsToMph = (mpsSpeed) => {
    return (
      mpsSpeed*(100/2.54)/(12*5280)*(60*60)
    )
  }

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
      .then(response => {
        const temperature = kelvinToFahrenheit(response.data.main.temp)
        const windSpeed = mpsToMph(response.data.wind.speed)
        setWeatherData({temperature, windSpeed})
      })
  }, [capital, api_key])

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {
          filteredCountries[0].languages.map((language, index) => {
            return (
              <li key={index}>{language.name}</li>
            )
          }
          )}
      </ul>
      <img src={flag} alt='flag' width='125' height='125' />
      <h2>Weather in {name}</h2>
      <p><b>temperature:</b> {weatherData.temperature} Fahrenheit</p>
      <p><b>wind:</b> {weatherData.windSpeed} mph</p>
    </div>
  )
}

const Countries = ({ filteredCountries, setFilteredCountries }) => {
  if (filteredCountries.length >= 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (filteredCountries.length === 1) {
    return (
      <SingleCountryDisplay filteredCountries={filteredCountries} />
    )
  }
  return (
    <div>
      {filteredCountries.map(country =>
        <CountryListDisplay key={country.name} country={country} setFilteredCountries={setFilteredCountries} />
      )}
    </div>
  )
}

export default Countries