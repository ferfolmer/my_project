import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SingleCountry = ({ country }) => {
  const headers = Object.keys(country.languages)
  return (
    <div >
      <h1>{country.name.common}</h1>
      <p>capital <li>{country.capital}</li></p>
      population {country.population}
      <h2>languages</h2>

      {headers.map(header => <div>{header}</div>)}
      <img src={country.flags.png} alt={country.name.common} />
    </div>
  )
}
const Countries = ({ country }) => {
  const handleShowClick = () => {
    console.log(country.name)
  }

  if (country.length === 1) {
    return (
      <div>
        {country.map(country => <SingleCountry country={country} />)}
      </div>
    )
  }
  if (country.length <= 10 && country.length > 1) {
    return (
      <div>
        {country.map(country =>
          <li key={country.cca3}>
            {country.name.common} <button onClick={handleShowClick}>
              show
            </button>
          </li>
        )
        }
      </div >
    )
  }
  else
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [showCountry, setShowCountry] = useState(false)



  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))

  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value)
    console.log(event.target.value);
  }




  return (
    <div>
      find countries<input value={searchCountry} onChange={handleSearchCountry} />
      <Countries country={countriesToShow} />
    </div>
  )

}


export default App;
