import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [displayedPersons, setDisplayedPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
      personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setDisplayedPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification successMessage={successMessage} errorMessage={errorMessage} />

      <Filter persons={persons} query={query} setDisplayedPersons={setDisplayedPersons} setQuery={setQuery} />
      
      <h3>Add a new</h3>

      <PersonForm persons={persons} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} setPersons={setPersons} setDisplayedPersons={setDisplayedPersons} setQuery={setQuery} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />

      <h3>Numbers</h3>

      <Persons persons={persons} displayedPersons={displayedPersons} setPersons={setPersons} setDisplayedPersons={setDisplayedPersons} setSuccessMessage={setSuccessMessage} />

    </div>
  )
}

export default App