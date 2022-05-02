import React from 'react'
import personService from '../services/persons'

const PersonForm = ({ persons, newName, newNumber, setNewName, setNewNumber, setPersons, setDisplayedPersons, setQuery, setSuccessMessage, setErrorMessage }) => {
    const addPersons = (event) => {
        event.preventDefault()

        if (persons.find(person => person.name === newName && person.number === newNumber)) {
            const person = persons.find(p => p.name === newName)
            alert(`${person.name} is already in the phonebook with this the number ${person.number}.`)
        }
        else if (persons.find(person => person.name === newName)) {
            const person = persons.find(p => p.name === newName)
            const id = person.id
            const changedPerson = { ...person, number: newNumber }
            if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update(id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                        setDisplayedPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                        setSuccessMessage(`Changed ${returnedPerson.name}'s number`)
                        setTimeout(() => {
                            setSuccessMessage(null)
                        }, 5000)
                        setNewName('')
                        setNewNumber('')
                        setQuery('')
                    })
                    .catch(error => {
                        setErrorMessage(`Information of ${person.name} has already been removed from server`)
                        setPersons(persons.filter(p => p.id !== id))
                        setDisplayedPersons(persons.filter(p => p.id !== id))
                        setNewName('')
                        setNewNumber('')
                        setQuery('')
                    })
            }
        } 
        else {
            const personObject = {
                name: newName,
                number: newNumber
            }

            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setDisplayedPersons(persons.concat(returnedPerson))
                    setSuccessMessage(`Added ${returnedPerson.name}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                    setQuery('')
                })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addPersons}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm