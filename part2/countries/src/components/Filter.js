import React from 'react'

const Filter = ({ countries, setFilteredCountries, filterString, setFilterString }) => {
    const filterItems = (arr, query) => {
        return arr.filter(el => el.name.toLowerCase().includes(query))
    }

    const handleFilterChange = (event) => {
        setFilterString(event.target.value);
        setFilteredCountries(filterItems(countries, event.target.value));
    }

    return (
        <div>
            find countries <input
                onChange={handleFilterChange} value={filterString}
            />
        </div>
    )
}

export default Filter