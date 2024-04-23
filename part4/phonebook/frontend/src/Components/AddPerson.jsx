import SmartInput from "./SmartInput"

const AddPerson = ({addPerson, newName, setNewName, newNumber, setNewNumber}) => {
    return (
      <>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
          <SmartInput text="name: " value={newName} setValue={setNewName}/>
          <SmartInput text="number: " value={newNumber} setValue={setNewNumber}/>
          <p><button type="submit">add</button></p>
      </form>
      </>
    )
  
  }
export default AddPerson