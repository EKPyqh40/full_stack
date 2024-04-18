import Person from "./Person";

const PhoneBook = ({ filteredPersons, deletePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
            <Person
              key={person.name}
              person={person}
              onDelete={() => deletePerson(person)}
            />
          ))}
      </ul>
    </>
  );
};

export default PhoneBook;
