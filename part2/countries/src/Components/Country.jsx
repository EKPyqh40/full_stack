import { useState, useEffect } from "react";

import weatherService from "../services/weather";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const latlng = country.capitalInfo.latlng
    const lat = latlng[0]
    const lng = latlng[1]
    weatherService.getWeather({ lat: lat, lng: lng }).then((weatherResponse) => {
      console.log("weatherResponse", weatherResponse);

      const new_weather = (
        <>
          <p>temperature {weatherResponse.main.temp} Celcius</p>
          <img src={`https://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}@2x.png`} />
          <p>wind {weatherResponse.wind.speed} m/s</p>
        </>
      );
      setWeather(new_weather);
    });
  }, []);

  const languages = Object.keys(country.languages).map((key) => {
    return { key: key, name: country.languages[key] };
  });

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>captital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language.key}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <h2>Weather in {country.capital[0]}</h2>
      {weather}
    </>
  );
};

export default Country;
