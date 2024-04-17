import { useState, useEffect } from "react";
import axios from "axios";
import PhoneBook from "./Components/PhoneBook";
import AddPerson from "./Components/AddPerson";
import Filter from "./Components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    persons.map((person) => person.name).includes(newName)
      ? window.alert(`${newName} is alerady added to phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }));
  };

  const changeFilter = (event) => {
    const updatedFilter = event.target.value;
    setFilter(updatedFilter);
    // updateFilter(updatedFilter, persons);
  };

  const filterPersons = (filter, persons) => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={changeFilter} />
      <AddPerson
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <PhoneBook filteredPersons={filterPersons(filter, persons)} />
    </div>
  );
};

export default App;
