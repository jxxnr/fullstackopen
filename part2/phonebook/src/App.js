import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ personsToShow, setPersonsToShow ] = useState([]);
  const [ filter, setFilter ] = useState('');
  const [ message, setMessage ] =  useState(null);
  const [ isSucess, setIsSuccess] = useState(true);

  useEffect(() => {
    personService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts);
        setPersonsToShow(initialContacts);
      })
  }, []);
  
  useEffect(() => {
    const filteredPersons = filter === '' 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())); 
  setPersonsToShow(filteredPersons); 
  }, [filter, persons]);

  useEffect(() => {
    setPersonsToShow(persons);
  }, [persons]);


  return (
    <div>
      <h2>Phonebook</h2>
      {message !== null && <Notification isSuccess={isSucess} message={message }/>}
      <Filter persons={persons} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} setIsSuccess={setIsSuccess} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} setPersons={setPersons} message={message}  />
    </div>
  )
}

export default App
