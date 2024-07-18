import React, { useState, useEffect } from "react";
import './Flags.css';

const Flags = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const getApiData = async () => {
      try {
        const result = await fetch("https://restcountries.com/v3.1/all");
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        const data = await result.json();
        setCountries(data);
        setError(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(true);
      }
    };
    getApiData();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {error ? (
        <p>Error fetching data</p>
      ) : (
        <div className="cards-container">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div className="countryCard" key={country.cca3}>
                <img src={country.flags.svg} alt={`flag of ${country.name.common}`} />
                <p>{country.name.common}</p>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Flags;
