import React from 'react'

const Filter = ({ persons, query, setDisplayedPersons, setQuery }) => {
    const filterItems = (array, query) => {
        return array.filter(person => person.name.toLowerCase().includes(query))
    }

    const handleFilterChange = (event) => {
        setQuery(event.target.value)
        setDisplayedPersons(filterItems(persons, event.target.value));
    }

    return (
        <div>
            filter shown with <input
                value={query}
                onChange={handleFilterChange}
            />
        </div>
    )
}

export default Filter