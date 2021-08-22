import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Country from './components/Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countryToShow, setCountryToShow] = useState({});


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, []);

  useEffect(() => {
    let filtered = [];
    if (filter !== '') {
      filtered = countries.filter(country => 
        country.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    setFilteredCountries(filtered);
  }, [filter, countries]);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setCountryToShow(filteredCountries[0]);
    } else {
      setCountryToShow({});
    }
  }, [filteredCountries]);

  const displayCountry = (country) => {
    setFilter(country.name);
    setCountryToShow(country);
  }

  return(
    <div>
      <Filter  filter={filter} setFilter={setFilter} />
      
      {filteredCountries.length > 10 &&
        'Too many matches, specify another filter'
      }

      {Object.keys(countryToShow).length !==0 &&
        <Country country={countryToShow} />
      }

      {(filteredCountries.length > 1 && filteredCountries.length <= 10) &&
        filteredCountries.map(country => 
          <div key={country.name}>
            {country.name}
            <button onClick={() => displayCountry(country)}>show</button>
          </div>
        )
      }
    </div>
  );
}

export default App;
