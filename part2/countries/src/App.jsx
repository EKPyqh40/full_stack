import { useState, useEffect } from "react";

import SmartInput from "./Components/SmartInput";
import CountryList from "./Components/CountryList";

import countryService from "./services/countries";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    countryService.getAll().then((allCountries) => {
      setCountries(allCountries);
    });
  }, []);

  const filterCountries = (filter, countries) => {
    if (!countries) {
      return null
    }
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <SmartInput value={filter} setValue={setFilter} text="find countries" />
      <CountryList countries={filterCountries(filter, countries)} setFilter={setFilter} />
    </div>
  );
};

export default App;
