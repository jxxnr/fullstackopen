import personService from '../services/persons';

const Persons = ({ persons, setPersons }) => {

  const deleteContact = (id) => {
    const contact = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${contact.name}?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
      }
  }
  return(
    <div>
      {persons.map(
        person => 
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deleteContact(person.id)}>delete</button>
        </div>
        )}
    </div>
  );
}

export default Persons;