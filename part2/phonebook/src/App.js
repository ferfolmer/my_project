import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({ onSubmit, valueName, valueNumber, onChangeName, onChangeNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={valueName} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={valueNumber} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ personsToShow, handleDeleteButton }) => {
  return (
    <div>
      {personsToShow.map(person => <Number key={person.id} id={person.id} name={person.name} number={person.number} handleDeleteButton={handleDeleteButton} />)}
    </div>
  )
}

const Number = ({ id, name, number, handleDeleteButton }) => {
  return (
    <div>{name} {number} <button type='button' onClick={() => handleDeleteButton(id)}>delete</button></div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(0)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.find(person => person.name === newName)) {
      const personToBeUpdated = persons.find(p => p.name === newName)
      const changedPerson = { ...nameObject, number: newNumber }

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(personToBeUpdated.id, changedPerson)
          .then(returnedName => {
            setPersons(persons.map(p => p.id !== personToBeUpdated.id ? p : returnedName))
            setNewName('')
            setNewNumber('')
            setMessage(
              `Number of ${newName} was changed`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error);
            setError(1)
            setMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setMessage(null)
              setError(0)
            }, 5000)
            setPersons(persons.filter(p => p.id !== personToBeUpdated.id))
          })
      }
    }

    else {
      personService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added ${nameObject.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const personsToShow = !searchName
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(searchName.toLowerCase())
    )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const handleDeleteButton = (id) => {
    const personToBeDeleted = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToBeDeleted.name} ?`)) {
      personService
        .remove(id)
        .then(returnedName => {
          setPersons(persons.filter(person => person.id !== id))
          alert(`${personToBeDeleted.name} has been deleted!`)
        })

    }

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} isError={error} />

      <Filter value={searchName} onChange={handleSearchName} />

      <h3>Add a new</h3>

      <PersonForm onSubmit={addName} valueName={newName} valueNumber={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} handleDeleteButton={handleDeleteButton} />
    </div>
  )
}

export default App