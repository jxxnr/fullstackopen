const WeatherDisplay = ({ country, weatherData }) => {

  return(
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>
        <strong>temperature:</strong> {weatherData.current.temperature} Celcius
      </div>
      <div>
        <img src={weatherData.current.weather_icons[0]} alt={`weather in ${country.capital}`}/>
      </div>
      <div>
        <strong>wind:</strong> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}
      </div>
    </div>
  );
}

export default WeatherDisplay;