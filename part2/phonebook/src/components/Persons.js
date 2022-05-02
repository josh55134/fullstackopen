import React from 'react'
import personService from '../services/persons'

const Display = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)}>delete</button>
    </li>
  )
}

const Persons = ({ persons, displayedPersons, setPersons, setDisplayedPersons, setSuccessMessage }) => {
  const deletePerson = person => { 
    const id = person.id
    if (window.confirm(`Do you really want to delete '${person.name}'?`)) {
      personService.remove(id)

      setPersons(persons.filter(p => p.id !== id))
      setDisplayedPersons(persons.filter(p => p.id !== id))
      setSuccessMessage(`Deleted ${person.name}'s number`)
      setTimeout(() => {
          setSuccessMessage(null)
      }, 5000)
    }   
  }

  return (
    <div>
      {displayedPersons.map(person =>
        <Display key={person.id} person={person} deletePerson={deletePerson} />
      )}
    </div>
  )
}

export default Persons