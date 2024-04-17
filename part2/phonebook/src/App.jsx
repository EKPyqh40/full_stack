import { useState } from 'react'
import PhoneBook from "./Components/PhoneBook"
import AddPerson from "./Components/AddPerson"
import Filter from "./Components/Filter"



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    persons.map(person => person.name).includes(newName) 
      ? window.alert(`${newName} is alerady added to phonebook`) 
      : setPersons(persons.concat({name: newName, number: newNumber}))
    updateFilter(filter, persons.concat({name: newName, number: newNumber}))

  }
  const changeFilter = (event) => {
    const updatedFilter = event.target.value
    setFilter(updatedFilter)
    updateFilter(updatedFilter, persons)

  }

  const updateFilter = (filter, persons) => {
    console.log("updating filter");
    setFilteredPersons(
      persons.filter( (person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      ))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={changeFilter}/>
      <AddPerson
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber} />
      <PhoneBook filteredPersons={filteredPersons} />
    </div>
    
  )
}

export default App