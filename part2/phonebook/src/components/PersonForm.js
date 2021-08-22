import React, { useState } from 'react';
import personService from '../services/persons';

const PersonForm = ({ persons, setPersons, setMessage, setIsSuccess }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');

  const findDuplicate = (name) => {
    const dupe = persons.find(
      person => person.name.toLowerCase() === name.toLowerCase()
      
    );
    return dupe
  }

  const updateContact = (updatedInfo) => {    
    if (newNumber.length === 0) {
      // Do not update if number field is blank
      alert(`Cannot update because number field was left blank`);
    
    } else if (persons.find(person => person.number === updatedInfo.number)) {
      // If inputted number is similar to own number, inform user that contact info is already in phonebook
      alert(`${updatedInfo.name}'s info is already in the phonebook`);
      
    } else {
      // Update info of contact in the server if new number is different from old number
        if (window.confirm(`${updatedInfo.name} is already added to phonebook, replace the old numebr with a new one?`)){
          personService
          .update(updatedInfo)
          .then(updatedContact => {
            setPersons(persons.map(person => person.id !== updatedContact.id ? person : updatedContact));
            setIsSuccess(true);
            setMessage(`Information of ${updatedInfo.name} has been updated`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error)=>{
            setMessage(`Information of ${updatedInfo.name} has already been removed from the server`);
            setIsSuccess(false);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
        }

    }
  }

  const addName = (event) => {
    event.preventDefault();
    // Check if person to be added is already in phonebook
    const duplicatePerson = findDuplicate(newName);
    // Update contact info is person is already in phonebook
    if (duplicatePerson !== undefined) {
      const updatedInfo = { ...duplicatePerson, number: newNumber }
      updateContact(updatedInfo);
    } else {
      const newContact = {
        name: newName,
        number: newNumber
      };
      personService
        .create(newContact)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact));
          setIsSuccess(true);
          setMessage(`Added ${returnedContact.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
    }
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return(
    <form onSubmit={addName} >
    <div>
      name: &nbsp;
      <input value={newName} 
        onChange={handleNameChange} 
      />
    </div>
    <div>
      number: &nbsp;
      <input value={newNumber} 
        onChange={handleNumberChange} 
      />
    </div>
    <div>
      <button type="submit">
        add
      </button>
    </div>
  </form>
  );
}

export default PersonForm;