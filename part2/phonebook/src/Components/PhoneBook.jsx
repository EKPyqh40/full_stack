import Person from './Person'

const PhoneBook = ({filteredPersons}) => {
    console.log("rerendering PhoneBook", filteredPersons);
    return (
      <>
      <h2>Numbers</h2>
      <ul>
      {filteredPersons.map(person => <Person key={person.name} person={person}/>)}
      </ul>
      </>
    )
  }

export default PhoneBook