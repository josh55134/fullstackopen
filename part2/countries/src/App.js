import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filterString, setFilterString] = useState("")

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter countries={countries} setFilteredCountries={setFilteredCountries} filterString={filterString} setFilterString={setFilterString} />

      <Countries filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries}  />
    </div>
  )
}

export default App;
