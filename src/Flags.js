import React, { useState, useEffect } from "react";
import './Flags.css';

const Flags = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const getApiData = async () => {
      try {
        const result = await fetch("https://xcountries-backend.azurewebsites.net/all");
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
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <div className="card" key={country.alpha3Code}>
                <img src={country.flag} alt={`flag of ${country.name}`} />
                <p>{country.name}</p>
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
