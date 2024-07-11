import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Person from './components/Person'
import SearchFilter from './components/SearchFilter'
import AddPersonForm from './components/AddPersonForm'
import peopleServices from './services/peopleServices'

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [filter, setFilter] = useState(false)
  const [filteredNames, setFilteredNames] = useState([])
  const [message, setMessage] = useState(null)
  
  const hook = () => {
    console.log('effect')
    
    peopleServices
      .getAll()
      .then(initialPeople => {
        console.log('seems to work')
        setPersons(initialPeople)
      })
  }
  
  useEffect(hook, [])

  const messageUpdate = (info) => {

  }

  const checkUniqueName = (nameToCheck) => {
    return persons.filter(person => person.name === nameToCheck).length === 0
  }
  console.log('render', persons.length, 'person')

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const newNameObj = {
      name: newName,
      number: newNumber,
    }
    if (checkUniqueName(newNameObj.name)) {
      peopleServices
        .create(newNameObj)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
        })
        setMessage(`${newNameObj.name} has been added`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
    } else {
      confirm(`${newName} is already in the phonebook, would you like to replace the old number with this new one?`)
      const id = (persons.find(n => n.name === newName)).id
      peopleServices
        .upDatePhone(id, newNameObj)
        .then((returnedPerson) => {
          setMessage(`${returnedPerson.name} has been updated`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        
    }
  }
 
  const deletePerson = (id) => {
   
    const person = persons.find(n => n.id === id)
    confirm(`Are you sure you want to delete ${person.name}?`)
    peopleServices
      .removePerson(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
      })
      .catch(error => console.log('Error', error))

  }
  const peopleToShow = !filter ? persons : filteredNames

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilteredNames = (event) => {
    const newFilterText = event.target.value
    setFilterText(newFilterText)
    if (newFilterText !== '') {
      setFilter(true)
      setFilteredNames(persons.filter(person => new RegExp(newFilterText, 'i').test(person.name)))
    } else {
      setFilter(false)
      setFilteredNames([])
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <SearchFilter 
        filterText={filterText} 
        handleFilteredNames={handleFilteredNames} 
      />
      <h2>Add new:</h2>
      <AddPersonForm 
        addNameAndNumber={addNameAndNumber} 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {peopleToShow.map((person) =>
          <Person key={person.name} person={person} 
          
          removePerson={() => deletePerson(person.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App
