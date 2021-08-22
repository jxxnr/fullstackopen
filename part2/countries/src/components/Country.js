import axios from "axios";
import { useState, useEffect } from "react";
import WeatherDisplay from "./WeatherDisplay";

const Country = ({ country }) => {
  const { REACT_APP_WEATHER_TOKEN } = process.env;
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${REACT_APP_WEATHER_TOKEN}&query=${country.capital}`)
      .then((response) => {
        setWeatherData(response.data);
      })
  },[REACT_APP_WEATHER_TOKEN, country.capital]);

  return(
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Spokenanguages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.iso639_1}>{language.name}</li>
        )}
      </ul>
      <div>
        <img 
          style={{maxHeight: '100px'}}
          src={country.flag} 
          alt={`${country.name} flag`}
        />
      </div>
      {Object.keys(weatherData).length !==0 &&
        <WeatherDisplay country={country} weatherData={weatherData} />
      }
    </div>
  );
}

export default Country;