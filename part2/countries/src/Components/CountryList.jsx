import Country from "./Country";

const CountryList = ({ countries, setFilter }) => {
  if (!countries) {
    return null;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.cca2}>
            {country.name.common}{" "}
            <button onClick={() => setFilter(country.name.common)}>show</button>
          </li>
        ))}
      </ul>
    );
  }
};

export default CountryList;
