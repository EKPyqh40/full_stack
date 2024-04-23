import { useState, useEffect } from "react";

import "./index.css";

import PhoneBook from "./Components/PhoneBook";
import AddPerson from "./Components/AddPerson";
import Filter from "./Components/Filter";
import Notification from "./Components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);

  const setDisappearingNotification = (message, type) => {
    setNotification({ message: message, type: type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      window.alert(
        `${newName} is alerady added to phonebook, replace the old number with a new one?`
      );
      const person = persons.find((person) => person.name === newName);
      const changedPerson = { ...person, number: newNumber };
      personService
        .update(person.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : returnedPerson))
          );
        })
        .catch((error) => {
          setDisappearingNotification(
            JSON.parse(error.request.response).error,
            "error"
          );
        });
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setDisappearingNotification(`Added ${newPerson.name}`, "succes");
        })
        .catch((error) => {
          setDisappearingNotification(
            JSON.parse(error.request.response).error,
            "error"
          );
        });
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(person.id)
        .then((deleteId) => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch(() => {
          setNotification({
            message: `Person '${person.name}' was already removed from the server`,
            type: "error",
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
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
      <Notification notification={notification} />
      <Filter value={filter} onChange={changeFilter} />
      <AddPerson
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <PhoneBook
        filteredPersons={filterPersons(filter, persons)}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
